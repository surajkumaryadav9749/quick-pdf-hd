const sharp = require("sharp");

const MAX_DIMENSION = 8000;
const MIN_DIMENSION = 1;
const MIN_DPI = 36;
const MAX_DPI = 1200;

const clampDimension = (value) => {
  const number = Math.round(Number(value));
  if (!Number.isFinite(number)) return null;
  if (number < MIN_DIMENSION || number > MAX_DIMENSION) return null;
  return number;
};

const outputOptions = {
  jpeg: (quality) => ({ quality, mozjpeg: true }),
  png: () => ({ compressionLevel: 9, adaptiveFiltering: true }),
  webp: (quality) => ({ quality, alphaQuality: 100 }),
};

const parseResizeOptions = (body = {}) => {
  const mode = body.mode === "percentage" ? "percentage" : "pixels";
  const lock = String(body.lock) !== "false";
  const anchor = body.anchor === "height" ? "height" : "width";
  const format = ["jpeg", "png", "webp"].includes(body.format) ? body.format : "jpeg";
  const quality = Math.max(20, Math.min(Number(body.quality) || 85, 95));
  const percentage = Math.max(1, Math.min(Number(body.percentage) || 100, 800));
  const width = clampDimension(body.width);
  const height = clampDimension(body.height);
  const dpiPreset = String(body.dpiPreset || "keep").toLowerCase();
  let dpi = null;
  if (dpiPreset !== "keep") {
    const rawDpi = dpiPreset === "custom" ? Number(body.dpi) : Number(dpiPreset);
    if (!Number.isFinite(rawDpi) || rawDpi < MIN_DPI || rawDpi > MAX_DPI) {
      throw new Error(`Enter a DPI value between ${MIN_DPI} and ${MAX_DPI}.`);
    }
    dpi = Math.round(rawDpi);
  }

  if (mode === "pixels") {
    if (lock) {
      if (anchor === "height" && !height) throw new Error("Enter a height between 1 and 8000 px.");
      if (anchor !== "height" && !width) throw new Error("Enter a width between 1 and 8000 px.");
    } else if (!width || !height) {
      throw new Error("Enter a width and height between 1 and 8000 px.");
    }
  }

  return { mode, lock, anchor, format, quality, percentage, width, height, dpiPreset, dpi };
};

const resizeImageBuffer = async (buffer, options) => {
  const image = sharp(buffer, { failOn: "none" }).rotate();
  const metadata = await image.metadata();
  const sourceWidth = metadata.width;
  const sourceHeight = metadata.height;
  if (!sourceWidth || !sourceHeight) throw new Error("The image could not be read.");

  let pipeline = image;

  if (options.mode === "percentage") {
    const width = clampDimension(sourceWidth * (options.percentage / 100));
    const height = clampDimension(sourceHeight * (options.percentage / 100));
    if (!width || !height) throw new Error("The percentage produced an invalid size.");
    pipeline = pipeline.resize({
      width,
      height,
      fit: "fill",
      withoutEnlargement: false,
    });
  } else if (options.lock) {
    // One dimension only: Sharp keeps the original aspect ratio. No crop, no pad.
    pipeline = options.anchor === "height"
      ? pipeline.resize({ height: options.height, withoutEnlargement: false })
      : pipeline.resize({ width: options.width, withoutEnlargement: false });
  } else {
    pipeline = pipeline.resize({
      width: options.width,
      height: options.height,
      fit: "fill",
      withoutEnlargement: false,
    });
  }

  if (options.format === "jpeg" && metadata.hasAlpha) {
    pipeline = pipeline.flatten({ background: { r: 255, g: 255, b: 255 } });
  }

  if (options.dpi) {
    pipeline = pipeline.withMetadata({ density: options.dpi });
  } else {
    pipeline = pipeline.withMetadata(metadata.density ? { density: metadata.density } : {});
  }

  return pipeline.toFormat(options.format, outputOptions[options.format](options.quality)).toBuffer();
};

module.exports = {
  MAX_DIMENSION,
  MIN_DPI,
  MAX_DPI,
  parseResizeOptions,
  resizeImageBuffer,
};
