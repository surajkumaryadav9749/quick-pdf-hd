const sharp = require("sharp");
const { PDFDocument } = require("pdf-lib");
const { pdfToWordOcr } = require("../src/services/ocr.service");

(async () => {
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
  const buf = Buffer.from(await pdf.save());
  console.log("pdf bytes", buf.length);
  const docx = await pdfToWordOcr(buf, "eng");
  console.log("docx", docx.length);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
