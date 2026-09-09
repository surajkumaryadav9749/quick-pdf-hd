const multer = require("multer");
const { extensionOf } = require("../utils/file-signatures");

const storage = multer.memoryStorage();

const createUpload = ({ mimeTypes, extensions, label, fileSize, files }) =>
  multer({
    storage,
    limits: { fileSize, files },
    fileFilter: (req, file, callback) => {
      const extension = extensionOf(file.originalname);
      if (mimeTypes.includes(file.mimetype) || extensions.includes(extension)) {
        return callback(null, true);
      }
      return callback(new Error(`Only ${label} are allowed.`));
    },
  });

const pdfToolsUpload = createUpload({
  mimeTypes: ["application/pdf"],
  extensions: [".pdf"],
  label: "PDF files",
  fileSize: 25 * 1024 * 1024,
  files: 20,
});

const wordUpload = createUpload({
  mimeTypes: [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/octet-stream",
  ],
  extensions: [".doc", ".docx"],
  label: "DOC or DOCX files",
  fileSize: 15 * 1024 * 1024,
  files: 1,
});

const excelUpload = createUpload({
  mimeTypes: [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/octet-stream",
  ],
  extensions: [".xls", ".xlsx"],
  label: "XLS or XLSX files",
  fileSize: 15 * 1024 * 1024,
  files: 1,
});

module.exports = { pdfToolsUpload, wordUpload, excelUpload };
