const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const mammoth = require("mammoth");
const WordExtractor = require("word-extractor");
const { parse } = require("node-html-parser");
const { wrapText, toPdfText } = require("../utils/text");
const { isZipBuffer, isOleBuffer, extensionOf } = require("../utils/file-signatures");

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 56;

const headingSizes = { H1: 20, H2: 16, H3: 14, H4: 13, H5: 12, H6: 12 };

const addPage = (pdf, fonts) => {
  const page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  return { page, y: PAGE_HEIGHT - MARGIN, fonts };
};

const ensureSpace = (session, pdf, needed) => {
  if (session.y - needed < MARGIN) {
    const next = addPage(pdf, session.fonts);
    session.page = next.page;
    session.y = next.y;
  }
};

const drawLines = (session, pdf, lines, { size = 11, bold = false, gap = 4 } = {}) => {
  const font = bold ? session.fonts.bold : session.fonts.regular;
  const width = PAGE_WIDTH - MARGIN * 2;
  const wrapped = lines.flatMap((line) => wrapText(line, font, size, width));
  wrapped.forEach((line) => {
    ensureSpace(session, pdf, size + gap);
    if (line) {
      session.page.drawText(line, {
        x: MARGIN,
        y: session.y - size,
        size,
        font,
        color: rgb(0.08, 0.1, 0.14),
      });
    }
    session.y -= size + gap;
  });
};

const drawImage = async (session, pdf, dataUrl) => {
  const match = String(dataUrl || "").match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  if (!match) return;
  const buffer = Buffer.from(match[2], "base64");
  let image;
  try {
    if (match[1].includes("png")) image = await pdf.embedPng(buffer);
    else image = await pdf.embedJpg(buffer);
  } catch {
    return;
  }
  const maxWidth = PAGE_WIDTH - MARGIN * 2;
  const maxHeight = 320;
  const scale = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
  const width = image.width * scale;
  const height = image.height * scale;
  ensureSpace(session, pdf, height + 12);
  session.y -= height;
  session.page.drawImage(image, { x: MARGIN, y: session.y, width, height });
  session.y -= 12;
};

const walkNode = async (node, session, pdf, listPrefix = "") => {
  if (!node) return;
  if (node.nodeType === 3) {
    const text = toPdfText(node.rawText || "").trim();
    if (text) drawLines(session, pdf, [text]);
    return;
  }

  const tag = String(node.tagName || "").toUpperCase();
  if (tag === "BR") {
    session.y -= 10;
    return;
  }
  if (tag === "IMG") {
    await drawImage(session, pdf, node.getAttribute("src"));
    return;
  }
  if (headingSizes[tag]) {
    session.y -= 8;
    drawLines(session, pdf, [node.text], { size: headingSizes[tag], bold: true, gap: 6 });
    session.y -= 6;
    return;
  }
  if (tag === "LI") {
    drawLines(session, pdf, [`${listPrefix || "-" } ${node.text}`], { size: 11, gap: 3 });
    return;
  }
  if (tag === "UL" || tag === "OL") {
    const items = node.childNodes.filter((child) => String(child.tagName || "").toUpperCase() === "LI");
    items.forEach((item, index) => {
      const prefix = tag === "OL" ? `${index + 1}.` : "-";
      drawLines(session, pdf, [`${prefix} ${item.text}`], { size: 11, gap: 3 });
    });
    session.y -= 6;
    return;
  }
  if (tag === "TABLE") {
    const rows = node.querySelectorAll("tr");
    rows.forEach((row) => {
      const cells = [...row.querySelectorAll("th,td")].map((cell) => cell.text.trim()).filter(Boolean);
      if (cells.length) drawLines(session, pdf, [cells.join("  |  ")], { size: 10, gap: 3 });
    });
    session.y -= 8;
    return;
  }
  if (tag === "P" || tag === "DIV") {
    const text = node.text.replace(/\s+/g, " ").trim();
    if (text) drawLines(session, pdf, [text], { size: 11, gap: 5 });
    session.y -= 4;
    return;
  }

  for (const child of node.childNodes || []) {
    await walkNode(child, session, pdf, listPrefix);
  }
};

const htmlToPdf = async (html) => {
  const pdf = await PDFDocument.create();
  const fonts = {
    regular: await pdf.embedFont(StandardFonts.Helvetica),
    bold: await pdf.embedFont(StandardFonts.HelveticaBold),
  };
  const session = addPage(pdf, fonts);
  const root = parse(`<div>${html || ""}</div>`);
  await walkNode(root, session, pdf);
  if (pdf.getPageCount() === 0) addPage(pdf, fonts);
  return Buffer.from(await pdf.save());
};

const textToPdf = async (text) => {
  const pdf = await PDFDocument.create();
  const fonts = {
    regular: await pdf.embedFont(StandardFonts.Helvetica),
    bold: await pdf.embedFont(StandardFonts.HelveticaBold),
  };
  const session = addPage(pdf, fonts);
  const content = toPdfText(text).trim();
  if (!content) throw new Error("The Word document did not contain readable text.");
  drawLines(session, pdf, content.split("\n"), { size: 11, gap: 4 });
  return Buffer.from(await pdf.save());
};

const convertDocx = async (buffer) => {
  const result = await mammoth.convertToHtml(
    { buffer },
    {
      convertImage: mammoth.images.imgElement((image) =>
        image.read("base64").then((encoded) => ({
          src: `data:${image.contentType};base64,${encoded}`,
        })),
      ),
    },
  );
  const html = String(result.value || "").trim();
  if (!html) throw new Error("The Word document did not contain readable content.");
  return htmlToPdf(html);
};

const convertDoc = async (buffer) => {
  const extractor = new WordExtractor();
  const extracted = await extractor.extract(buffer);
  const body = [extracted.getBody(), extracted.getFootnotes(), extracted.getEndnotes()]
    .filter(Boolean)
    .join("\n\n");
  return textToPdf(body);
};

const wordToPdf = async (file) => {
  const extension = extensionOf(file.originalname);
  if (!file.buffer?.length) throw new Error("The Word file is empty.");

  if (extension === ".docx" || (extension !== ".doc" && isZipBuffer(file.buffer))) {
    if (!isZipBuffer(file.buffer)) throw new Error("The DOCX file could not be read.");
    return convertDocx(file.buffer);
  }

  if (extension === ".doc" || isOleBuffer(file.buffer)) {
    if (!isOleBuffer(file.buffer)) throw new Error("The DOC file could not be read.");
    return convertDoc(file.buffer);
  }

  throw new Error("Upload a .doc or .docx Word document.");
};

module.exports = { wordToPdf };
