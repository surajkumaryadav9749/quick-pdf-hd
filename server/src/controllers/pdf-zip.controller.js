const { createZip } = require("../services/zip.service");
const { sanitizeFilename, uniqueFilename, archiveNameFrom, contentDisposition } = require("../utils/download-filename");

const safeEntryName = (name, usedNames) => uniqueFilename(sanitizeFilename(name, "document.pdf"), usedNames);

const zipPdfs = (req, res) => {
  try {
    if (!req.files?.length) return res.status(400).json({ success: false, message: "No PDF files uploaded." });
    const usedNames = new Set();
    const zipBuffer = createZip(req.files.map((file, index) => ({
      name: safeEntryName(file.originalname || `document-${index + 1}.pdf`, usedNames),
      buffer: file.buffer,
    })));
    res.set({
      "Content-Type": "application/zip",
      "Content-Disposition": contentDisposition(
        req.body.zipName ? archiveNameFrom(req.body.zipName) : archiveNameFrom(req.files[0].originalname),
      ),
    });
    return res.send(zipBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to create ZIP file." });
  }
};

module.exports = { zipPdfs };
