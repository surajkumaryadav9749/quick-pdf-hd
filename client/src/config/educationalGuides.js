export const educationalGuides = [
  {
    kind: "article",
    slug: "reduce-pdf-file-size-without-losing-readability",
    title: "How to reduce PDF file size without making documents unreadable",
    seoTitle: "Reduce PDF File Size Without Losing Readability | QuickPDFHD",
    description: "Practical ways to keep a PDF readable when it is too large to email or upload, using the tools QuickPDFHD actually provides.",
    tool: "/document-scanner",
    tools: ["/document-scanner", "/resize-image", "/jpg-to-pdf"],
    toolName: "Document Scanner",
    intro: "A PDF feels “too big” when email, a job portal, or a class upload rejects it. Size usually comes from photographs of pages, not from a few pages of selectable text. QuickPDFHD does not include a dedicated “compress PDF” button. You can still make a lighter file by changing how the pages were created.",
    sections: [
      {
        heading: "Find what is making the file heavy",
        paragraphs: [
          "Open the PDF and try to highlight a sentence. If you can select text, the file is often already compact unless it also contains large embedded pictures. If you cannot select text, each page is probably a photo. Photos store color and noise. That is why a five-page phone scan can outgrow a fifty-page report exported from Word.",
          "Count the pages. A Document Scanner PDF with a 1 MB size goal still grows with every extra page. Splitting out unused pages with Split PDF removes weight without touching the pages you keep.",
        ],
      },
      {
        heading: "If the PDF started as phone photos",
        paragraphs: [
          "Rebuild it from the photos instead of hoping a container will magically shrink pixels. Photograph each page upright, in even light, filling the frame. Then use Document Scanner: trim white edges, try grayscale or black-and-white for text-only paper, and pick a size goal of 100, 200, 500 KB, or 1 MB. The goal steers JPEG quality; the finished PDF can still miss the exact number.",
          "If you only need the pictures, download processed images from the scanner instead of a PDF. Some portals accept JPEG pages and reject large documents.",
        ],
      },
      {
        heading: "If you still have the original images",
        paragraphs: [
          "Resize Image can lower pixel width and height before you run JPG to PDF. Fewer pixels usually means a smaller PDF page. Do not enlarge a small photo to “look sharper”; that adds weight without adding real detail.",
          "Keep aspect-ratio lock on so text is not stretched. Unlocking the lock distorts the page and does not crop extra background.",
        ],
      },
      {
        heading: "If you only need pictures of pages",
        paragraphs: [
          "PDF pages can be converted to images using dedicated PDF software. That does not always shrink the original PDF, but it gives you pictures you can resize or send separately.",
          "This path discards selectable text. Use it when the destination wants pictures, not when someone must copy wording later.",
        ],
      },
      {
        heading: "What will not help",
        paragraphs: [
          "Putting PDFs in a ZIP archive packages files. It does not recompress PDF page content. Merging PDFs copies pages and does not reduce quality or size as a compression step.",
          "There is no setting here that promises a 90% reduction or “maximum compression.” If a portal still rejects the file after a careful rebuild, split the packet or ask whether they accept multiple uploads.",
        ],
      },
    ],
    steps: [
      "Decide whether the heavy pages are photos or selectable text.",
      "For photo pages, recapture or reuse the images, then scan with a size goal—or resize images before JPG to PDF.",
      "Remove unused pages with Split PDF. Check that text is still readable at the destination’s zoom.",
    ],
    tips: [
      "Black-and-white text pages are usually smaller than full-color photos of the same paper.",
      "Review names and numbers after a strong size goal; JPEG artifacts can soften small print.",
      "Keep the original photos until you confirm the new PDF is accepted.",
    ],
    relatedGuides: ["pdf-compression-quality-versus-file-size", "image-dpi-versus-pixel-dimensions", "how-to-scan-document-photos-to-pdf"],
  },
  {
    kind: "article",
    slug: "pdf-compression-quality-versus-file-size",
    title: "PDF compression: quality vs file size explained",
    seoTitle: "PDF Quality vs File Size Explained | QuickPDFHD",
    description: "Why photo PDFs get large, how JPEG quality and pixel size interact, and which QuickPDFHD settings actually change the tradeoff.",
    tool: "/document-scanner",
    tools: ["/document-scanner", "/resize-image", "/jpg-to-pdf"],
    toolName: "Document Scanner",
    intro: "“Compression” is often used as if it were one slider. In practice, a PDF’s size is a mix of how many pages you have, whether those pages are text or pictures, how many pixels each picture has, and how aggressively JPEG encoding throws detail away.",
    sections: [
      {
        heading: "Text PDFs and image PDFs behave differently",
        paragraphs: [
          "A Word-to-PDF file stores letters as text. Extra pages add a little size. A scan stores a picture of each page. Extra pages add another full photograph. That is why “compress this PDF” usually means “make the photographs cheaper,” not “delete the words.”",
          "QuickPDFHD’s Word, Excel, merge, and split tools copy or draw document content. They are not JPEG compressors. Size changes there come from how much content you include, not from a quality slider.",
        ],
      },
      {
        heading: "Pixels vs JPEG quality",
        paragraphs: [
          "Pixel dimensions are the grid. A 4000-pixel-wide phone photo holds more data than a 1200-pixel version of the same page. Resize Image changes that grid.",
          "JPEG quality (and Document Scanner size goals) change how roughly that grid is stored. Lower quality saves space and can add blocky edges around letters. PNG output on the resizer is lossless, so it will not use the quality control.",
        ],
      },
      {
        heading: "Size goals are targets, not exact sizes",
        paragraphs: [
          "Document Scanner offers 100 KB, 200 KB, 500 KB, and 1 MB goals. The server adjusts image quality toward that budget. A twelve-page color packet can still miss 200 KB. A single high-contrast form might land under a higher goal.",
          "If the PDF is unreadable at 100 KB, move up a step. Readability is the point of a document, not a smaller number on disk.",
        ],
      },
      {
        heading: "A simple way to choose",
        list: [
          "Need to copy text later: keep a selectable PDF (Word to PDF, or merge of those files).",
          "Need a photo of paper: start with a sharp capture, then grayscale or black-and-white if color is unused.",
          "Need a number under a portal limit: drop unused pages, then lower pixels or size goal until the page is still readable at 100% zoom.",
        ],
      },
    ],
    steps: [
      "Identify whether pages are text objects or photographs.",
      "Reduce page count, then pixels, then JPEG quality—in that order.",
      "Open the result at normal reading size before you send it.",
    ],
    tips: [
      "Color photos of white paper waste size on background tint.",
      "Open a page in a PDF viewer at 100% zoom if you are unsure how dense the photographs are.",
    ],
    relatedGuides: ["reduce-pdf-file-size-without-losing-readability", "image-dpi-versus-pixel-dimensions", "scanned-pdf-versus-searchable-pdf"],
  },
  {
    kind: "article",
    slug: "merge-pdf-files-in-the-correct-order",
    title: "How to merge multiple PDF files in the correct order",
    seoTitle: "Merge PDFs in the Correct Order | QuickPDFHD",
    description: "Why merge order follows the file list, how inner page order stays fixed, and how to assemble an application or report packet without mixing chapters.",
    tool: "/merge-pdf",
    tools: ["/merge-pdf", "/split-pdf", "/pdf-to-zip"],
    toolName: "Merge PDF",
    intro: "A merged PDF is only useful if a reader meets the cover first and the last appendix last. QuickPDFHD copies files in the list order you set. Pages inside each file keep the order they already had. Getting those two levels straight prevents most “the pages are all jumbled” surprises.",
    sections: [
      {
        heading: "Two kinds of order",
        paragraphs: [
          "File order is the sequence of PDFs in the merge list. You change it with the move controls before you merge.",
          "Page order inside a file is whatever that PDF already stored. Merge does not sort pages inside a source. If a scan of a passport is page 2 then page 1, the merged packet will still show page 2 first unless you split and rebuild that file.",
        ],
      },
      {
        heading: "A reliable packet workflow",
        paragraphs: [
          "Name files so the list is obvious: 01-cover, 02-resume, 03-certificates. Upload them, then still check the on-screen list. Filenames help; they are not a substitute for looking.",
          "If one source contains extra pages, extract the range you need with Split PDF first. Merging whole scans and hoping the extra pages “won’t matter” is how packets fail a checklist.",
        ],
      },
      {
        heading: "Mixed page sizes",
        paragraphs: [
          "Letter, A4, and photo pages can sit in the same merged file. The tool does not rescale every page to one paper size. A viewer may show different widths as you scroll. That is expected.",
          "If a portal insists on A4 only, rebuild photo pages with Document Scanner or image-to-PDF (both use A4) before you merge with other A4 exports.",
        ],
      },
      {
        heading: "When you should not merge",
        paragraphs: [
          "If the recipient’s software expects separate invoices, use PDF to ZIP. Merging those files makes one document they then have to split again.",
          "Password-protected PDFs need to be unlocked first. Bookmarks from the sources are not rebuilt as a new outline.",
        ],
      },
    ],
    steps: [
      "Split out only the pages each source should contribute.",
      "Add 2–20 PDFs (25 MB each, 200 pages combined) and move the list into reading order.",
      "Download and flip through the merged file once before you submit it.",
    ],
    tips: [
      "The download name follows the first file in the list, so put a sensible file first or rename after download.",
      "Merging does not flatten pages into photos.",
    ],
    relatedGuides: ["how-to-merge-pdf-files", "split-pdf-and-extract-selected-pages", "how-to-package-multiple-pdfs-into-a-zip"],
  },
  {
    kind: "article",
    slug: "split-pdf-and-extract-selected-pages",
    title: "How to split a PDF and extract selected pages",
    seoTitle: "Split a PDF or Extract Pages | QuickPDFHD",
    description: "The difference between extracting a range, exporting each page, and chunking a long PDF—and when each result (one PDF vs a ZIP) makes sense.",
    tool: "/split-pdf",
    tools: ["/split-pdf", "/merge-pdf", "/pdf-to-zip"],
    toolName: "Split PDF",
    intro: "People say “split” when they mean three different jobs: keep pages 3–7 as one file, save every page as its own PDF, or break a handbook into 10-page pieces. QuickPDFHD offers those as extract range, separate pages, and chunks. Choosing the wrong mode is the usual source of “why did I get a ZIP?” confusion.",
    sections: [
      {
        heading: "Extract range: one smaller PDF",
        paragraphs: [
          "Enter pages such as 1-3, 5, 8-10. You receive a single PDF that contains only those pages, in that order. Use this when a reviewer asked for a chapter or an appendix.",
          "Numbers follow the PDF’s internal page index, starting at 1. Printed “page 12” might be file page 14 if the PDF has a cover and unnumbered front matter. Count in a viewer, not from the footer, if they disagree.",
        ],
      },
      {
        heading: "Separate pages: many PDFs in a ZIP",
        paragraphs: [
          "Each selected page becomes its own PDF inside a ZIP. Leave the range blank to use every page. This is for certificates, tickets, or forms that must be filed individually.",
          "You are not flattening pages into JPG files. Each output is still a PDF page copied from the source.",
        ],
      },
      {
        heading: "Chunks: several multi-page PDFs",
        paragraphs: [
          "Pick a page count per file when a long document is too large to email whole. You get a ZIP of PDFs, each with up to that many pages, walking through the source from start to finish.",
          "Chunks do not try to split on chapter titles. If a chapter should stay together, extract those pages as a range instead.",
        ],
      },
      {
        heading: "Limits that actually apply",
        paragraphs: [
          "One PDF, up to 25 MB and 200 pages. Encrypted files must be unlocked first. Splitting does not redact text; anyone with the new file can still read those pages.",
        ],
      },
    ],
    steps: [
      "Open the PDF and note the file page numbers you need.",
      "Choose extract range, separate pages, or chunks on Split PDF.",
      "Download the PDF or ZIP and confirm the pages before sending.",
    ],
    tips: [
      "To turn only some pages into images, extract them first, then convert those pages with dedicated PDF software.",
      "To reassemble extracts, use Merge PDF.",
    ],
    relatedGuides: ["how-to-split-a-pdf", "merge-pdf-files-in-the-correct-order", "how-to-package-multiple-pdfs-into-a-zip"],
  },
  {
    kind: "article",
    slug: "scanned-pdf-versus-searchable-pdf",
    title: "Scanned PDF vs searchable PDF: what is the difference?",
    seoTitle: "Scanned PDF vs Searchable PDF | QuickPDFHD",
    description: "How to tell a picture-of-a-page from a PDF with real text, and which QuickPDFHD tools work on each kind of file.",
    tool: "/pdf-to-word",
    tools: ["/pdf-to-word", "/pdf-to-excel", "/document-scanner"],
    toolName: "PDF to Word",
    intro: "A PDF can look like text on screen and still be a photograph. Search, copy, PDF to Excel, and NO OCR Word conversion all depend on whether the file stores text objects. A scan stores pixels. Confusing the two is the most common reason a conversion “does nothing.”",
    sections: [
      {
        heading: "A 10-second test",
        paragraphs: [
          "Open the PDF and drag across a sentence. If words highlight, the file has selectable text. That is what people mean by a searchable or text-based PDF, even if it was never run through a special “make searchable” product.",
          "If the cursor draws a box around a picture of the page, or nothing highlights, you are looking at a scan or an image-only export. Find in that viewer will not search the wording.",
        ],
      },
      {
        heading: "Where each kind of file comes from",
        paragraphs: [
          "Word to PDF and Excel to PDF create text-based pages from office files (with the layout limits described on those tools). Merge and split copy whatever the sources already were: merging two scans still yields a scan.",
          "Document Scanner and image-to-PDF create A4 pages from pictures. The result looks like a document and behaves like a stack of images unless you later run OCR.",
        ],
      },
      {
        heading: "Which tools care",
        list: [
          "PDF to Word NO OCR and PDF to Excel need selectable text.",
          "PDF to Word OCR is for scans, up to 15 pages, English and/or Hindi.",
          "Desktop PDF software can export a page as an image for either kind of file.",
          "Split and merge copy pages and do not convert a scan into searchable text.",
        ],
      },
      {
        heading: "Searchable does not mean perfectly designed",
        paragraphs: [
          "A text PDF can still have odd column order. Searchable means characters exist, not that tables are perfect. A scan can look beautiful and still be useless for copy-paste.",
        ],
      },
    ],
    steps: [
      "Try to select text in a PDF viewer.",
      "If text selects, use NO OCR or PDF to Excel as needed.",
      "If it does not, use OCR on PDF to Word, or keep the file as a visual scan.",
    ],
    tips: [
      "Do not rename .jpg to .pdf and expect searchable text.",
      "OCR output is editable text, not a rebuilt magazine layout.",
    ],
    relatedGuides: ["how-ocr-converts-scanned-pdfs", "how-to-convert-scanned-pdf-to-word", "how-to-convert-pdf-to-word"],
  },
  {
    kind: "article",
    slug: "how-ocr-converts-scanned-pdfs",
    title: "How OCR converts scanned PDFs into editable documents",
    seoTitle: "How OCR Works on Scanned PDFs | QuickPDFHD",
    description: "What optical character recognition does on QuickPDFHD, which languages are supported, and why the Word file is not a perfect copy of the scan.",
    tool: "/pdf-to-word",
    tools: ["/pdf-to-word", "/document-scanner"],
    toolName: "PDF to Word",
    intro: "OCR (optical character recognition) is a way to guess letters from a picture of a page. On PDF to Word, OCR is a mode you choose. It is not running in the background on every PDF, and it is not used by PDF to Excel.",
    sections: [
      {
        heading: "What the server actually does",
        paragraphs: [
          "Each page is rendered as an image. Tesseract then tries to read characters. Those characters are written into a .docx file in page order. You can edit that Word file. You cannot expect the original fonts, columns, and stamps to reappear as design objects.",
          "NO OCR skips that picture-reading step. It copies text already stored in the PDF. If that text is missing, NO OCR cannot invent it.",
        ],
      },
      {
        heading: "Languages on this site",
        paragraphs: [
          "You can set English, Hindi, or English + Hindi. Pick the script that is actually on the page. A Hindi form with English selected will misread letters. A combined model helps mixed pages and can still confuse similar shapes.",
          "If a language model cannot load, the tool reports an error rather than silently switching languages.",
        ],
      },
      {
        heading: "What accuracy depends on",
        paragraphs: [
          "Clear, upright, high-contrast print works best. Handwriting, stamps over text, skew, blur, and dense tables produce errors. Always read names, amounts, and dates in the Word file before you reuse them.",
          "OCR is limited to 15 pages and 25 MB because recognition is slower than copying existing text (NO OCR allows 40 pages).",
        ],
      },
      {
        heading: "OCR is not the scanner",
        paragraphs: [
          "Document Scanner prepares photos into an A4 PDF. It does not recognize letters. If you scan first, then need Word text, open the PDF in PDF to Word and choose OCR.",
        ],
      },
    ],
    steps: [
      "Confirm you cannot select text in the PDF.",
      "Upload on PDF to Word, choose OCR, and set the language.",
      "Correct the DOCX, especially numbers and proper names.",
    ],
    tips: [
      "Do not use English + Hindi on a page that is only one script unless you have a reason.",
      "A second, sharper photo often helps more than a second OCR pass on a blurry scan.",
    ],
    relatedGuides: ["how-to-convert-scanned-pdf-to-word", "scanned-pdf-versus-searchable-pdf", "how-to-scan-document-photos-to-pdf"],
  },
  {
    kind: "article",
    slug: "pdf-page-size-a4-letter-and-common-formats",
    title: "PDF page size explained: A4, Letter, and common formats",
    seoTitle: "PDF Page Size: A4 vs Letter | QuickPDFHD",
    description: "What A4 and Letter actually measure, how QuickPDFHD’s image and scanner tools use A4, and what happens when you merge mixed page sizes.",
    tool: "/jpg-to-pdf",
    tools: ["/jpg-to-pdf", "/document-scanner", "/merge-pdf", "/word-to-pdf"],
    toolName: "JPG to PDF",
    intro: "Page size is the paper rectangle a PDF page claims to be, measured in points (72 points per inch). It is not the same as image pixel size, and it is not the same as file size in megabytes. Printers and portals often expect a specific rectangle, usually A4 or US Letter.",
    sections: [
      {
        heading: "A4 and Letter in plain numbers",
        paragraphs: [
          "A4 is 210 × 297 mm (about 8.27 × 11.69 inches). It is the common office size in much of the world, including India.",
          "US Letter is 8.5 × 11 inches (about 216 × 279 mm). It is slightly wider and shorter than A4. A Letter page printed on A4 paper—or the reverse—can clip a few millimetres or show extra margin, depending on the printer’s “fit to page” setting.",
        ],
      },
      {
        heading: "What QuickPDFHD uses",
        paragraphs: [
          "JPG, JPEG, PNG, and WEBP to PDF place each image on an A4 page, scaled to fit and centered. Extra space shows as margin. Document Scanner also builds A4 pages.",
          "Word to PDF and Excel to PDF follow those converters’ page setup (Excel uses landscape pages for tables). Split copies existing page boxes. Merge keeps each source page’s size, so a packet can mix A4 and Letter if the files did.",
        ],
      },
      {
        heading: "Pixels are not millimetres",
        paragraphs: [
          "A 4000-pixel photo on A4 is still an A4 page; the picture is fitted into that rectangle. Changing DPI metadata on Resize Image does not switch a PDF from Letter to A4. To get A4 photo pages, use the image-to-PDF or scanner tools.",
        ],
      },
      {
        heading: "Printing and uploading",
        paragraphs: [
          "If a form says “upload A4 PDF,” check the page size in a PDF viewer’s document properties after download. Fitting a Letter export onto A4 in a printer dialog is not the same as the file actually being A4.",
        ],
      },
    ],
    steps: [
      "Check whether the destination asked for A4 or Letter.",
      "Build photo pages with the A4 image or scanner tools when that is required.",
      "After a merge, scroll the file: mixed sizes will be visible as you go.",
    ],
    tips: [
      "Very wide screenshots on A4 will have large top and bottom margins.",
      "Excel to PDF is landscape; that is intentional so more columns fit.",
    ],
    relatedGuides: ["image-dpi-versus-pixel-dimensions", "how-to-convert-jpg-to-pdf", "how-to-scan-document-photos-to-pdf"],
  },
  {
    kind: "article",
    slug: "image-dpi-versus-pixel-dimensions",
    title: "Image DPI vs pixel dimensions: what actually changes when resizing",
    seoTitle: "DPI vs Pixels When Resizing Images | QuickPDFHD",
    description: "Pixel width and height rebuild the picture. DPI is metadata. Learn how QuickPDFHD’s image resizer treats each, and why print size can still surprise you.",
    tool: "/resize-image",
    tools: ["/resize-image", "/jpg-to-pdf", "/document-scanner"],
    toolName: "Resize Image",
    intro: "People mix up “make it 300 DPI” with “make it larger.” On a screen, what you see is pixels. DPI (dots per inch) is a label some print workflows use to translate those pixels into centimetres on paper. QuickPDFHD’s resizer can change either, and they are not the same operation.",
    sections: [
      {
        heading: "Pixels: the actual picture grid",
        paragraphs: [
          "Width × height in pixels is how many samples the image contains. Dropping 4000 × 3000 to 1200 × 900 discards data. The file often gets smaller. Enlarging 800 × 600 to 2400 × 1800 does not recover a sharper photo; it stretches the same information.",
          "Percentage presets (25% through 200%) scale that grid. Aspect-ratio lock keeps the same shape. Unlocking the lock sets both sides exactly and can squash the image. There is no crop tool.",
        ],
      },
      {
        heading: "DPI: a label for printers",
        paragraphs: [
          "You can set Resolution / DPI while leaving width and height unchanged. The picture looks the same on a typical monitor. A print program may now think those pixels should occupy a different physical size.",
          "Example: 1200 pixels at 300 DPI is notionally 4 inches wide. The same 1200 pixels at 72 DPI is notionally much wider. Nothing in the photo “became sharper” when you typed 300.",
        ],
      },
      {
        heading: "How this meets PDFs",
        paragraphs: [
          "Image-to-PDF fits the bitmap onto an A4 page regardless of the DPI tag. A huge-pixel photo and a small-pixel photo can both become A4; the small one simply looks softer if you zoom.",
          "Document Scanner size goals change JPEG quality of page images, which is another lever besides pixels.",
        ],
      },
      {
        heading: "Formats and download behavior",
        paragraphs: [
          "JPG and WEBP quality sliders affect encoding. PNG does not use that slider. One resized file downloads directly. A batch is saved as separate files—using a folder picker when the browser allows—not as a ZIP.",
        ],
      },
    ],
    steps: [
      "Decide whether you need fewer pixels, a DPI tag, or both.",
      "Keep aspect ratio locked unless you intentionally want stretch.",
      "Check the output at 100% zoom before you convert the images to PDF.",
    ],
    tips: [
      "Portal “max 2 MB” problems are usually pixels and JPEG quality, not DPI.",
      "8000 pixels on a side is the upload cap on this resizer.",
    ],
    relatedGuides: ["how-to-resize-multiple-images", "pdf-compression-quality-versus-file-size", "pdf-page-size-a4-letter-and-common-formats"],
  },
];
