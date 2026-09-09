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

  console.log("resize-image checks passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
