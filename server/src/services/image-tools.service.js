const sharp = require("sharp");

const outputOptions = {
  jpeg: (quality = 88) => ({ quality: Math.max(20, Math.min(quality, 95)), mozjpeg: true }),
  png: () => ({ compressionLevel: 9, adaptiveFiltering: true }),
  webp: (quality = 90) => ({ quality: Math.max(20, Math.min(quality, 95)), alphaQuality: 100 }),
};

/**
 * Converts an image buffer to the requested target format.
 * - Handles auto-rotation based on EXIF.
 * - For JPEG output: if source has alpha transparency, flattens over solid white background to avoid black boxes.
 * - For PNG output: preserves alpha channel with maximum compression.
 * - For WebP output: preserves alpha channel with high quality.
 */
const convertImageBuffer = async (buffer, { targetFormat = "jpeg", quality } = {}) => {
  const normalizedFormat = targetFormat === "jpg" ? "jpeg" : targetFormat;
  if (!["jpeg", "png", "webp"].includes(normalizedFormat)) {
    throw new Error(`Unsupported target format: ${targetFormat}. Supported formats are JPG, PNG, and WebP.`);
  }

  const image = sharp(buffer, { failOn: "none" }).rotate();
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error("The image file is corrupted or could not be decoded.");
  }

  let pipeline = image;

  // JPEG does not support transparency. Flatten over clean white background if alpha channel exists.
  if (normalizedFormat === "jpeg" && metadata.hasAlpha) {
    pipeline = pipeline.flatten({ background: { r: 255, g: 255, b: 255 } });
  }

  const formatter = outputOptions[normalizedFormat];
  const outputBuffer = await pipeline.toFormat(normalizedFormat, formatter(quality)).toBuffer();

  return {
    buffer: outputBuffer,
    format: normalizedFormat,
    width: metadata.width,
    height: metadata.height,
    hasAlpha: metadata.hasAlpha,
  };
};

module.exports = {
  convertImageBuffer,
};
