const os = require("os");
const path = require("path");
const { PDFDocument } = require("pdf-lib");
const { createWorker } = require("tesseract.js");
const sharp = require("sharp");
const { rasterizePdfPagesForOcr } = require("./pdf-render.service");
const { pagesToDocx } = require("./docx.service");

const OCR_MAX_PAGES = 15;
const OCR_MAX_BYTES = 25 * 1024 * 1024;
const CACHE_PATH = path.join(os.tmpdir(), "quickpdfhd-tessdata");

const OCR_LANGUAGES = {
  eng: "eng",
  hin: "hin",
  "eng+hin": "eng+hin",
};

const resolveOcrLanguage = (value) => {
  const key = String(value || "eng");
  if (!Object.prototype.hasOwnProperty.call(OCR_LANGUAGES, key)) {
    throw new Error("Unsupported OCR language. Choose English, Hindi, or English + Hindi.");
  }
  return OCR_LANGUAGES[key];
};

const assertOcrLimits = async (buffer) => {
  try {
    if (!buffer?.length) {
      throw new Error("The PDF file is empty.");
    }
    if (buffer.length > OCR_MAX_BYTES) {
      throw new Error("OCR accepts PDF files up to 25 MB.");
    }

    const document = await PDFDocument.load(buffer, { ignoreEncryption: false, updateMetadata: false });
    const pageCount = document.getPageCount();
    if (pageCount < 1) {
      throw new Error("The PDF does not contain any pages.");
    }
    if (pageCount > OCR_MAX_PAGES) {
      throw new Error(`OCR accepts PDFs with up to ${OCR_MAX_PAGES} pages.`);
    }
    return pageCount;
  } catch (error) {
    const message = String(error.message || "");
    if (/Encrypted PDFs cannot be processed|does not contain any pages|OCR accepts PDFs|OCR accepts PDF files|PDF file is empty/.test(message)) {
      throw error;
    }
    if (/encrypt/i.test(message)) {
      throw new Error("Encrypted PDFs cannot be processed. Remove the password and try again.");
    }
    throw new Error("The PDF file could not be read. It may be damaged or incomplete.");
  }
};

const paragraphLines = (data) => {
  if (data.paragraphs?.length) {
    return data.paragraphs
      .map((paragraph) => String(paragraph.text || "").replace(/\s+/g, " ").trim())
      .filter(Boolean);
  }
  return String(data.text || "")
    .split(/\n+/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean);
};

const preprocessOcrImage = async (png) => {
  try {
    const image = sharp(png, { failOn: "none" }).rotate();
    const meta = await image.metadata();
    const width = meta.width || 0;
    const height = meta.height || 0;
    if (!width || !height) {
      throw new Error("The scanned page image could not be read.");
    }

    const longest = Math.max(width, height);
    let pipeline = sharp(png, { failOn: "none" }).rotate().grayscale();
    if (longest > 2200) {
      pipeline = pipeline.resize({
        width: width >= height ? 2200 : undefined,
        height: height > width ? 2200 : undefined,
        fit: "inside",
        withoutEnlargement: true,
      });
    } else if (longest < 900) {
      const factor = 1400 / longest;
      pipeline = pipeline.resize({
        width: Math.round(width * factor),
        height: Math.round(height * factor),
        kernel: "lanczos3",
      });
    }

    return await pipeline.normalise().withMetadata({ density: 300 }).png().toBuffer();
  } catch {
    throw new Error("A page image in this PDF could not be prepared for OCR.");
  }
};

const pdfToWordOcr = async (buffer, language = "eng") => {
  const lang = resolveOcrLanguage(language);
  await assertOcrLimits(buffer);
  let pages;
  try {
    pages = await rasterizePdfPagesForOcr(buffer, { maxPages: OCR_MAX_PAGES });
  } catch (error) {
    const message = String(error.message || "");
    if (error instanceof TypeError || error instanceof ReferenceError || /Cannot read properties|is not a function/i.test(message)) {
      throw new Error("The PDF file could not be read. It may be damaged or incomplete.");
    }
    throw error;
  }

  let worker;
  try {
    worker = await createWorker(lang, 1, {
      cachePath: CACHE_PATH,
      logger: () => {},
      errorHandler: () => {},
    });
  } catch {
    throw new Error("The OCR language data could not be loaded. Check the server connection and try again.");
  }

  try {
    const recognized = [];
    for (const page of pages) {
      const prepared = await preprocessOcrImage(page.png);

      const tokensOf = (data) => paragraphLines(data).join(" ").match(/[A-Za-z]{4,}|[\u0900-\u097F]{2,}/g) || [];
      const score = (data) => tokensOf(data).length * 20 + Number(data.confidence || 0);

      let { data } = await worker.recognize(prepared);
      if (tokensOf(data).length < 2) {
        let best = data;
        let bestScore = score(data);
        for (const angle of [90, 180, 270]) {
          const rotated = await sharp(prepared).rotate(angle).withMetadata({ density: 300 }).png().toBuffer();
          const next = await worker.recognize(rotated);
          const nextScore = score(next.data);
          if (nextScore > bestScore) {
            best = next.data;
            bestScore = nextScore;
          }
        }
        data = best;
      }
      recognized.push({
        pageNumber: page.pageNumber,
        lines: paragraphLines(data),
      });
    }

    const hasText = recognized.some((page) => page.lines.length);
    if (!hasText) {
      throw new Error("OCR could not recognize readable text. Try a clearer scan, or a higher-contrast page.");
    }

    return pagesToDocx(recognized, "[No text recognized on this page]");
  } finally {
    if (worker) {
      await worker.terminate();
    }
  }
};

module.exports = {
  pdfToWordOcr,
  OCR_MAX_PAGES,
  OCR_MAX_BYTES,
  OCR_LANGUAGES,
  resolveOcrLanguage,
  assertOcrLimits,
};
