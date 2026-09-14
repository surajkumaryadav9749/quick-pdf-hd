const pdfService = require("../services/pdf.service");
const { withExtension, keepOrReplaceExt, uniqueFilename, jpegExtFromOriginal, contentDisposition } = require("../utils/download-filename");

const scanOptions = (body = {}) => ({
  autoCrop: body.autoCrop === "true",
  enhance: body.enhance || "color",
  pageNumbers: body.pageNumbers === "true",
  rotation: Number(body.rotation) || 0,
  targetKb: Number(body.targetKb) || 0,
});

const scanImagesToPdf = async (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ success: false, message: "No images uploaded." });
    }

    const pdfBuffer = await pdfService.generatePdf(req.files, scanOptions(req.body));
    const filename = withExtension(req.files[0].originalname, ".pdf");

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": contentDisposition(filename),
      "Content-Length": pdfBuffer.length,
    });

    return res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to scan and create PDF." });
  }
};

const scanImagesToFiles = async (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ success: false, message: "No images uploaded." });
    }

    const options = scanOptions(req.body);
    const usedNames = new Set();
    const outputs = [];
    for (let index = 0; index < req.files.length; index += 1) {
      const file = req.files[index];
      const buffer = await pdfService.processDocumentImage(file.buffer, options);
      const jpegExt = jpegExtFromOriginal(file.originalname).slice(1);
      outputs.push({
        name: uniqueFilename(keepOrReplaceExt(file.originalname, jpegExt), usedNames),
        buffer,
        contentType: "image/jpeg",
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
    return res.status(500).json({ success: false, message: "Failed to scan the image." });
  }
};

module.exports = { scanImagesToPdf, scanImagesToFiles };
