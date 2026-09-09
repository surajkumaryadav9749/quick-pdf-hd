const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
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
      isOffscreenCanvasSupported: false,
      isImageDecoderSupported: false,
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

const rawImageToPng = async (image) => {
  const width = image.width;
  const height = image.height;
  const kind = image.kind;
  const source = image.data?.buffer ? Buffer.from(image.data.buffer, image.data.byteOffset || 0, image.data.byteLength || image.data.length) : Buffer.from(image.data || []);
  if (!width || !height || !source.length) return null;
  const channels = kind === 1 ? 1 : kind === 2 ? 3 : 4;
  const expected = width * height * channels;
  try {
    if (source.length === expected || source.length === width * height * 4) {
      const used = source.length === expected ? channels : 4;
      return await sharp(source, { raw: { width, height, channels: used } }).png().toBuffer();
    }
    return await sharp(source).png().toBuffer();
  } catch {
    return null;
  }
};

const getEmbeddedPageImage = async (page, pdfjs) => {
  const operatorList = await page.getOperatorList();
  const names = [];
  for (let index = 0; index < operatorList.fnArray.length; index += 1) {
    const fn = operatorList.fnArray[index];
    if (fn === pdfjs.OPS.paintImageXObject || fn === pdfjs.OPS.paintInlineImageXObject || fn === pdfjs.OPS.paintJpegXObject) {
      names.push(operatorList.argsArray[index][0]);
    }
  }
  if (!names.length) return null;

  let largest = null;
  for (const name of names) {
    const image = await new Promise((resolve, reject) => {
      try {
        page.objs.get(name, resolve);
      } catch (error) {
        reject(error);
      }
    });
    if (image?.width && image?.data && (!largest || image.width * image.height > largest.width * largest.height)) {
      largest = image;
    }
  }
  if (!largest) return null;
  return rawImageToPng(largest);
};

const renderPdfPage = async (buffer, pageNumber, scale = 2) => {
  const document = await openPdf(buffer);
  const page = await document.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvasFactory = new NodeCanvasFactory();
  const { canvas, context } = canvasFactory.create(viewport.width, viewport.height);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, viewport.width, viewport.height);
  await page.render({ canvasContext: context, viewport, canvas, canvasFactory }).promise;
  const png = canvas.toBuffer("image/png");
  canvasFactory.destroy({ canvas, context });
  return png;
};

const renderPageInChild = (pdfPath, pageNumber, workDir) => new Promise((resolve, reject) => {
  const outPath = path.join(workDir, `page-${pageNumber}.png`);
  const child = spawn(process.execPath, [path.join(__dirname, "ocr-render-child.js"), pdfPath, String(pageNumber), outPath], {
    windowsHide: true,
    stdio: ["ignore", "ignore", "pipe"],
  });
  let stderr = "";
  let settled = false;
  const finish = (error, png) => {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    if (error) reject(error);
    else resolve(png);
  };
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });
  const timer = setTimeout(() => {
    child.kill("SIGKILL");
    finish(new Error("Page rendering timed out."));
  }, 20000);
  child.on("error", (error) => finish(error));
  child.on("exit", (code) => {
    if (code === 0 && fs.existsSync(outPath)) {
      finish(null, fs.readFileSync(outPath));
      return;
    }
    finish(new Error(stderr.trim() || "This page could not be rendered for OCR."));
  });
});

const rasterizePdfPagesForOcr = async (buffer, { maxPages } = {}) => {
  const pdfjs = await loadPdfjs();
  const data = new Uint8Array(buffer);
  let document;
  try {
    document = await pdfjs.getDocument({
      data,
      cMapUrl: `${path.join(PDFJS_ROOT, "cmaps")}${path.sep}`,
      cMapPacked: true,
      standardFontDataUrl: `${path.join(PDFJS_ROOT, "standard_fonts")}${path.sep}`,
      disableFontFace: true,
      isEvalSupported: false,
      isOffscreenCanvasSupported: false,
      isImageDecoderSupported: false,
      verbosity: 0,
    }).promise;
  } catch (error) {
    const message = String(error.message || "");
    if (/password/i.test(message)) {
      throw new Error("Encrypted PDFs cannot be processed. Remove the password and try again.");
    }
    throw new Error("The PDF file could not be read. It may be damaged or incomplete.");
  }
  const pageCount = document.numPages;
  if (pageCount < 1) throw new Error("The PDF does not contain any pages.");
  if (pageCount > maxPages) {
    throw new Error(`OCR accepts PDFs with up to ${maxPages} pages.`);
  }

  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "qpdf-ocr-"));
  const pdfPath = path.join(workDir, "source.pdf");
  fs.writeFileSync(pdfPath, buffer);

  try {
    const pages = [];
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      let png = null;
      try {
        png = await getEmbeddedPageImage(page, pdfjs);
      } catch {
        png = null;
      }
      if (!png) {
        try {
          png = await renderPageInChild(pdfPath, pageNumber, workDir);
        } catch {
          png = null;
        }
      }
      if (!png) {
        throw new Error("This scanned page could not be read for OCR. Try exporting the scan as a clearer PDF.");
      }
      pages.push({ pageNumber, png });
    }
    return pages;
  } finally {
    fs.rmSync(workDir, { recursive: true, force: true });
  }
};

const renderPdfPages = async (buffer, { maxPages = MAX_PAGES, scale = SCALE } = {}) => {
  const document = await openPdf(buffer);
  const pageCount = document.numPages;
  if (pageCount < 1) throw new Error("The PDF does not contain any pages.");
  if (pageCount > maxPages) {
    throw new Error(`This conversion accepts PDFs with up to ${maxPages} pages.`);
  }

  const canvasFactory = new NodeCanvasFactory();
  const images = [];

  for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const viewport = page.getViewport({ scale });
    const { canvas, context } = canvasFactory.create(viewport.width, viewport.height);
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, viewport.width, viewport.height);
    await page.render({ canvasContext: context, viewport, canvas, canvasFactory }).promise;
    images.push({
      pageNumber,
      png: canvas.toBuffer("image/png"),
    });
    canvasFactory.destroy({ canvas, context });
  }

  return images;
};

const renderPdfToJpegs = async (buffer) => {
  const pages = await renderPdfPages(buffer, { maxPages: MAX_PAGES, scale: SCALE });
  const images = [];
  for (const page of pages) {
    const jpeg = await sharp(page.png).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    images.push({
      name: `page-${String(page.pageNumber).padStart(3, "0")}.jpg`,
      buffer: jpeg,
    });
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
  renderPdfPages,
  openPdf,
  rasterizePdfPagesForOcr,
  renderPdfPage,
  MAX_PAGES,
};
