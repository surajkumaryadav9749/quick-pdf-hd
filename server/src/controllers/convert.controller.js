const pdfService = require("../services/pdf.service");

const convertImagesToPdf = async (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded.",
      });
    }

    const pdfBuffer = await pdfService.generatePdf(req.files);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="QuickPDFHD.pdf"',
      "Content-Length": pdfBuffer.length,
    });

    return res.send(pdfBuffer);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate PDF.",
    });
  }
};

module.exports = {
  convertImagesToPdf,
};
