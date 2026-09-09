const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const XLSX = require("xlsx");
const { wrapText, toPdfText } = require("../utils/text");
const { isZipBuffer, isOleBuffer, extensionOf } = require("../utils/file-signatures");

const PAGE_WIDTH = 841.89;
const PAGE_HEIGHT = 595.28;
const MARGIN = 36;
const FONT_SIZE = 8;
const LINE_GAP = 3;

const readWorkbook = (file) => {
  const extension = extensionOf(file.originalname);
  if (!file.buffer?.length) throw new Error("The spreadsheet is empty.");
  if (extension === ".xlsx" && !isZipBuffer(file.buffer)) {
    throw new Error("The XLSX file could not be read.");
  }
  if (extension === ".xls" && !isOleBuffer(file.buffer) && !isZipBuffer(file.buffer)) {
    throw new Error("The XLS file could not be read.");
  }
  try {
    return XLSX.read(file.buffer, { type: "buffer", cellDates: true, raw: false });
  } catch {
    throw new Error("The spreadsheet could not be read. It may be damaged or password-protected.");
  }
};

const cellText = (value) => {
  if (value == null) return "";
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return toPdfText(String(value));
};

const sheetRows = (sheet) => {
  const data = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "", raw: false, blankrows: false });
  return data
    .map((row) => (Array.isArray(row) ? row.map(cellText) : []))
    .filter((row) => row.some((cell) => cell.trim()));
};

const excelToPdf = async (file) => {
  const workbook = readWorkbook(file);
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const usableWidth = PAGE_WIDTH - MARGIN * 2;

  const sheets = workbook.SheetNames.length ? workbook.SheetNames : [];
  if (!sheets.length) throw new Error("The spreadsheet does not contain any worksheets.");

  for (const name of sheets) {
    const rows = sheetRows(workbook.Sheets[name]);
    if (!rows.length) continue;
    const columnCount = Math.min(12, Math.max(...rows.map((row) => row.length), 1));
    const columnWidth = usableWidth / columnCount;
    let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    let y = PAGE_HEIGHT - MARGIN;

    const drawSheetTitle = () => {
      page.drawText(toPdfText(name).slice(0, 80) || "Sheet", {
        x: MARGIN,
        y: y - 12,
        size: 12,
        font: bold,
        color: rgb(0.08, 0.1, 0.14),
      });
      y -= 20;
    };

    drawSheetTitle();

    rows.slice(0, 400).forEach((row, rowIndex) => {
      const cells = [];
      for (let column = 0; column < columnCount; column += 1) {
        cells.push(wrapText(row[column] || "", font, FONT_SIZE, columnWidth - 6));
      }
      const lineCount = Math.max(1, ...cells.map((lines) => lines.length));
      const rowHeight = lineCount * (FONT_SIZE + LINE_GAP) + 8;
      if (y - rowHeight < MARGIN) {
        page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
        y = PAGE_HEIGHT - MARGIN;
        drawSheetTitle();
      }

      if (rowIndex === 0) {
        page.drawRectangle({
          x: MARGIN,
          y: y - rowHeight,
          width: usableWidth,
          height: rowHeight,
          color: rgb(0.93, 0.97, 0.96),
        });
      }

      page.drawRectangle({
        x: MARGIN,
        y: y - rowHeight,
        width: usableWidth,
        height: rowHeight,
        borderColor: rgb(0.8, 0.84, 0.88),
        borderWidth: 0.4,
      });

      cells.forEach((lines, column) => {
        lines.forEach((line, lineIndex) => {
          page.drawText(line, {
            x: MARGIN + column * columnWidth + 3,
            y: y - 12 - lineIndex * (FONT_SIZE + LINE_GAP),
            size: FONT_SIZE,
            font: rowIndex === 0 ? bold : font,
            color: rgb(0.08, 0.1, 0.14),
          });
        });
      });

      y -= rowHeight;
    });
  }

  if (pdf.getPageCount() === 0) throw new Error("The spreadsheet did not contain readable table data.");
  return Buffer.from(await pdf.save());
};

module.exports = { excelToPdf, readWorkbook, sheetRows };
