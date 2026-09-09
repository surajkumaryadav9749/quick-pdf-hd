const { PDFDocument, StandardFonts } = require("pdf-lib");
const { Document, Packer, Paragraph, TextRun } = require("docx");
const XLSX = require("xlsx");
const { mergePdfs, extractPages, splitIntoSinglePages } = require("../src/services/pdf-pages.service");
const { pdfToJpgArchive, extractTextLines } = require("../src/services/pdf-render.service");
const { wordToPdf } = require("../src/services/word-pdf.service");
const { excelToPdf } = require("../src/services/excel-pdf.service");
const { pdfToWord, pdfToExcel } = require("../src/services/pdf-office.service");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const makePdf = async (text) => {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([400, 500]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  page.drawText(text, { x: 40, y: 420, size: 18, font });
  return Buffer.from(await pdf.save());
};

(async () => {
  const first = await makePdf("First page document");
  const second = await makePdf("Second page document");
  assert(first.toString("utf8", 0, 4) === "%PDF", "source PDF missing header");

  const merged = await mergePdfs([{ buffer: first }, { buffer: second }]);
  const mergedDoc = await PDFDocument.load(merged);
  assert(mergedDoc.getPageCount() === 2, "merge should keep both pages");

  const extracted = await extractPages(merged, "2");
  const extractedDoc = await PDFDocument.load(extracted);
  assert(extractedDoc.getPageCount() === 1, "extract should keep one page");

  const pages = await splitIntoSinglePages(merged, "");
  assert(pages.length === 2, "split should emit two PDFs");

  const jpg = await pdfToJpgArchive(first);
  assert(jpg.contentType === "image/jpeg", "single page should return jpeg");
  assert(jpg.buffer[0] === 0xff && jpg.buffer[1] === 0xd8, "jpeg magic missing");

  const lines = await extractTextLines(first);
  assert(lines[0].lines.join(" ").includes("First page"), "pdf text extraction failed");

  const wordDoc = new Document({
    sections: [{ children: [new Paragraph({ children: [new TextRun("Hello from Word")] })] }],
  });
  const docxBuffer = Buffer.from(await Packer.toBuffer(wordDoc));
  const fromWord = await wordToPdf({ originalname: "note.docx", buffer: docxBuffer });
  assert(fromWord.toString("utf8", 0, 4) === "%PDF", "word to pdf failed");

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet([["Item", "Qty"], ["Pens", 4]]), "Stock");
  const xlsxBuffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  const fromExcel = await excelToPdf({ originalname: "stock.xlsx", buffer: xlsxBuffer });
  assert(fromExcel.toString("utf8", 0, 4) === "%PDF", "excel to pdf failed");

  const docxOut = await pdfToWord(first);
  assert(docxOut[0] === 0x50 && docxOut[1] === 0x4b, "pdf to word should be zip/docx");

  const xlsxOut = await pdfToExcel(first);
  assert(xlsxOut[0] === 0x50 && xlsxOut[1] === 0x4b, "pdf to excel should be zip/xlsx");

  console.log("pdf-tools conversion checks passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
