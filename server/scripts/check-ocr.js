const zlib = require("zlib");
const sharp = require("sharp");
const { PDFDocument } = require("pdf-lib");
const { pdfToWord } = require("../src/services/pdf-office.service");
const { pdfToWordOcr } = require("../src/services/ocr.service");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const textPdf = async () => {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([400, 500]);
  page.drawText("Selectable PDF text for Word", { x: 40, y: 400, size: 18 });
  return Buffer.from(await pdf.save());
};

const scannedPdf = async () => {
  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="200">
      <rect width="800" height="200" fill="white"/>
      <text x="40" y="120" font-size="48" font-family="DejaVu Sans, Arial, sans-serif" fill="black">HELLO OCR TEST</text>
    </svg>`,
  );
  const jpeg = await sharp(svg).jpeg({ quality: 90 }).toBuffer();
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([800, 200]);
  const image = await pdf.embedJpg(jpeg);
  page.drawImage(image, { x: 0, y: 0, width: 800, height: 200 });
  return Buffer.from(await pdf.save());
};

const docxXml = (buffer) => {
  let offset = 0;
  while (offset < buffer.length - 30 && buffer.readUInt32LE(offset) === 0x04034b50) {
    const method = buffer.readUInt16LE(offset + 8);
    const compressed = buffer.readUInt32LE(offset + 18);
    const nameLen = buffer.readUInt16LE(offset + 26);
    const extraLen = buffer.readUInt16LE(offset + 28);
    const name = buffer.slice(offset + 30, offset + 30 + nameLen).toString("utf8");
    const dataStart = offset + 30 + nameLen + extraLen;
    const data = buffer.slice(dataStart, dataStart + compressed);
    if (name === "word/document.xml") {
      return (method === 0 ? data : zlib.inflateRawSync(data)).toString("utf8");
    }
    offset = dataStart + compressed;
  }
  throw new Error("word/document.xml was not found");
};

const docxHas = (buffer, needle) => docxXml(buffer).toLowerCase().includes(String(needle).toLowerCase());

(async () => {
  const selectable = await textPdf();
  const noOcr = await pdfToWord(selectable);
  assert(noOcr[0] === 0x50 && noOcr[1] === 0x4b, "NO OCR should return docx");
  assert(docxHas(noOcr, "Selectable PDF text"), "NO OCR missing source text");

  const scanned = await scannedPdf();
  let failed = false;
  try {
    await pdfToWord(scanned);
  } catch {
    failed = true;
  }
  assert(failed, "NO OCR should reject image-only PDFs");

  const ocr = await pdfToWordOcr(scanned, "eng");
  assert(ocr[0] === 0x50 && ocr[1] === 0x4b, "OCR should return docx");
  assert(docxHas(ocr, "HELLO") || docxHas(ocr, "OCR"), `OCR text missing: ${docxXml(ocr).slice(0, 400)}`);

  console.log("pdf-to-word OCR checks passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
