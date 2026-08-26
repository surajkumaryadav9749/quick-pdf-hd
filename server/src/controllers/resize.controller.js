const sharp = require("sharp");
const { createZip } = require("../services/zip.service");

const outputOptions = {
  jpeg: (quality) => ({ quality, mozjpeg: true }),
  png: () => ({ compressionLevel: 9 }),
  webp: (quality) => ({ quality }),
};

const outputName = (originalName, format, index, usedNames) => {
  const extension = format === "jpeg" ? "jpg" : format;
  const baseName = (originalName.replace(/\.[^.]+$/, "") || `resized-image-${index + 1}`).slice(0, 150);
  let name = `${baseName}.${extension}`;
  let suffix = 1;
  while (usedNames.has(name.toLowerCase())) {
    name = `${baseName} (${suffix}).${extension}`;
    suffix += 1;
  }
  usedNames.add(name.toLowerCase());
  return name;
};

const resizeImages = async (req, res) => {
  try {
    if (!req.files?.length) return res.status(400).json({ success: false, message: "No images uploaded." });

    const width = Math.max(1, Math.min(Number(req.body.width) || 0, 8000)) || undefined;
    const height = Math.max(1, Math.min(Number(req.body.height) || 0, 8000)) || undefined;
    const format = ["jpeg", "png", "webp"].includes(req.body.format) ? req.body.format : "jpeg";
    const quality = Math.max(20, Math.min(Number(req.body.quality) || 80, 95));

    const usedNames = new Set();
    const outputs = await Promise.all(req.files.map(async (file, index) => {
      // Fill the requested canvas without distortion. `cover` scales the image
      // proportionally, then crops excess pixels from the centre; unlike
      // `contain`, it never adds padding or blank strips.
      const image = sharp(file.buffer).rotate().resize({
        width,
        height,
        fit: "cover",
        position: "centre",
        withoutEnlargement: false,
      });
      const buffer = await image.toFormat(format, outputOptions[format](quality)).toBuffer();
      return { name: outputName(file.originalname, format, index, usedNames), buffer };
    }));

    const zipBuffer = createZip(outputs);
    res.set({ "Content-Type": "application/zip", "Content-Disposition": 'attachment; filename="QuickPDFHD-resized-images.zip"' });
    return res.send(zipBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to resize images." });
  }
};

module.exports = { resizeImages };
