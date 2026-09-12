const fs = require("fs");
const path = require("path");
const { convertPdfToJpgOnDisk } = require("./pdf-render.service");

const [, , pdfPath, outDir] = process.argv;

(async () => {
  if (!pdfPath || !outDir) {
    throw new Error("Missing PDF path or output directory.");
  }
  const buffer = fs.readFileSync(pdfPath);
  const result = await convertPdfToJpgOnDisk(buffer);
  try {
    const dest = path.join(outDir, result.filename);
    fs.copyFileSync(result.path, dest);
  } finally {
    result.cleanup();
  }
})().catch((error) => {
  process.stderr.write(String(error && error.message ? error.message : error));
  process.exit(1);
});
