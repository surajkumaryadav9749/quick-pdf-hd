const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require("docx");
const XLSX = require("xlsx");
const { extractTextLines } = require("./pdf-render.service");

const pdfToWord = async (buffer) => {
  const pages = await extractTextLines(buffer);
  const hasText = pages.some((page) => page.lines.length);
  if (!hasText) {
    throw new Error("No selectable text was found. Scanned or image-only PDFs cannot be converted to an editable Word file.");
  }

  const children = [];
  pages.forEach((page, index) => {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: `Page ${page.pageNumber}`, bold: true })],
      }),
    );
    if (!page.lines.length) {
      children.push(new Paragraph({ children: [new TextRun({ text: "[No selectable text on this page]", italics: true })] }));
    } else {
      page.lines.forEach((line) => {
        children.push(new Paragraph({ children: [new TextRun(line)] }));
      });
    }
    if (index < pages.length - 1) children.push(new Paragraph({ children: [] }));
  });

  const document = new Document({
    sections: [{ properties: {}, children }],
  });
  return Buffer.from(await Packer.toBuffer(document));
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

module.exports = { pdfToWord, pdfToExcel };
