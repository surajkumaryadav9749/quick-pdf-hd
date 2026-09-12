const sharp = require("sharp");
const { resizeImageBuffer } = require("../src/services/resize.service");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const makeImage = (width, height, format = "png") =>
  sharp({
    create: {
      width,
      height,
      channels: format === "jpeg" ? 3 : 4,
      background: format === "jpeg" ? { r: 12, g: 80, b: 90 } : { r: 12, g: 80, b: 90, alpha: 0.5 },
    },
  }).toFormat(format).toBuffer();

(async () => {
  const portrait = await makeImage(600, 1200, "jpeg");
  const landscape = await makeImage(1200, 800, "jpeg");
  const square = await makeImage(1000, 1000, "jpeg");
  const wide = await makeImage(2000, 1000, "jpeg");
  const png = await makeImage(40, 80, "png");
  const webp = await makeImage(80, 40, "webp");

  const example1 = sharp(await resizeImageBuffer(portrait, { mode: "pixels", lock: true, anchor: "width", width: 1000, format: "jpeg", quality: 85 }));
  const size1 = await example1.metadata();
  assert(size1.width === 1000 && size1.height === 2000, `example1 got ${size1.width}x${size1.height}`);

  const example2 = sharp(await resizeImageBuffer(landscape, { mode: "pixels", lock: true, anchor: "width", width: 1000, format: "jpeg", quality: 85 }));
  const size2 = await example2.metadata();
  assert(size2.width === 1000 && size2.height === 667, `example2 got ${size2.width}x${size2.height}`);

  const example3 = sharp(await resizeImageBuffer(landscape, { mode: "pixels", lock: false, width: 1000, height: 1000, format: "jpeg", quality: 85 }));
  const size3 = await example3.metadata();
  assert(size3.width === 1000 && size3.height === 1000, `example3 got ${size3.width}x${size3.height}`);

  const example4 = sharp(await resizeImageBuffer(square, { mode: "pixels", lock: true, anchor: "width", width: 500, format: "jpeg", quality: 85 }));
  const size4 = await example4.metadata();
  assert(size4.width === 500 && size4.height === 500, `example4 got ${size4.width}x${size4.height}`);

  const example5 = sharp(await resizeImageBuffer(wide, { mode: "pixels", lock: true, anchor: "width", width: 1000, format: "jpeg", quality: 85 }));
  const size5 = await example5.metadata();
  assert(size5.width === 1000 && size5.height === 500, `example5 got ${size5.width}x${size5.height}`);

  const pngOut = sharp(await resizeImageBuffer(png, { mode: "pixels", lock: true, anchor: "width", width: 20, format: "png", quality: 85 }));
  const pngMeta = await pngOut.metadata();
  assert(pngMeta.width === 20 && pngMeta.height === 40, `png got ${pngMeta.width}x${pngMeta.height}`);
  assert(pngMeta.hasAlpha, "png transparency should be preserved");

  const webpOut = sharp(await resizeImageBuffer(webp, { mode: "pixels", lock: true, anchor: "height", height: 20, format: "webp", quality: 85 }));
  const webpMeta = await webpOut.metadata();
  assert(webpMeta.width === 40 && webpMeta.height === 20, `webp got ${webpMeta.width}x${webpMeta.height}`);
  assert(webpMeta.hasAlpha, "webp transparency should be preserved");

  const app = require("../src/app");
  const jpegFile = await makeImage(40, 40, "jpeg");
  const pngFile = await makeImage(40, 40, "png");

  const postResize = async (port, files, format) => {
    const form = new FormData();
    files.forEach((buffer, index) => {
      form.append("images", new Blob([buffer], { type: index ? "image/png" : "image/jpeg" }), index ? "photo.png" : "photo.jpg");
    });
    form.append("mode", "pixels");
    form.append("lock", "true");
    form.append("anchor", "width");
    form.append("width", "20");
    form.append("format", format);
    form.append("quality", "85");
    form.append("dpiPreset", "keep");
    return fetch(`http://127.0.0.1:${port}/api/resize-image`, { method: "POST", body: form });
  };

  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const port = server.address().port;
  try {
    const one = await postResize(port, [jpegFile], "jpeg");
    assert(one.status === 200, `single resize expected 200, got ${one.status}`);
    assert(String(one.headers.get("content-type")).includes("image/jpeg"), "single resize should be image/jpeg");
    assert(!String(one.headers.get("content-disposition") || "").toLowerCase().includes(".zip"), "single resize must not be a ZIP");
    const oneBytes = Buffer.from(await one.arrayBuffer());
    assert(oneBytes[0] === 0xff && oneBytes[1] === 0xd8, "single resize JPEG magic missing");

    const pngRes = await postResize(port, [pngFile], "png");
    assert(String(pngRes.headers.get("content-type")).includes("image/png"), "png resize should be image/png");
    await pngRes.arrayBuffer();

    const many = await postResize(port, [jpegFile, pngFile], "webp");
    assert(many.status === 200, `multi resize expected 200, got ${many.status}`);
    assert(String(many.headers.get("content-type")).includes("application/json"), "multi resize should return JSON files, not ZIP");
    const body = await many.json();
    assert(Array.isArray(body.files) && body.files.length === 2, "multi resize should return two files");
    assert(body.files.every((file) => file.contentType === "image/webp"), "multi resize should respect webp output");
    assert(body.files.every((file) => /\.webp$/i.test(file.name)), "multi resize filenames should use .webp");
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }

  console.log("resize-image checks passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
