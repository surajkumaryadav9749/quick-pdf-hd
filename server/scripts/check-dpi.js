const sharp = require("sharp");
const { resizeImageBuffer } = require("../src/services/resize.service");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const makeImage = async (width, height, format, density = 72) =>
  sharp({
    create: {
      width,
      height,
      channels: format === "jpeg" ? 3 : 4,
      background: format === "jpeg" ? { r: 40, g: 90, b: 110 } : { r: 40, g: 90, b: 110, alpha: 0.6 },
    },
  }).withMetadata({ density }).toFormat(format).toBuffer();

(async () => {
  const source = await makeImage(2000, 1500, "jpeg", 72);
  const original = await sharp(source).metadata();
  assert(original.width === 2000 && original.height === 1500, "source pixels");

  const dpiOnly = await sharp(await resizeImageBuffer(source, {
    mode: "pixels", lock: true, anchor: "width", width: 2000, format: "jpeg", quality: 85, dpi: 300,
  })).metadata();
  assert(dpiOnly.width === 2000 && dpiOnly.height === 1500, `dpi-only pixels ${dpiOnly.width}x${dpiOnly.height}`);
  assert(Math.round(dpiOnly.density) === 300, `dpi-only density ${dpiOnly.density}`);

  const both = await sharp(await resizeImageBuffer(source, {
    mode: "pixels", lock: false, width: 1000, height: 750, format: "jpeg", quality: 85, dpi: 300,
  })).metadata();
  assert(both.width === 1000 && both.height === 750, `resize+dpi pixels ${both.width}x${both.height}`);
  assert(Math.round(both.density) === 300, `resize+dpi density ${both.density}`);

  const png = await makeImage(200, 100, "png", 72);
  const pngOut = await sharp(await resizeImageBuffer(png, {
    mode: "pixels", lock: true, anchor: "width", width: 200, format: "png", quality: 85, dpi: 300,
  })).metadata();
  assert(pngOut.width === 200 && pngOut.height === 100, "png pixels");
  assert(pngOut.hasAlpha, "png alpha");
  assert(Math.round(pngOut.density) === 300, `png density ${pngOut.density}`);

  const webp = await makeImage(200, 100, "webp", 72);
  const webpOut = await sharp(await resizeImageBuffer(webp, {
    mode: "pixels", lock: true, anchor: "width", width: 200, format: "webp", quality: 85, dpi: 300,
  })).metadata();
  assert(webpOut.width === 200 && webpOut.height === 100, "webp pixels");
  assert(webpOut.hasAlpha, "webp alpha");
  console.log(`webp density after write: ${webpOut.density} (WebP apps may not all expose DPI)`);

  console.log("dpi checks passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
