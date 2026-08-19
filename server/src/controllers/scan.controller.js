const pdfService = require("../services/pdf.service");

const scanImagesToPdf = async (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ success: false, message: "No images uploaded." });
    }

    const pdfBuffer = await pdfService.generatePdf(req.files, {
      autoCrop: req.body.autoCrop === "true",
      enhance: req.body.enhance || "color",
      pageNumbers: req.body.pageNumbers === "true",
      rotation: Number(req.body.rotation) || 0,
      targetKb: Number(req.body.targetKb) || 0,
    });

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

module.exports = { scanImagesToPdf };
