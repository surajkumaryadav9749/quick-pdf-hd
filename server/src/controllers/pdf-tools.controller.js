const fs = require("fs");
const { isPdfBuffer, isZipBuffer, isOleBuffer, extensionOf } = require("../utils/file-signatures");
const { createZip } = require("../services/zip.service");
const pdfPages = require("../services/pdf-pages.service.js");
const { convertPdfToJpgOnDisk } = require("../services/pdf-render.service");
const { wordToPdf } = require("../services/word-pdf.service");
const { excelToPdf } = require("../services/excel-pdf.service");
const { pdfToWord, pdfToExcel, inspectPdfText } = require("../services/pdf-office.service");
const { pdfToWordOcr, OCR_MAX_PAGES, resolveOcrLanguage } = require("../services/ocr.service");
const { logMemory } = require("../utils/memory-log");
const { acquireJpgSlot, releaseJpgSlot } = require("../utils/jpg-job-lock");

const sendFile = (res, buffer, contentType, filename) => {
  res.set({
    "Content-Type": contentType,
    "Content-Disposition": `attachment; filename="${filename}"`,
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

const sendFileFromPath = (res, filePath, contentType, filename, cleanup) => {
  const size = fs.statSync(filePath).size;
  res.set({
    "Content-Type": contentType,
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Content-Length": size,
    "X-Content-Type-Options": "nosniff",
  });
  const stream = fs.createReadStream(filePath);
  let finished = false;
  const done = () => {
    if (finished) return;
    finished = true;
    cleanup();
  };
  stream.on("error", (error) => {
    done();
    if (!res.headersSent) fail(res, error);
    else res.destroy(error);
  });
  res.on("close", done);
  res.on("finish", done);
  return stream.pipe(res);
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
    return sendFile(res, buffer, "application/pdf", "QuickPDFHD-merged.pdf");
  } catch (error) {
    return fail(res, error);
  }
};

const splitPdf = async (req, res) => {
  try {
    requirePdfFiles(req.files, 1);
    const file = req.files[0];
    const mode = String(req.body.mode || "extract").toLowerCase();
    const range = req.body.range || "";

    if (mode === "pages") {
      const outputs = await pdfPages.splitIntoSinglePages(file.buffer, range);
      const zip = createZip(outputs);
      return sendFile(res, zip, "application/zip", "QuickPDFHD-split-pages.zip");
    }

    if (mode === "chunks") {
      const outputs = await pdfPages.splitIntoChunks(file.buffer, req.body.chunkSize);
      const zip = createZip(outputs);
      return sendFile(res, zip, "application/zip", "QuickPDFHD-split-pdf.zip");
    }

    const buffer = await pdfPages.extractPages(file.buffer, range);
    return sendFile(res, buffer, "application/pdf", "QuickPDFHD-extracted-pages.pdf");
  } catch (error) {
    return fail(res, error);
  }
};

const convertPdfToJpg = async (req, res) => {
  logMemory("request-start");
  let occupied = false;
  try {
    requirePdfFiles(req.files, 1);
    logMemory("after-upload-received", { pdfBytes: req.files[0].size || req.files[0].buffer?.length || 0 });
    acquireJpgSlot();
    occupied = true;
    const result = await convertPdfToJpgOnDisk(req.files[0].buffer);
    try {
      logMemory("before-response");
      return sendFileFromPath(res, result.path, result.contentType, result.filename, result.cleanup);
    } catch (error) {
      result.cleanup();
      throw error;
    }
  } catch (error) {
    const message = String(error.message || "");
    if (!error.status) {
      if (/up to \d+ pages|Only valid PDF|No files|empty files|empty\./i.test(message)) {
        error.status = 400;
      } else {
        error.status = 500;
      }
    }
    return fail(res, error);
  } finally {
    if (occupied) releaseJpgSlot();
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
    return sendFile(res, buffer, "application/pdf", "QuickPDFHD-word.pdf");
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
    return sendFile(res, buffer, "application/pdf", "QuickPDFHD-excel.pdf");
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
    return sendFile(res, buffer, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "QuickPDFHD-document.docx");
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
    return sendFile(res, buffer, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "QuickPDFHD-tables.xlsx");
  } catch (error) {
    return fail(res, error);
  }
};

module.exports = {
  mergePdfs,
  splitPdf,
  convertPdfToJpg,
  convertWordToPdf,
  convertExcelToPdf,
  convertPdfToWord,
  convertPdfToExcel,
  inspectPdf,
};
