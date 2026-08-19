const { PDFDocument, rgb } = require("pdf-lib");
const sharp = require("sharp");

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

const generatePdf = async (files, options = {}) => {
  const pdfDoc = await PDFDocument.create();
  const {
    autoCrop = false,
    enhance = "color",
    pageNumbers = false,
    rotation = 0,
    targetKb = 0,
  } = options;

  const qualityByTarget = { 100: 35, 200: 45, 500: 60, 1024: 75 };
  const quality = qualityByTarget[targetKb] || 82;

  for (const [index, file] of files.entries()) {
    console.log("Processing:", file.originalname);

    let processor = sharp(file.buffer).rotate(rotation);

    if (autoCrop) {
      processor = processor.trim({ background: "#ffffff", threshold: 12 });
    }

    if (enhance === "grayscale") {
      processor = processor.grayscale().normalise();
    }

    if (enhance === "bw") {
      processor = processor.grayscale().normalise().threshold(180);
    }

    // JPEG keeps scanned PDFs small while preserving useful document detail.
    const imageBuffer = await processor.jpeg({ quality, mozjpeg: true }).toBuffer();

    // Get image metadata
    const metadata = await sharp(imageBuffer).metadata();

    const originalWidth = metadata.width;
    const originalHeight = metadata.height;

    // Embed the compressed image into PDF
    const image = await pdfDoc.embedJpg(imageBuffer);

    // Calculate scale while maintaining aspect ratio
    const scale = Math.min(
      A4_WIDTH / originalWidth,
      A4_HEIGHT / originalHeight,
    );

    const width = originalWidth * scale;
    const height = originalHeight * scale;

    // Center image on page
    const x = (A4_WIDTH - width) / 2;
    const y = (A4_HEIGHT - height) / 2;

    // Create A4 page
    const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

    // White page background
    page.drawRectangle({
      x: 0,
      y: 0,
      width: A4_WIDTH,
      height: A4_HEIGHT,
      color: rgb(1, 1, 1),
    });

    // Draw image
    page.drawImage(image, {
      x,
      y,
      width,
      height,
    });

    if (pageNumbers) {
      page.drawText(`${index + 1}`, {
        x: A4_WIDTH / 2 - 3,
        y: 18,
        size: 9,
        color: rgb(0.35, 0.4, 0.48),
      });
    }
  }

  return await pdfDoc.save();
};

module.exports = {
  generatePdf,
};
