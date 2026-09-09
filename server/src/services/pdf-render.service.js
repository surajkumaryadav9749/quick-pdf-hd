const path = require("path");
const { createCanvas } = require("@napi-rs/canvas");
const sharp = require("sharp");
const { createZip } = require("./zip.service");

const MAX_PAGES = 40;
const SCALE = 1.6;
const PDFJS_ROOT = path.join(__dirname, "../../node_modules/pdfjs-dist");

class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(width, height);
    return { canvas, context: canvas.getContext("2d") };
  }

  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }

  destroy(canvasAndContext) {
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}

let pdfjsModule;

const loadPdfjs = async () => {
  if (!pdfjsModule) {
    pdfjsModule = await import("pdfjs-dist/legacy/build/pdf.mjs");
  }
  return pdfjsModule;
};

const openPdf = async (buffer) => {
  const pdfjs = await loadPdfjs();
  const data = new Uint8Array(buffer);
  try {
    return await pdfjs.getDocument({
      data,
      canvasFactory: new NodeCanvasFactory(),
      cMapUrl: `${path.join(PDFJS_ROOT, "cmaps")}${path.sep}`,
      cMapPacked: true,
      standardFontDataUrl: `${path.join(PDFJS_ROOT, "standard_fonts")}${path.sep}`,
      disableFontFace: false,
      isEvalSupported: false,
      useSystemFonts: true,
      verbosity: 0,
    }).promise;
  } catch (error) {
    const message = String(error.message || "");
    if (/password/i.test(message)) {
      throw new Error("Encrypted PDFs cannot be processed. Remove the password and try again.");
    }
    throw new Error("The PDF file could not be read. It may be damaged or incomplete.");
  }
};

const renderPdfToJpegs = async (buffer) => {
  const document = await openPdf(buffer);
  const pageCount = document.numPages;
  if (pageCount < 1) throw new Error("The PDF does not contain any pages.");
  if (pageCount > MAX_PAGES) {
    throw new Error(`PDF to JPG accepts documents with up to ${MAX_PAGES} pages.`);
  }

  const canvasFactory = new NodeCanvasFactory();
  const images = [];

  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const viewport = page.getViewport({ scale: SCALE });
    const { canvas, context } = canvasFactory.create(viewport.width, viewport.height);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, viewport.width, viewport.height);
    await page.render({ canvasContext: context, viewport, canvas, canvasFactory }).promise;
    const png = canvas.toBuffer("image/png");
    const jpeg = await sharp(png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    images.push({
      name: `page-${String(pageNumber).padStart(3, "0")}.jpg`,
      buffer: jpeg,
    });
    canvasFactory.destroy({ canvas, context });
  }

  return images;
};

const pdfToJpgArchive = async (buffer) => {
  const images = await renderPdfToJpegs(buffer);
  if (images.length === 1) return { buffer: images[0].buffer, filename: images[0].name, contentType: "image/jpeg" };
  return {
    buffer: createZip(images),
    filename: "QuickPDFHD-pdf-pages.zip",
    contentType: "application/zip",
  };
};

const extractTextLines = async (buffer) => {
  const document = await openPdf(buffer);
  const pageCount = document.numPages;
  if (pageCount > MAX_PAGES) {
    throw new Error(`This conversion accepts PDFs with up to ${MAX_PAGES} pages.`);
  }

  const pages = [];
  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    const rows = new Map();

    content.items.forEach((item) => {
      const text = String(item.str || "").trim();
      if (!text) return;
      const x = item.transform[4];
      const y = Math.round(item.transform[5]);
      const bucket = Math.round(y / 3) * 3;
      if (!rows.has(bucket)) rows.set(bucket, []);
      rows.get(bucket).push({ x, text });
    });

    const lines = [...rows.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([, parts]) => parts.sort((a, b) => a.x - b.x).map((part) => part.text).join(" ").replace(/\s+/g, " ").trim())
      .filter(Boolean);

    const cells = [...rows.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([, parts]) => parts.sort((a, b) => a.x - b.x).map((part) => part.text));

    pages.push({ pageNumber, lines, cells });
  }

  return pages;
};

module.exports = {
  pdfToJpgArchive,
  extractTextLines,
  MAX_PAGES,
};
