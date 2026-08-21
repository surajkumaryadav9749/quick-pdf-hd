const { createZip } = require("../services/zip.service");

const zipPdfs = (req, res) => {
  try {
    if (!req.files?.length) return res.status(400).json({ success: false, message: "No PDF files uploaded." });
    const zipBuffer = createZip(req.files.map((file, index) => ({ name: file.originalname || `document-${index + 1}.pdf`, buffer: file.buffer })));
    res.set({ "Content-Type": "application/zip", "Content-Disposition": 'attachment; filename="QuickPDFHD-PDF-files.zip"' });
    return res.send(zipBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to create ZIP file." });
  }
};

module.exports = { zipPdfs };
