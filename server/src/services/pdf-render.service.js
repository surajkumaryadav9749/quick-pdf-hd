const fs = require("fs");
const os = require("os");
const path = require("path");
const { pathToFileURL } = require("url");
const { spawn } = require("child_process");
const sharp = require("sharp");
const { createZip } = require("./zip.service");

const MAX_PAGES = 40;
const SCALE = 2;
const JPEG_QUALITY = 90;
const PDFJS_ROOT = path.dirname(require.resolve("pdfjs-dist/package.json"));
const canvasBinding = require(require.resolve("@napi-rs/canvas", { paths: [PDFJS_ROOT] }));
const { createCanvas } = canvasBinding;
const Path2D = canvasBinding.Path2D || canvasBinding.Path;
const { DOMMatrix, ImageData, Image } = canvasBinding;

const toDirectoryUrl = (directory) => {
  const href = pathToFileURL(directory).href;
  return href.endsWith("/") ? href : `${href}/`;
};

const CMAP_URL = toDirectoryUrl(path.join(PDFJS_ROOT, "cmaps"));
const STANDARD_FONT_URL = toDirectoryUrl(path.join(PDFJS_ROOT, "standard_fonts"));

const canvasSize = (value) => Math.max(1, Math.ceil(Number(value) || 0));

const installCanvasGlobals = () => {
  if (typeof globalThis.Path2D === "undefined") globalThis.Path2D = Path2D;
  if (typeof globalThis.DOMMatrix === "undefined") globalThis.DOMMatrix = DOMMatrix;
  if (typeof globalThis.ImageData === "undefined") globalThis.ImageData = ImageData;
  if (typeof globalThis.Image === "undefined") globalThis.Image = Image;
};

installCanvasGlobals();

class NodeCanvasFactory {
  create(width, height) {
    const canvas = createCanvas(canvasSize(width), canvasSize(height));
    return { canvas, context: canvas.getContext("2d") };
  }

  reset(canvasAndContext, width, height) {
    canvasAndContext.canvas.width = canvasSize(width);
    canvasAndContext.canvas.height = canvasSize(height);
  }

  destroy(canvasAndContext) {
    if (!canvasAndContext?.canvas) return;
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

const toPdfBytes = (buffer) => {
  if (buffer instanceof Uint8Array && !(buffer instanceof Buffer)) {
    return buffer.slice();
  }
  return Uint8Array.from(buffer);
};

const openPdf = async (buffer) => {
  const pdfjs = await loadPdfjs();
  try {
    return await pdfjs.getDocument({
      data: toPdfBytes(buffer),
      canvasFactory: new NodeCanvasFactory(),
      cMapUrl: CMAP_URL,
      cMapPacked: true,
      standardFontDataUrl: STANDARD_FONT_URL,
      disableFontFace: true,
      isEvalSupported: false,
      isOffscreenCanvasSupported: false,
      isImageDecoderSupported: false,
      useSystemFonts: false,
      verbosity: 0,
    }).promise;
  } catch (error) {
    const message = String(error && error.message ? error.message : error);
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

const renderPageToCanvas = async (page, scale) => {
  const viewport = page.getViewport({ scale });
  const canvasFactory = new NodeCanvasFactory();
  const width = canvasSize(viewport.width);
  const height = canvasSize(viewport.height);
  const { canvas, context } = canvasFactory.create(width, height);
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, width, height);
  await page.render({
    canvasContext: context,
    viewport,
    canvas,
    canvasFactory,
    background: "#ffffff",
  }).promise;
  return { canvas, context, canvasFactory };
};

const encodeJpeg = (canvas) => {
  if (typeof canvas.encodeSync === "function") {
    return canvas.encodeSync("jpeg", JPEG_QUALITY);
  }
  return canvas.toBuffer("image/jpeg", JPEG_QUALITY);
};

const renderPdfPage = async (buffer, pageNumber, scale = 2) => {
  const document = await openPdf(buffer);
  try {
    const page = await document.getPage(pageNumber);
    const { canvas, context, canvasFactory } = await renderPageToCanvas(page, scale);
    const png = canvas.toBuffer("image/png");
    canvasFactory.destroy({ canvas, context });
    if (typeof page.cleanup === "function") page.cleanup();
    return png;
  } finally {
    await closePdfDocument(document);
  }
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
      canvasFactory: new NodeCanvasFactory(),
      cMapUrl: CMAP_URL,
      cMapPacked: true,
      standardFontDataUrl: STANDARD_FONT_URL,
      disableFontFace: true,
      isEvalSupported: false,
      isOffscreenCanvasSupported: false,
      isImageDecoderSupported: false,
      useSystemFonts: false,
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
    await closePdfDocument(document);
    fs.rmSync(workDir, { recursive: true, force: true });
  }
};

const closePdfDocument = async (document) => {
  if (!document) return;
  try {
    if (typeof document.cleanup === "function") document.cleanup();
  } catch {
    // Document teardown should not hide a conversion result or error.
  }
};

const renderPdfPages = async (buffer, { maxPages = MAX_PAGES, scale = SCALE } = {}) => {
  const document = await openPdf(buffer);
  try {
    const pageCount = document.numPages;
    if (pageCount < 1) throw new Error("The PDF does not contain any pages.");
    if (pageCount > maxPages) {
      throw new Error(`This conversion accepts PDFs with up to ${maxPages} pages.`);
    }

    const images = [];
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const { canvas, context, canvasFactory } = await renderPageToCanvas(page, scale);
      images.push({
        pageNumber,
        png: canvas.toBuffer("image/png"),
      });
      canvasFactory.destroy({ canvas, context });
      if (typeof page.cleanup === "function") page.cleanup();
    }
    return images;
  } finally {
    await closePdfDocument(document);
  }
};

const renderPdfToJpegs = async (buffer) => {
  const document = await openPdf(buffer);
  try {
    const pageCount = document.numPages;
    if (pageCount < 1) throw new Error("The PDF does not contain any pages.");
    if (pageCount > MAX_PAGES) {
      throw new Error(`This conversion accepts PDFs with up to ${MAX_PAGES} pages.`);
    }

    const images = [];
    for (let pageNumber = 1; pageNumber <= pageCount; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      let rendered;
      try {
        rendered = await renderPageToCanvas(page, SCALE);
        images.push({
          name: `page-${String(pageNumber).padStart(3, "0")}.jpg`,
          buffer: encodeJpeg(rendered.canvas),
        });
      } catch {
        throw new Error(`Page ${pageNumber} could not be converted to JPG. The PDF may use unsupported content.`);
      } finally {
        if (rendered) rendered.canvasFactory.destroy(rendered);
        if (typeof page.cleanup === "function") page.cleanup();
      }
    }
    return images;
  } finally {
    await closePdfDocument(document);
  }
};

const assembleJpgResult = (images) => {
  if (images.length === 1) return { buffer: images[0].buffer, filename: images[0].name, contentType: "image/jpeg" };
  return {
    buffer: createZip(images),
    filename: "QuickPDFHD-pdf-pages.zip",
    contentType: "application/zip",
  };
};

const renderJpgInChild = (pdfPath, outDir) => new Promise((resolve, reject) => {
  const child = spawn(process.execPath, [path.join(__dirname, "jpg-render-child.js"), pdfPath, outDir], {
    windowsHide: true,
    stdio: ["ignore", "ignore", "pipe"],
    env: { ...process.env, QUICKPDFHD_JPG_CHILD: "1" },
  });
  let stderr = "";
  let settled = false;
  const finish = (error) => {
    if (settled) return;
    settled = true;
    clearTimeout(timer);
    if (error) reject(error);
    else resolve();
  };
  child.stderr.on("data", (chunk) => {
    stderr += chunk.toString();
  });
  const timer = setTimeout(() => {
    child.kill("SIGKILL");
    finish(new Error("PDF to JPG conversion timed out. Try a smaller file or fewer pages."));
  }, 120000);
  child.on("error", (error) => finish(error));
  child.on("exit", (code) => {
    if (code === 0) {
      finish();
      return;
    }
    finish(new Error(stderr.trim() || "The PDF pages could not be converted to JPG."));
  });
});

const pdfToJpgArchive = async (buffer) => {
  if (!buffer?.length) throw new Error("The PDF file is empty.");

  if (process.env.QUICKPDFHD_JPG_CHILD === "1") {
    return assembleJpgResult(await renderPdfToJpegs(buffer));
  }

  const workDir = fs.mkdtempSync(path.join(os.tmpdir(), "qpdf-jpg-"));
  const pdfPath = path.join(workDir, "source.pdf");
  fs.writeFileSync(pdfPath, buffer);
  try {
    await renderJpgInChild(pdfPath, workDir);
    const files = fs.readdirSync(workDir).filter((name) => /^page-\d+\.jpg$/i.test(name)).sort();
    if (!files.length) throw new Error("The PDF pages could not be converted to JPG.");
    const images = files.map((name) => ({ name, buffer: fs.readFileSync(path.join(workDir, name)) }));
    return assembleJpgResult(images);
  } finally {
    fs.rmSync(workDir, { recursive: true, force: true });
  }
};

const extractTextLines = async (buffer) => {
  const document = await openPdf(buffer);
  try {
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
  } finally {
    await closePdfDocument(document);
  }
};

module.exports = {
  pdfToJpgArchive,
  extractTextLines,
  renderPdfPages,
  renderPdfToJpegs,
  openPdf,
  rasterizePdfPagesForOcr,
  renderPdfPage,
  MAX_PAGES,
};
