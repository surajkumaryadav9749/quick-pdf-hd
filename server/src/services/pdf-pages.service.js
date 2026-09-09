const { PDFDocument } = require("pdf-lib");

const MAX_SOURCE_PAGES = 200;

const loadPdf = async (buffer) => {
  try {
    return await PDFDocument.load(buffer, { ignoreEncryption: false, updateMetadata: false });
  } catch (error) {
    const message = String(error.message || "");
    if (/encrypt/i.test(message)) {
      throw new Error("Encrypted PDFs cannot be processed. Remove the password and try again.");
    }
    throw new Error("The PDF file could not be read. It may be damaged or incomplete.");
  }
};

const assertPageBudget = (count) => {
  if (count < 1) throw new Error("The PDF does not contain any pages.");
  if (count > MAX_SOURCE_PAGES) {
    throw new Error(`This tool accepts PDFs with up to ${MAX_SOURCE_PAGES} pages.`);
  }
};

const parsePageRange = (rangeText, pageCount) => {
  const raw = String(rangeText || "").trim();
  if (!raw) {
    return Array.from({ length: pageCount }, (_, index) => index);
  }

  const pages = new Set();
  raw.split(",").forEach((part) => {
    const token = part.trim();
    if (!token) return;
    const bounds = token.split("-").map((value) => value.trim());
    if (bounds.length === 1) {
      const page = Number(bounds[0]);
      if (!Number.isInteger(page) || page < 1 || page > pageCount) {
        throw new Error(`Page ${bounds[0]} is outside the document (1-${pageCount}).`);
      }
      pages.add(page - 1);
      return;
    }
    if (bounds.length !== 2) {
      throw new Error("Use page numbers or ranges such as 1-3, 5, 8-10.");
    }
    const start = Number(bounds[0]);
    const end = Number(bounds[1]);
    if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < 1 || start > end) {
      throw new Error("Use page numbers or ranges such as 1-3, 5, 8-10.");
    }
    if (end > pageCount) {
      throw new Error(`Page ${end} is outside the document (1-${pageCount}).`);
    }
    for (let page = start; page <= end; page += 1) pages.add(page - 1);
  });

  if (!pages.size) throw new Error("Select at least one page to extract.");
  return [...pages].sort((a, b) => a - b);
};

const copyPagesInto = async (target, source, indices) => {
  const copied = await target.copyPages(source, indices);
  copied.forEach((page) => target.addPage(page));
};

const mergePdfs = async (files) => {
  if (!files?.length) throw new Error("Upload at least two PDF files to merge.");
  const merged = await PDFDocument.create();
  let totalPages = 0;

  for (const file of files) {
    const source = await loadPdf(file.buffer);
    const count = source.getPageCount();
    totalPages += count;
    assertPageBudget(totalPages);
    await copyPagesInto(merged, source, source.getPageIndices());
  }

  if (merged.getPageCount() < 1) throw new Error("The selected PDFs did not contain any pages.");
  return Buffer.from(await merged.save());
};

const extractPages = async (buffer, rangeText) => {
  const source = await loadPdf(buffer);
  const pageCount = source.getPageCount();
  assertPageBudget(pageCount);
  const indices = parsePageRange(rangeText, pageCount);
  const output = await PDFDocument.create();
  await copyPagesInto(output, source, indices);
  return Buffer.from(await output.save());
};

const splitIntoSinglePages = async (buffer, rangeText) => {
  const source = await loadPdf(buffer);
  const pageCount = source.getPageCount();
  assertPageBudget(pageCount);
  const indices = parsePageRange(rangeText, pageCount);
  const outputs = [];

  for (const [order, pageIndex] of indices.entries()) {
    const output = await PDFDocument.create();
    await copyPagesInto(output, source, [pageIndex]);
    outputs.push({
      name: `page-${String(pageIndex + 1).padStart(3, "0")}.pdf`,
      buffer: Buffer.from(await output.save()),
      order,
    });
  }

  return outputs;
};

const splitIntoChunks = async (buffer, chunkSize) => {
  const size = Math.max(1, Math.min(Number(chunkSize) || 1, MAX_SOURCE_PAGES));
  const source = await loadPdf(buffer);
  const pageCount = source.getPageCount();
  assertPageBudget(pageCount);
  const outputs = [];

  for (let start = 0; start < pageCount; start += size) {
    const indices = [];
    for (let page = start; page < Math.min(start + size, pageCount); page += 1) indices.push(page);
    const output = await PDFDocument.create();
    await copyPagesInto(output, source, indices);
    const from = start + 1;
    const to = start + indices.length;
    outputs.push({
      name: `pages-${from}-${to}.pdf`,
      buffer: Buffer.from(await output.save()),
    });
  }

  return outputs;
};

const getPageCount = async (buffer) => {
  const source = await loadPdf(buffer);
  const pageCount = source.getPageCount();
  assertPageBudget(pageCount);
  return pageCount;
};

module.exports = {
  mergePdfs,
  extractPages,
  splitIntoSinglePages,
  splitIntoChunks,
  getPageCount,
  parsePageRange,
  MAX_SOURCE_PAGES,
};
