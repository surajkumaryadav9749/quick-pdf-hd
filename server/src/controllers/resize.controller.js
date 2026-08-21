const sharp = require("sharp");
const { createZip } = require("../services/zip.service");

const outputOptions = {
  jpeg: (quality) => ({ quality, mozjpeg: true }),
  png: () => ({ compressionLevel: 9 }),
  webp: (quality) => ({ quality }),
};

const resizeImages = async (req, res) => {
  try {
    if (!req.files?.length) return res.status(400).json({ success: false, message: "No images uploaded." });

    const width = Math.max(1, Math.min(Number(req.body.width) || 0, 8000)) || undefined;
    const height = Math.max(1, Math.min(Number(req.body.height) || 0, 8000)) || undefined;
    const format = ["jpeg", "png", "webp"].includes(req.body.format) ? req.body.format : "jpeg";
    const quality = Math.max(20, Math.min(Number(req.body.quality) || 80, 95));

    const outputs = await Promise.all(req.files.map(async (file, index) => {
      const image = sharp(file.buffer).rotate().resize({ width, height, fit: "inside", withoutEnlargement: false });
      const buffer = await image.toFormat(format, outputOptions[format](quality)).toBuffer();
      const baseName = file.originalname.replace(/\.[^.]+$/, "") || `resized-image-${index + 1}`;
      return { name: `${baseName}.${format === "jpeg" ? "jpg" : format}`, buffer };
    }));

    if (outputs.length === 1) {
      res.set({ "Content-Type": `image/${format}`, "Content-Disposition": `attachment; filename="${outputs[0].name}"` });
      return res.send(outputs[0].buffer);
    }

    const zipBuffer = createZip(outputs);
    res.set({ "Content-Type": "application/zip", "Content-Disposition": 'attachment; filename="QuickPDFHD-resized-images.zip"' });
    return res.send(zipBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to resize images." });
  }
};

module.exports = { resizeImages };
