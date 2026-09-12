const sharp = require("sharp");
const app = require("../src/app");
const { processDocumentImage } = require("../src/services/pdf.service");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

(async () => {
  const source = await sharp({
    create: {
      width: 80,
      height: 120,
      channels: 3,
      background: { r: 12, g: 90, b: 140 },
    },
  }).jpeg().toBuffer();

  const scanned = await processDocumentImage(source, {
    autoCrop: false,
    enhance: "grayscale",
    rotation: 0,
    targetKb: 500,
  });
  const meta = await sharp(scanned).metadata();
  assert(meta.format === "jpeg", `scanned image should be jpeg, got ${meta.format}`);
  assert(scanned[0] === 0xff && scanned[1] === 0xd8, "scanned JPEG magic missing");

  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const port = server.address().port;
  try {
    const form = new FormData();
    form.append("images", new Blob([source], { type: "image/jpeg" }), "page.jpg");
    form.append("autoCrop", "true");
    form.append("enhance", "color");
    form.append("pageNumbers", "false");
    form.append("rotation", "0");
    form.append("targetKb", "500");
    const response = await fetch(`http://127.0.0.1:${port}/api/scan/images`, { method: "POST", body: form });
    assert(response.status === 200, `scan image expected 200, got ${response.status}`);
    assert(String(response.headers.get("content-type")).includes("image/jpeg"), "scan image should return jpeg");
    assert(String(response.headers.get("content-disposition") || "").includes("scanned-result.jpg"), "scan image filename");
    const bytes = Buffer.from(await response.arrayBuffer());
    assert(bytes[0] === 0xff && bytes[1] === 0xd8, "HTTP scanned JPEG magic missing");
    assert(bytes.length !== source.length, "scanned output should not be an unchanged original copy");

    const pngSource = await sharp({
      create: { width: 60, height: 80, channels: 4, background: { r: 200, g: 40, b: 40, alpha: 1 } },
    }).png().toBuffer();
    const pngForm = new FormData();
    pngForm.append("images", new Blob([pngSource], { type: "image/png" }), "page.png");
    pngForm.append("autoCrop", "false");
    pngForm.append("enhance", "color");
    pngForm.append("pageNumbers", "false");
    pngForm.append("rotation", "0");
    pngForm.append("targetKb", "500");
    const pngScan = await fetch(`http://127.0.0.1:${port}/api/scan/images`, { method: "POST", body: pngForm });
    assert(pngScan.status === 200, `png scan expected 200, got ${pngScan.status}`);
    assert(String(pngScan.headers.get("content-type")).includes("image/jpeg"), "png scan still returns processed jpeg");
    const pngBytes = Buffer.from(await pngScan.arrayBuffer());
    assert(pngBytes[0] === 0xff && pngBytes[1] === 0xd8, "png scan should download jpeg processed result");

    const pdfForm = new FormData();
    pdfForm.append("images", new Blob([source], { type: "image/jpeg" }), "page.jpg");
    pdfForm.append("autoCrop", "false");
    pdfForm.append("enhance", "color");
    pdfForm.append("pageNumbers", "false");
    pdfForm.append("rotation", "0");
    pdfForm.append("targetKb", "500");
    const pdf = await fetch(`http://127.0.0.1:${port}/api/scan`, { method: "POST", body: pdfForm });
    assert(pdf.status === 200, `scan pdf expected 200, got ${pdf.status}`);
    assert(String(pdf.headers.get("content-type")).includes("application/pdf"), "PDF scan path should still return PDF");
    await pdf.arrayBuffer();
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }

  console.log("scan-image checks passed");
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
