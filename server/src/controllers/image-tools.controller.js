const { convertImageBuffer } = require("../services/image-tools.service");
const { keepOrReplaceExt, uniqueFilename, contentDisposition } = require("../utils/download-filename");

const contentTypeFor = (format) => {
  if (format === "jpeg" || format === "jpg") return "image/jpeg";
  if (format === "png") return "image/png";
  if (format === "webp") return "image/webp";
  return "application/octet-stream";
};

const outputName = (originalName, format, usedNames) => {
  const extension = format === "jpeg" ? "jpg" : format;
  return uniqueFilename(keepOrReplaceExt(originalName, extension, "image"), usedNames);
};

const convertImages = async (req, res) => {
  try {
    if (!req.files || !req.files.length) {
      return res.status(400).json({ success: false, message: "No image files were uploaded." });
    }

    const rawTarget = String(req.body.targetFormat || req.body.format || "jpeg").toLowerCase().trim();
    const targetFormat = rawTarget === "jpg" ? "jpeg" : rawTarget;

    if (!["jpeg", "png", "webp"].includes(targetFormat)) {
      return res.status(400).json({
        success: false,
        message: "Invalid target format. Supported target formats are jpg, png, and webp.",
      });
    }

    const quality = req.body.quality ? Number(req.body.quality) : undefined;
    const contentType = contentTypeFor(targetFormat);
    const usedNames = new Set();
    const outputs = [];

    for (let index = 0; index < req.files.length; index += 1) {
      const file = req.files[index];
      const result = await convertImageBuffer(file.buffer, { targetFormat, quality });
      outputs.push({
        name: outputName(file.originalname, targetFormat, usedNames),
        buffer: result.buffer,
        contentType,
      });
    }

    // Single file download: return direct binary stream
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

    // Multiple files: return structured JSON matching frontend parseImageFileResponse
    return res.status(200).json({
      success: true,
      files: outputs.map((file) => ({
        name: file.name,
        contentType: file.contentType,
        data: file.buffer.toString("base64"),
      })),
    });
  } catch (error) {
    console.error("Image convert error:", error);
    const unsafe = error instanceof TypeError || error instanceof ReferenceError;
    return res.status(400).json({
      success: false,
      message: unsafe || !error.message ? "Failed to convert image." : error.message,
    });
  }
};

module.exports = {
  convertImages,
};
