const { parseResizeOptions, resizeImageBuffer } = require("../services/resize.service");
const { keepOrReplaceExt, uniqueFilename, contentDisposition } = require("../utils/download-filename");

const contentTypeFor = (format) => {
  if (format === "jpeg") return "image/jpeg";
  if (format === "png") return "image/png";
  return "image/webp";
};

const outputName = (originalName, format, usedNames) => {
  const extension = format === "jpeg" ? "jpg" : format;
  return uniqueFilename(keepOrReplaceExt(originalName, extension, `image`), usedNames);
};

const resizeImages = async (req, res) => {
  try {
    if (!req.files?.length) return res.status(400).json({ success: false, message: "No images uploaded." });

    const options = parseResizeOptions(req.body);
    const contentType = contentTypeFor(options.format);
    const usedNames = new Set();
    const outputs = [];
    for (let index = 0; index < req.files.length; index += 1) {
      const file = req.files[index];
      const buffer = await resizeImageBuffer(file.buffer, options);
      outputs.push({
        name: outputName(file.originalname, options.format, usedNames),
        buffer,
        contentType,
      });
    }

    if (outputs.length === 1) {
      const [file] = outputs;
      res.set({
        "Content-Type": file.contentType,
        "Content-Disposition": contentDisposition(file.name),
        "Content-Length": file.buffer.length,
        "X-Content-Type-Options": "nosniff",
      });
      return res.status(200).end(file.buffer);
    }

    return res.status(200).json({
      success: true,
      files: outputs.map((file) => ({
        name: file.name,
        contentType: file.contentType,
        data: file.buffer.toString("base64"),
      })),
    });
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
