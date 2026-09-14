const { isPdfBuffer, isZipBuffer, isOleBuffer, extensionOf } = require("../utils/file-signatures");
const { createZip } = require("../services/zip.service");
const pdfPages = require("../services/pdf-pages.service.js");
const { wordToPdf } = require("../services/word-pdf.service");
const { excelToPdf } = require("../services/excel-pdf.service");
const { pdfToWord, pdfToExcel, inspectPdfText } = require("../services/pdf-office.service");
const { pdfToWordOcr, OCR_MAX_PAGES, resolveOcrLanguage } = require("../services/ocr.service");
const { withExtension, archiveNameFrom, numberedFromOriginal, contentDisposition } = require("../utils/download-filename");

const sendFile = (res, buffer, contentType, filename) => {
  res.set({
    "Content-Type": contentType,
    "Content-Disposition": contentDisposition(filename),
    "Content-Length": Buffer.byteLength(buffer),
    "X-Content-Type-Options": "nosniff",
  });
  return res.status(200).end(buffer);
};

const fail = (res, error) => {
  console.error(error);
  if (res.headersSent) return;
  const unsafe = error instanceof TypeError || error instanceof ReferenceError || /Cannot read properties/i.test(String(error.message || ""));
  const status = Number(error.status);
  const code = Number.isInteger(status) && status >= 400 && status < 600 ? status : 400;
  return res.status(code).json({
    success: false,
    message: unsafe || !error.message
      ? "The file could not be processed. Check the format and try again."
      : error.message,
  });
};

const requirePdfFiles = (files, minimum = 1) => {
  if (!files?.length) throw new Error("No files were uploaded.");
  if (files.length < minimum) throw new Error(`Upload at least ${minimum} PDF files.`);
  files.forEach((file) => {
    if (!file.size) throw new Error("Empty files cannot be processed.");
    if (!isPdfBuffer(file.buffer) || extensionOf(file.originalname) !== ".pdf") {
      throw new Error("Only valid PDF files are accepted.");
    }
  });
};

const mergePdfs = async (req, res) => {
  try {
    requirePdfFiles(req.files, 2);
    const buffer = await pdfPages.mergePdfs(req.files);
    return sendFile(res, buffer, "application/pdf", withExtension(req.files[0].originalname, ".pdf"));
  } catch (error) {
    return fail(res, error);
  }
};

const splitPdf = async (req, res) => {
  try {
    requirePdfFiles(req.files, 1);
    const file = req.files[0];
    const originalName = file.originalname;
    const mode = String(req.body.mode || "extract").toLowerCase();
    const range = req.body.range || "";

    if (mode === "pages") {
      const outputs = await pdfPages.splitIntoSinglePages(file.buffer, range);
      const usedNames = new Set();
      const zip = createZip(outputs.map((output, index) => ({
        ...output,
        name: numberedFromOriginal(originalName, ".pdf", index + 1, outputs.length, usedNames),
      })));
      return sendFile(res, zip, "application/zip", archiveNameFrom(originalName));
    }

    if (mode === "chunks") {
      const outputs = await pdfPages.splitIntoChunks(file.buffer, req.body.chunkSize);
      const usedNames = new Set();
      const zip = createZip(outputs.map((output, index) => ({
        ...output,
        name: numberedFromOriginal(originalName, ".pdf", index + 1, outputs.length, usedNames),
      })));
      return sendFile(res, zip, "application/zip", archiveNameFrom(originalName));
    }

    const buffer = await pdfPages.extractPages(file.buffer, range);
    return sendFile(res, buffer, "application/pdf", withExtension(originalName, ".pdf"));
  } catch (error) {
    return fail(res, error);
  }
};

const convertWordToPdf = async (req, res) => {
  try {
    const file = req.files?.[0];
    if (!file) throw new Error("Upload a Word document.");
    if (!file.size) throw new Error("The Word file is empty.");
    const extension = extensionOf(file.originalname);
    if (extension === ".docx" && !isZipBuffer(file.buffer)) throw new Error("The DOCX file could not be read.");
    if (extension === ".doc" && !isOleBuffer(file.buffer)) throw new Error("The DOC file could not be read.");
    const buffer = await wordToPdf(file);
    return sendFile(res, buffer, "application/pdf", withExtension(file.originalname, ".pdf"));
  } catch (error) {
    return fail(res, error);
  }
};

const convertExcelToPdf = async (req, res) => {
  try {
    const file = req.files?.[0];
    if (!file) throw new Error("Upload an Excel spreadsheet.");
    if (!file.size) throw new Error("The spreadsheet is empty.");
    const buffer = await excelToPdf(file);
    return sendFile(res, buffer, "application/pdf", withExtension(file.originalname, ".pdf"));
  } catch (error) {
    return fail(res, error);
  }
};

const convertPdfToWord = async (req, res) => {
  try {
    requirePdfFiles(req.files, 1);
    const useOcr = String(req.body.ocr || "").toLowerCase() === "true" || String(req.body.ocr || "").toLowerCase() === "ocr";
    if (useOcr) {
      resolveOcrLanguage(req.body.language);
    }
    const buffer = useOcr
      ? await pdfToWordOcr(req.files[0].buffer, req.body.language)
      : await pdfToWord(req.files[0].buffer);
    return sendFile(res, buffer, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", withExtension(req.files[0].originalname, ".docx"));
  } catch (error) {
    return fail(res, error);
  }
};

const inspectPdf = async (req, res) => {
  try {
    requirePdfFiles(req.files, 1);
    const info = await inspectPdfText(req.files[0].buffer);
    return res.json({ success: true, ...info, ocrPageLimit: OCR_MAX_PAGES });
  } catch (error) {
    return fail(res, error);
  }
};

const convertPdfToExcel = async (req, res) => {
  try {
    requirePdfFiles(req.files, 1);
    const buffer = await pdfToExcel(req.files[0].buffer);
    return sendFile(res, buffer, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", withExtension(req.files[0].originalname, ".xlsx"));
  } catch (error) {
    return fail(res, error);
  }
};

module.exports = {
  mergePdfs,
  splitPdf,
  convertWordToPdf,
  convertExcelToPdf,
  convertPdfToWord,
  convertPdfToExcel,
  inspectPdf,
};
