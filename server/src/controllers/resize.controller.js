const { createZip } = require("../services/zip.service");
const { parseResizeOptions, resizeImageBuffer } = require("../services/resize.service");

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

    const options = parseResizeOptions(req.body);
    const usedNames = new Set();
    const outputs = await Promise.all(req.files.map(async (file, index) => {
      const buffer = await resizeImageBuffer(file.buffer, options);
      return { name: outputName(file.originalname, options.format, index, usedNames), buffer };
    }));

    const zipBuffer = createZip(outputs);
    res.set({ "Content-Type": "application/zip", "Content-Disposition": 'attachment; filename="QuickPDFHD-resized-images.zip"' });
    return res.send(zipBuffer);
  } catch (error) {
    console.error(error);
    const unsafe = error instanceof TypeError || error instanceof ReferenceError;
    return res.status(400).json({
      success: false,
      message: unsafe || !error.message ? "Failed to resize images." : error.message,
    });
  }
};

module.exports = { resizeImages };
