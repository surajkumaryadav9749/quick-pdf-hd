const pdfService = require("../services/pdf.service");

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

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="QuickPDFHD-scanned-document.pdf"',
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
    const outputs = [];
    for (let index = 0; index < req.files.length; index += 1) {
      const file = req.files[index];
      const buffer = await pdfService.processDocumentImage(file.buffer, options);
      const suffix = req.files.length === 1 ? "" : `-${String(index + 1).padStart(3, "0")}`;
      outputs.push({
        name: `scanned-result${suffix}.jpg`,
        buffer,
        contentType: "image/jpeg",
      });
    }

    if (outputs.length === 1) {
      const [file] = outputs;
      res.set({
        "Content-Type": file.contentType,
        "Content-Disposition": `attachment; filename="${file.name}"`,
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
