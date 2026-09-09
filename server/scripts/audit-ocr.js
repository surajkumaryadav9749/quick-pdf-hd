const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const sharp = require("sharp");
const { PDFDocument } = require("pdf-lib");
const { createCanvas, GlobalFonts } = require("@napi-rs/canvas");
const { pdfToWord } = require("../src/services/pdf-office.service");
const { pdfToWordOcr, resolveOcrLanguage, assertOcrLimits } = require("../src/services/ocr.service");

const officeSource = fs.readFileSync(path.join(__dirname, "../src/services/pdf-office.service.js"), "utf8");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const expectError = async (fn, pattern, label) => {
  let message = "";
  try {
    await fn();
  } catch (error) {
    message = String(error.message || error);
  }
  assert(message, `${label}: expected an error`);
  assert(!/at Object\.|TypeError:|ReferenceError:/.test(message) || pattern.test(message), `${label}: leaked internals: ${message}`);
  assert(pattern.test(message), `${label}: unexpected message: ${message}`);
};

const docxXml = (buffer) => {
  assert(buffer[0] === 0x50 && buffer[1] === 0x4b, "Not a ZIP/DOCX package");
  let offset = 0;
  let hasContentTypes = false;
  let xml = "";
  while (offset < buffer.length - 30 && buffer.readUInt32LE(offset) === 0x04034b50) {
    const method = buffer.readUInt16LE(offset + 8);
    const compressed = buffer.readUInt32LE(offset + 18);
    const nameLen = buffer.readUInt16LE(offset + 26);
    const extraLen = buffer.readUInt16LE(offset + 28);
    const name = buffer.slice(offset + 30, offset + 30 + nameLen).toString("utf8");
    const dataStart = offset + 30 + nameLen + extraLen;
    const data = buffer.slice(dataStart, dataStart + compressed);
    if (name === "[Content_Types].xml") hasContentTypes = true;
    if (name === "word/document.xml") {
      xml = (method === 0 ? data : zlib.inflateRawSync(data)).toString("utf8");
    }
    offset = dataStart + compressed;
  }
  assert(hasContentTypes, "DOCX missing [Content_Types].xml");
  assert(xml.includes("<w:document"), "DOCX missing word/document.xml");
  return xml;
};

const xmlText = (xml) => xml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");

const registerHindiFont = () => {
  const candidates = [
    "C:\\Windows\\Fonts\\Nirmala.ttc",
    "C:\\Windows\\Fonts\\Nirmala.ttf",
    "C:\\Windows\\Fonts\\nirmala.ttf",
    "C:\\Windows\\Fonts\\NirmalaS.ttf",
    "C:\\Windows\\Fonts\\mangal.ttf",
    "C:\\Windows\\Fonts\\Mangal.ttf",
  ];
  const found = candidates.find((file) => fs.existsSync(file));
  assert(found, "No Hindi system font found for generating a Hindi scan fixture");
  GlobalFonts.registerFromPath(found, "HindiAudit");
  return "HindiAudit";
};

const rasterTextPng = async ({ width, height, draw }) => {
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#111111";
  draw(context);
  return canvas.toBuffer("image/png");
};

const embedPngPdf = async (png, pageSize) => {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage(pageSize || [pngMeta(png).width, pngMeta(png).height]);
  const image = await pdf.embedPng(png);
  page.drawImage(image, { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() });
  return Buffer.from(await pdf.save());
};

const pngMeta = (png) => {
  const width = png.readUInt32BE(16);
  const height = png.readUInt32BE(20);
  return { width, height };
};

const embedJpegPdf = async (jpeg, size) => {
  const pdf = await PDFDocument.create();
  const meta = await sharp(jpeg).metadata();
  const page = pdf.addPage(size || [meta.width, meta.height]);
  const image = await pdf.embedJpg(jpeg);
  page.drawImage(image, { x: 0, y: 0, width: page.getWidth(), height: page.getHeight() });
  return Buffer.from(await pdf.save());
};

const textPdf = async (lines) => {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([420, 560]);
  lines.forEach((line, index) => {
    page.drawText(line, { x: 40, y: 480 - index * 28, size: 18 });
  });
  return Buffer.from(await pdf.save());
};

(async () => {
  assert(!/tesseract/i.test(officeSource), "NO OCR path must not import Tesseract");

  await expectError(() => Promise.resolve(resolveOcrLanguage("fra")), /Unsupported OCR language/, "unsupported language");

  const selectable = await textPdf(["Selectable PDF text for Word"]);
  const noOcr = await pdfToWord(selectable);
  const noOcrXml = xmlText(docxXml(noOcr));
  assert(noOcrXml.includes("Selectable PDF text"), `NO OCR missing text: ${noOcrXml.slice(0, 300)}`);

  const jpegScan = await sharp(Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="220">
      <rect width="900" height="220" fill="white"/>
      <text x="40" y="130" font-size="52" font-family="Arial, sans-serif" fill="black">HELLO OCR TEST</text>
    </svg>`,
  )).jpeg({ quality: 92 }).toBuffer();
  const jpegPdf = await embedJpegPdf(jpegScan);

  let noOcrRejected = false;
  try {
    await pdfToWord(jpegPdf);
  } catch {
    noOcrRejected = true;
  }
  assert(noOcrRejected, "NO OCR should reject image-only PDFs");

  const englishDocx = await pdfToWordOcr(jpegPdf, "eng");
  const englishText = xmlText(docxXml(englishDocx));
  assert(/HELLO|OCR|TEST/.test(englishText), `English OCR missed text: ${englishText.slice(0, 400)}`);
  console.log("A/D English JPEG-in-PDF OCR:", englishText.replace(/Page \d+/g, "").trim().slice(0, 120));

  const pngScan = await sharp(Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="220">
      <rect width="900" height="220" fill="white"/>
      <text x="40" y="130" font-size="52" font-family="Arial, sans-serif" fill="black">PNG EMBEDDED OCR</text>
    </svg>`,
  )).png().toBuffer();
  const pngPdf = await embedPngPdf(pngScan, [900, 220]);
  const pngDocx = await pdfToWordOcr(pngPdf, "eng");
  const pngText = xmlText(docxXml(pngDocx));
  assert(/PNG|EMBEDDED|OCR/.test(pngText), `PNG OCR missed text: ${pngText.slice(0, 400)}`);
  console.log("E PNG-in-PDF OCR:", pngText.replace(/Page \d+/g, "").trim().slice(0, 120));

  const pageOne = await sharp(Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="200">
      <rect width="800" height="200" fill="white"/>
      <text x="40" y="120" font-size="44" font-family="Arial" fill="black">PAGE ONE ALPHA</text>
    </svg>`,
  )).jpeg({ quality: 90 }).toBuffer();
  const pageTwo = await sharp(Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="200">
      <rect width="800" height="200" fill="white"/>
      <text x="40" y="120" font-size="44" font-family="Arial" fill="black">PAGE TWO BRAVO</text>
    </svg>`,
  )).jpeg({ quality: 90 }).toBuffer();
  const multi = await PDFDocument.create();
  const first = multi.addPage([800, 200]);
  const second = multi.addPage([800, 200]);
  first.drawImage(await multi.embedJpg(pageOne), { x: 0, y: 0, width: 800, height: 200 });
  second.drawImage(await multi.embedJpg(pageTwo), { x: 0, y: 0, width: 800, height: 200 });
  const multiPdf = Buffer.from(await multi.save());
  const multiDocx = await pdfToWordOcr(multiPdf, "eng");
  const multiText = xmlText(docxXml(multiDocx));
  const alphaAt = multiText.indexOf("PAGE ONE");
  const bravoAt = multiText.indexOf("PAGE TWO");
  assert(alphaAt >= 0 && bravoAt >= 0 && alphaAt < bravoAt, `Multi-page order failed: ${multiText.slice(0, 500)}`);
  console.log("C multi-page order OK");

  const hindiFont = registerHindiFont();
  const hindiPng = await rasterTextPng({
    width: 1100,
    height: 280,
    draw: (context) => {
      context.font = "64px HindiAudit";
      context.fillText("नमस्ते भारत", 60, 160);
    },
  });
  const hindiPdf = await embedPngPdf(hindiPng, [1100, 280]);
  const hindiDocx = await pdfToWordOcr(hindiPdf, "hin");
  const hindiText = xmlText(docxXml(hindiDocx));
  assert(/नमस्त|भारत|नमस्ते/.test(hindiText), `Hindi OCR did not produce Devanagari: ${hindiText.slice(0, 500)}`);
  console.log("F Hindi OCR:", hindiText.replace(/Page \d+/g, "").trim().slice(0, 160));

  const mixedPng = await rasterTextPng({
    width: 1200,
    height: 300,
    draw: (context) => {
      context.font = "48px Arial";
      context.fillText("Hello", 60, 120);
      context.font = `56px ${hindiFont}`;
      context.fillText("नमस्ते", 60, 220);
    },
  });
  const mixedPdf = await embedPngPdf(mixedPng, [1200, 300]);
  const mixedDocx = await pdfToWordOcr(mixedPdf, "eng+hin");
  const mixedText = xmlText(docxXml(mixedDocx));
  assert(/Hello|HELLO/.test(mixedText), `Mixed OCR missed English: ${mixedText.slice(0, 500)}`);
  assert(/नमस्त|नमस्ते/.test(mixedText), `Mixed OCR missed Hindi: ${mixedText.slice(0, 500)}`);
  console.log("G mixed OCR:", mixedText.replace(/Page \d+/g, "").trim().slice(0, 160));

  const low = await sharp(Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120">
      <rect width="400" height="120" fill="#f4f4f4"/>
      <text x="20" y="75" font-size="28" font-family="Arial" fill="#333">LOW QUALITY SCAN</text>
    </svg>`,
  )).jpeg({ quality: 18 }).blur(0.6).toBuffer();
  const lowPdf = await embedJpegPdf(low);
  const lowDocx = await pdfToWordOcr(lowPdf, "eng");
  const lowText = xmlText(docxXml(lowDocx));
  assert(/LOW|QUALITY|SCAN/.test(lowText), `Low-quality OCR missed text: ${lowText.slice(0, 400)}`);
  console.log("H low-quality OCR:", lowText.replace(/Page \d+/g, "").trim().slice(0, 120));

  const upright = await sharp(Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="180">
      <rect width="700" height="180" fill="white"/>
      <text x="30" y="110" font-size="42" font-family="Arial" fill="black">ROTATED PAGE TEXT</text>
    </svg>`,
  )).png().toBuffer();
  const rotated = await sharp(upright).rotate(90).png().toBuffer();
  const rotatedPdf = await embedPngPdf(rotated);
  const rotatedDocx = await pdfToWordOcr(rotatedPdf, "eng");
  const rotatedText = xmlText(docxXml(rotatedDocx));
  console.log("I rotated OCR:", rotatedText.replace(/Page \d+/g, "").trim().slice(0, 160));
  assert(/ROTATED|PAGE|TEXT/.test(rotatedText), `Rotated OCR missed text: ${rotatedText.slice(0, 400)}`);

  const columns = await rasterTextPng({
    width: 1100,
    height: 360,
    draw: (context) => {
      context.font = "32px Arial";
      context.fillText("LEFT COLUMN ALPHA", 40, 80);
      context.fillText("left details continue", 40, 130);
      context.fillText("RIGHT COLUMN BRAVO", 580, 80);
      context.fillText("right details continue", 580, 130);
    },
  });
  const columnPdf = await embedPngPdf(columns, [1100, 360]);
  const columnDocx = await pdfToWordOcr(columnPdf, "eng");
  const columnText = xmlText(docxXml(columnDocx));
  assert(/LEFT|ALPHA/.test(columnText) && /RIGHT|BRAVO/.test(columnText), `Multi-column OCR missed columns: ${columnText.slice(0, 400)}`);
  console.log("J multi-column OCR:", columnText.replace(/Page \d+/g, "").trim().slice(0, 160));

  const vectorPdf = await textPdf(["VECTOR PAGE RENDER OCR"]);
  const vectorDocx = await pdfToWordOcr(vectorPdf, "eng");
  const vectorText = xmlText(docxXml(vectorDocx));
  assert(/VECTOR|PAGE|RENDER|OCR/.test(vectorText), `Vector-page OCR failed: ${vectorText.slice(0, 400)}`);
  console.log("A digital/selectable via OCR render:", vectorText.replace(/Page \d+/g, "").trim().slice(0, 120));

  await expectError(() => pdfToWordOcr(Buffer.from("%PDF-1.4 broken"), "eng"), /could not be read|damaged|incomplete/i, "corrupted PDF");
  await expectError(() => pdfToWordOcr(jpegPdf, "fra"), /Unsupported OCR language/, "bad language");

  const emptyPdf = await PDFDocument.create();
  const emptyBytes = Buffer.from(await emptyPdf.save());
  await expectError(() => pdfToWordOcr(emptyBytes, "eng"), /does not contain any pages|could not recognize readable text/i, "empty PDF");

  const oversized = await PDFDocument.create();
  for (let index = 0; index < 16; index += 1) oversized.addPage();
  await expectError(async () => assertOcrLimits(Buffer.from(await oversized.save())), /up to 15 pages/, "page limit");

  const encryptedStub = Buffer.from(
    "%PDF-1.4\n1 0 obj<< /Type /Catalog /Pages 3 0 R >>endobj\n2 0 obj<< /Filter /Standard /V 1 /R 2 /O (xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx) /U (xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx) /P -4 >>endobj\n3 0 obj<< /Type /Pages /Count 0 /Kids [] >>endobj\ntrailer<< /Root 1 0 R /Encrypt 2 0 R /Size 4 >>\n%%EOF\n",
  );
  await expectError(() => pdfToWordOcr(encryptedStub, "eng"), /Encrypted PDFs|password|could not be read|damaged/i, "encrypted PDF");

  const firstConcurrent = pdfToWordOcr(jpegPdf, "eng");
  const secondConcurrent = pdfToWordOcr(pngPdf, "eng");
  const [one, two] = await Promise.all([firstConcurrent, secondConcurrent]);
  assert(/HELLO|OCR/.test(xmlText(docxXml(one))) && /PNG|EMBEDDED/.test(xmlText(docxXml(two))), "Concurrent OCR requests failed");
  console.log("Concurrent OCR requests OK");

  console.log("OCR audit checks passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
