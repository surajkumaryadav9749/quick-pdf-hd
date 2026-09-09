const fs = require("fs");
const { renderPdfPage } = require("./pdf-render.service");

const [, , pdfPath, pageNumber, outPath] = process.argv;

(async () => {
  const buffer = fs.readFileSync(pdfPath);
  const png = await renderPdfPage(buffer, Number(pageNumber), 2);
  fs.writeFileSync(outPath, png);
})().catch((error) => {
  process.stderr.write(String(error && error.message ? error.message : error));
  process.exit(1);
});
