const XLSX = require("xlsx");
const { extractTextLines } = require("./pdf-render.service");
const { pagesToDocx } = require("./docx.service");

const pdfToWord = async (buffer) => {
  const pages = await extractTextLines(buffer);
  const hasText = pages.some((page) => page.lines.length);
  if (!hasText) {
    throw new Error("No selectable text was found. Use OCR mode for scanned or image-only PDFs.");
  }
  return pagesToDocx(pages);
};

const inspectPdfText = async (buffer) => {
  const pages = await extractTextLines(buffer);
  const selectableCharacters = pages.reduce((sum, page) => sum + page.lines.join(" ").length, 0);
  return {
    pageCount: pages.length,
    hasSelectableText: selectableCharacters >= 20,
  };
};

const pdfToExcel = async (buffer) => {
  const pages = await extractTextLines(buffer);
  const hasCells = pages.some((page) => page.cells.length);
  if (!hasCells) {
    throw new Error("No table-like text was found. Scanned PDFs or pages without selectable text cannot be converted to Excel.");
  }

  const workbook = XLSX.utils.book_new();
  pages.forEach((page) => {
    const rows = page.cells.length ? page.cells : page.lines.map((line) => [line]);
    const sheet = XLSX.utils.aoa_to_sheet(rows);
    const name = `Page ${page.pageNumber}`.slice(0, 31);
    XLSX.utils.book_append_sheet(workbook, sheet, name);
  });

  return XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
};

module.exports = { pdfToWord, pdfToExcel, inspectPdfText };
