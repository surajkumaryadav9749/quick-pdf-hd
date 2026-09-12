const fs = require("fs");
const path = require("path");

process.env.QUICKPDFHD_JPG_CHILD = "1";

const { renderPdfToJpegs } = require("./pdf-render.service");

const [, , pdfPath, outDir] = process.argv;

(async () => {
  if (!pdfPath || !outDir) {
    throw new Error("Missing PDF path or output directory.");
  }
  const buffer = fs.readFileSync(pdfPath);
  const images = await renderPdfToJpegs(buffer);
  if (!images.length) {
    throw new Error("The PDF does not contain any pages.");
  }
  images.forEach((image) => {
    fs.writeFileSync(path.join(outDir, image.name), image.buffer);
  });
})().catch((error) => {
  process.stderr.write(String(error && error.message ? error.message : error));
  process.exit(1);
});
