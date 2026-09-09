const { Document, Packer, Paragraph, TextRun, HeadingLevel } = require("docx");

const pagesToDocx = async (pages, emptyPageNote = "[No selectable text on this page]") => {
  const children = [];
  pages.forEach((page, index) => {
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun({ text: `Page ${page.pageNumber}`, bold: true })],
      }),
    );
    if (!page.lines?.length) {
      children.push(new Paragraph({ children: [new TextRun({ text: emptyPageNote, italics: true })] }));
    } else {
      page.lines.forEach((line) => {
        children.push(new Paragraph({ children: [new TextRun(String(line))] }));
      });
    }
    if (index < pages.length - 1) children.push(new Paragraph({ children: [] }));
  });

  const document = new Document({
    sections: [{ properties: {}, children }],
  });
  return Buffer.from(await Packer.toBuffer(document));
};

module.exports = { pagesToDocx };
