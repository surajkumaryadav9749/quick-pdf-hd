const { PDFDocument, StandardFonts } = require("pdf-lib");
const { pdfToJpgArchive, MAX_PAGES } = require("../src/services/pdf-render.service");
const app = require("../src/app");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const TINY_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwADhQGAWjR9awAAAABJRU5ErkJggg==",
  "base64",
);

const makePdf = async (texts) => {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  texts.forEach((text) => {
    const page = pdf.addPage([400, 500]);
    page.drawText(text, { x: 40, y: 420, size: 18, font });
  });
  return Buffer.from(await pdf.save());
};

const makeImagePdf = async () => {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([400, 500]);
  const image = await pdf.embedPng(TINY_PNG);
  page.drawImage(image, { x: 40, y: 200, width: 120, height: 120 });
  return Buffer.from(await pdf.save());
};

const postPdf = async (port, buffer, filename = "file.pdf", extraHeaders = {}) => {
  const form = new FormData();
  form.append("files", new Blob([buffer], { type: extraHeaders.type || "application/pdf" }), filename);
  return fetch(`http://127.0.0.1:${port}/api/pdf-tools/pdf-to-jpg`, {
    method: "POST",
    body: form,
  });
};

(async () => {
  const mem = () => Math.round(process.memoryUsage().rss / 1048576);
  const startRss = mem();

  const onePage = await makePdf(["Single page JPEG test"]);
  const one = await pdfToJpgArchive(onePage);
  assert(one.contentType === "image/jpeg", "single page should return image/jpeg");
  assert(one.filename === "page-001.jpg", "single page filename should be page-001.jpg");
  assert(one.buffer[0] === 0xff && one.buffer[1] === 0xd8, "single page JPEG magic missing");
  console.log("1-page service rssMb", mem(), "delta", mem() - startRss);

  const threePage = await makePdf(["Page A", "Page B", "Page C"]);
  const zip = await pdfToJpgArchive(threePage);
  assert(zip.contentType === "application/zip", "multi-page should return a ZIP");
  assert(zip.filename === "QuickPDFHD-pdf-pages.zip", "multi-page ZIP name mismatch");
  assert(zip.buffer[0] === 0x50 && zip.buffer[1] === 0x4b, "ZIP magic missing");

  const fivePage = await makePdf(["P1", "P2", "P3", "P4", "P5"]);
  const five = await pdfToJpgArchive(fivePage);
  assert(five.contentType === "application/zip", "5-page should return a ZIP");
  console.log("5-page service rssMb", mem());

  const tenPage = await makePdf(Array.from({ length: 10 }, (_, index) => `Page ${index + 1}`));
  const ten = await pdfToJpgArchive(tenPage);
  assert(ten.contentType === "application/zip", "10-page should return a ZIP");
  console.log("10-page service rssMb", mem());

  const imagePdf = await makeImagePdf();
  const imageJpg = await pdfToJpgArchive(imagePdf);
  assert(imageJpg.contentType === "image/jpeg", "image PDF should return JPEG");
  assert(imageJpg.buffer[0] === 0xff && imageJpg.buffer[1] === 0xd8, "image PDF JPEG magic missing");

  let invalidFailed = false;
  try {
    await pdfToJpgArchive(Buffer.from("not a pdf"));
  } catch (error) {
    invalidFailed = /could not be read|damaged|incomplete/i.test(error.message);
  }
  assert(invalidFailed, "invalid files should be rejected");

  const tooMany = await makePdf(Array.from({ length: MAX_PAGES + 1 }, (_, index) => `Page ${index + 1}`));
  let pageLimitFailed = false;
  try {
    await pdfToJpgArchive(tooMany);
  } catch (error) {
    pageLimitFailed = /up to 40 pages/i.test(error.message);
  }
  assert(pageLimitFailed, "PDFs over 40 pages should be rejected");

  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const port = server.address().port;

  try {
    const ok = await postPdf(port, onePage, "one.pdf");
    assert(ok.status === 200, `HTTP single-page expected 200, got ${ok.status}`);
    assert(String(ok.headers.get("content-type")).includes("image/jpeg"), "HTTP single-page content-type");
    assert(String(ok.headers.get("content-disposition")).includes("page-001.jpg"), "HTTP single-page disposition");
    const jpegBytes = Buffer.from(await ok.arrayBuffer());
    assert(jpegBytes[0] === 0xff && jpegBytes[1] === 0xd8, "HTTP JPEG magic missing");
    console.log("HTTP 1-page", ok.status, jpegBytes.length, "rssMb", mem());

    const fiveHttp = await postPdf(port, fivePage, "five.pdf");
    assert(fiveHttp.status === 200, `HTTP 5-page expected 200, got ${fiveHttp.status}`);
    assert(String(fiveHttp.headers.get("content-type")).includes("application/zip"), "HTTP 5-page content-type");
    await fiveHttp.arrayBuffer();
    console.log("HTTP 5-page", fiveHttp.status, "rssMb", mem());

    const tenHttp = await postPdf(port, tenPage, "ten.pdf");
    assert(tenHttp.status === 200, `HTTP 10-page expected 200, got ${tenHttp.status}`);
    assert(String(tenHttp.headers.get("content-type")).includes("application/zip"), "HTTP 10-page content-type");
    await tenHttp.arrayBuffer();
    console.log("HTTP 10-page", tenHttp.status, "rssMb", mem());

    const multi = await postPdf(port, threePage, "three.pdf");
    assert(multi.status === 200, `HTTP multi-page expected 200, got ${multi.status}`);
    assert(String(multi.headers.get("content-type")).includes("application/zip"), "HTTP multi-page content-type");

    const bad = await postPdf(port, Buffer.from("hello"), "notes.txt", { type: "text/plain" });
    assert(bad.status === 400, `invalid upload expected 400, got ${bad.status}`);
    const badBody = await bad.json();
    assert(Boolean(badBody.message), "invalid upload should return a message");

    const oversize = Buffer.alloc(25 * 1024 * 1024 + 10, 37);
    oversize.write("%PDF", 0);
    const huge = await postPdf(port, oversize, "huge.pdf");
    assert(huge.status === 413, `oversized upload expected 413, got ${huge.status}`);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }

  console.log("pdf-to-jpg checks passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
