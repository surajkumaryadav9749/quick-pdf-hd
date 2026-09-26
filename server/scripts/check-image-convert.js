const sharp = require("sharp");
const { convertImageBuffer } = require("../src/services/image-tools.service");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const makeImage = (width, height, format = "png", transparent = false) =>
  sharp({
    create: {
      width,
      height,
      channels: transparent ? 4 : 3,
      background: transparent
        ? { r: 255, g: 0, b: 0, alpha: 0.5 }
        : { r: 12, g: 80, b: 90 },
    },
  }).toFormat(format).toBuffer();

(async () => {
  console.log("Starting image conversion tests...");

  // 1. WebP -> JPG
  const webpTrans = await makeImage(100, 100, "webp", true);
  const webpToJpg = await convertImageBuffer(webpTrans, { targetFormat: "jpeg" });
  assert(webpToJpg.format === "jpeg", "WebP to JPG should produce jpeg format");
  const jpgMeta = await sharp(webpToJpg.buffer).metadata();
  assert(jpgMeta.format === "jpeg", "output buffer must be valid jpeg");
  assert(!jpgMeta.hasAlpha, "JPEG output must not have alpha channel");
  console.log("PASS: WebP -> JPG conversion and transparency flattening");

  // 2. WebP -> PNG
  const webpToPng = await convertImageBuffer(webpTrans, { targetFormat: "png" });
  assert(webpToPng.format === "png", "WebP to PNG should produce png format");
  const pngMeta = await sharp(webpToPng.buffer).metadata();
  assert(pngMeta.format === "png", "output buffer must be valid png");
  assert(pngMeta.hasAlpha, "PNG output must preserve alpha channel");
  console.log("PASS: WebP -> PNG conversion and alpha preservation");

  // 3. JPG -> PNG
  const jpgSolid = await makeImage(120, 80, "jpeg", false);
  const jpgToPng = await convertImageBuffer(jpgSolid, { targetFormat: "png" });
  assert(jpgToPng.format === "png", "JPG to PNG should produce png format");
  const jpgPngMeta = await sharp(jpgToPng.buffer).metadata();
  assert(jpgPngMeta.format === "png", "output buffer must be valid png");
  assert(jpgPngMeta.width === 120 && jpgPngMeta.height === 80, "dimensions must match original");
  console.log("PASS: JPG -> PNG conversion");

  // 4. PNG -> JPG
  const pngTrans = await makeImage(90, 90, "png", true);
  const pngToJpg = await convertImageBuffer(pngTrans, { targetFormat: "jpeg" });
  assert(pngToJpg.format === "jpeg", "PNG to JPG should produce jpeg format");
  const pngJpgMeta = await sharp(pngToJpg.buffer).metadata();
  assert(pngJpgMeta.format === "jpeg", "output buffer must be valid jpeg");
  assert(!pngJpgMeta.hasAlpha, "JPEG output must not have alpha channel");
  console.log("PASS: PNG -> JPG conversion with white background flattening");

  // 5. Test Express route integration
  const app = require("../src/app");
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const port = server.address().port;

  try {
    // Single image conversion test
    const singleForm = new FormData();
    singleForm.append("images", new Blob([webpTrans], { type: "image/webp" }), "photo.webp");
    singleForm.append("targetFormat", "jpg");

    const singleRes = await fetch(`http://127.0.0.1:${port}/api/image-tools/convert`, {
      method: "POST",
      body: singleForm,
    });
    assert(singleRes.status === 200, `single convert expected 200, got ${singleRes.status}`);
    assert(String(singleRes.headers.get("content-type")).includes("image/jpeg"), "single response should be image/jpeg");
    assert(String(singleRes.headers.get("content-disposition")).includes("photo.jpg"), "should have photo.jpg in disposition");
    const singleBytes = Buffer.from(await singleRes.arrayBuffer());
    assert(singleBytes[0] === 0xff && singleBytes[1] === 0xd8, "single response must be valid JPEG magic bytes");
    console.log("PASS: Single image conversion API route");

    // Multiple image conversion test
    const multiForm = new FormData();
    multiForm.append("images", new Blob([webpTrans], { type: "image/webp" }), "first.webp");
    multiForm.append("images", new Blob([webpTrans], { type: "image/webp" }), "second.webp");
    multiForm.append("targetFormat", "png");

    const multiRes = await fetch(`http://127.0.0.1:${port}/api/image-tools/convert`, {
      method: "POST",
      body: multiForm,
    });
    assert(multiRes.status === 200, `multi convert expected 200, got ${multiRes.status}`);
    assert(String(multiRes.headers.get("content-type")).includes("application/json"), "multi response should be JSON");
    const multiJson = await multiRes.json();
    assert(multiJson.success === true, "JSON response should have success: true");
    assert(Array.isArray(multiJson.files) && multiJson.files.length === 2, "JSON response should contain 2 files");
    assert(multiJson.files[0].name === "first.png", "first file name should be first.png");
    assert(multiJson.files[1].name === "second.png", "second file name should be second.png");
    assert(multiJson.files[0].contentType === "image/png", "file contentType should be image/png");
    console.log("PASS: Multi-image conversion API route (JSON response)");
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }

  console.log("\nALL IMAGE CONVERSION TESTS PASSED SUCCESSFULLY!");
})().catch((error) => {
  console.error("Image conversion test failed:", error);
  process.exit(1);
});
