const express = require("express");
const { pdfToolsUpload, wordUpload, excelUpload } = require("../middleware/pdf-tools-upload.middleware");
const handleUploadError = require("../middleware/upload-error.middleware");
const controller = require("../controllers/pdf-tools.controller");

const router = express.Router();

router.post("/merge", pdfToolsUpload.array("files", 20), handleUploadError, controller.mergePdfs);
router.post("/split", pdfToolsUpload.array("files", 1), handleUploadError, controller.splitPdf);
router.post("/pdf-to-jpg", pdfToolsUpload.array("files", 1), handleUploadError, controller.convertPdfToJpg);
router.post("/word-to-pdf", wordUpload.array("files", 1), handleUploadError, controller.convertWordToPdf);
router.post("/excel-to-pdf", excelUpload.array("files", 1), handleUploadError, controller.convertExcelToPdf);
router.post("/pdf-to-word", pdfToolsUpload.array("files", 1), handleUploadError, controller.convertPdfToWord);
router.post("/pdf-inspect", pdfToolsUpload.array("files", 1), handleUploadError, controller.inspectPdf);
router.post("/pdf-to-excel", pdfToolsUpload.array("files", 1), handleUploadError, controller.convertPdfToExcel);

module.exports = router;
