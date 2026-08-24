const { createZip } = require("../services/zip.service");

const safeEntryName = (name, usedNames) => {
  const baseName = String(name || "document.pdf")
    .replace(/[\\/]+/g, "_")
    .replace(/[^a-zA-Z0-9._ -]/g, "_")
    .replace(/^\.+/, "")
    .slice(0, 160) || "document.pdf";
  const extensionIndex = baseName.lastIndexOf(".");
  const stem = extensionIndex > 0 ? baseName.slice(0, extensionIndex) : baseName;
  const extension = extensionIndex > 0 ? baseName.slice(extensionIndex) : ".pdf";
  let candidate = `${stem}${extension}`;
  let index = 1;
  while (usedNames.has(candidate.toLowerCase())) {
    candidate = `${stem} (${index})${extension}`;
    index += 1;
  }
  usedNames.add(candidate.toLowerCase());
  return candidate;
};

const zipPdfs = (req, res) => {
  try {
    if (!req.files?.length) return res.status(400).json({ success: false, message: "No PDF files uploaded." });
    const usedNames = new Set();
    const zipBuffer = createZip(req.files.map((file, index) => ({
      name: safeEntryName(file.originalname || `document-${index + 1}.pdf`, usedNames),
      buffer: file.buffer,
    })));
    res.set({ "Content-Type": "application/zip", "Content-Disposition": 'attachment; filename="QuickPDFHD-PDF-files.zip"' });
    return res.send(zipBuffer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to create ZIP file." });
  }
};

module.exports = { zipPdfs };
