const { PDFDocument, rgb } = require("pdf-lib");
const sharp = require("sharp");

const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

const generatePdf = async (files) => {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    console.log("Processing:", file.originalname);

    // Convert image buffer to PNG
    const imageBuffer = await sharp(file.buffer).png().toBuffer();

    // Get image metadata
    const metadata = await sharp(imageBuffer).metadata();

    const originalWidth = metadata.width;
    const originalHeight = metadata.height;

    // Embed image into PDF
    const image = await pdfDoc.embedPng(imageBuffer);

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
  }

  return await pdfDoc.save();
};

module.exports = {
  generatePdf,
};
