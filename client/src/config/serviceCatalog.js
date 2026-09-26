export const serviceCatalog = [
  {
    id: "word-to-pdf",
    name: "Word to PDF",
    path: "/word-to-pdf#upload",
    category: "PDF Tools",
    group: "document",
    icon: "word",
    description: "Convert a DOC or DOCX Word document into a PDF.",
    related: ["/pdf-to-word", "/excel-to-pdf", "/pdf-to-excel", "/merge-pdf", "/split-pdf"],
  },
  {
    id: "pdf-to-word",
    name: "PDF to Word",
    path: "/pdf-to-word#upload",
    category: "PDF Tools",
    group: "document",
    icon: "pdfword",
    description: "Convert selectable PDF text or scanned pages (OCR) into a DOCX file.",
    related: ["/word-to-pdf", "/pdf-to-excel", "/merge-pdf", "/split-pdf"],
  },
  {
    id: "excel-to-pdf",
    name: "Excel to PDF",
    path: "/excel-to-pdf#upload",
    category: "PDF Tools",
    group: "document",
    icon: "excel",
    description: "Turn XLS or XLSX worksheet tables into a printable PDF.",
    related: ["/pdf-to-excel", "/word-to-pdf", "/pdf-to-word", "/merge-pdf"],
  },
  {
    id: "pdf-to-excel",
    name: "PDF to Excel",
    path: "/pdf-to-excel#upload",
    category: "PDF Tools",
    group: "document",
    icon: "pdfexcel",
    description: "Extract table-like PDF text into an XLSX spreadsheet.",
    related: ["/excel-to-pdf", "/pdf-to-word", "/word-to-pdf", "/merge-pdf"],
  },
  {
    id: "split-pdf",
    name: "Split PDF",
    path: "/split-pdf#upload",
    category: "PDF Tools",
    group: "document",
    icon: "split",
    description: "Extract pages or split a PDF into smaller files.",
    related: ["/merge-pdf", "/pdf-to-word", "/pdf-to-excel", "/pdf-to-zip"],
  },
  {
    id: "merge-pdf",
    name: "Merge PDF",
    path: "/merge-pdf#upload",
    category: "PDF Tools",
    group: "document",
    icon: "merge",
    description: "Combine multiple PDF files into one document.",
    related: ["/split-pdf", "/pdf-to-word", "/word-to-pdf", "/pdf-to-zip"],
  },
  {
    id: "document-scanner",
    name: "Document Scanner",
    path: "/document-scanner#upload",
    category: "PDF Tools",
    group: "utility",
    icon: "scan",
    description: "Clean document photos and create a smaller, page-numbered PDF.",
    related: ["/jpg-to-pdf", "/png-to-pdf", "/resize-image", "/pdf-to-zip", "/merge-pdf"],
  },
  {
    id: "pdf-to-zip",
    name: "PDF to ZIP",
    path: "/pdf-to-zip#upload",
    category: "PDF Tools",
    group: "utility",
    icon: "zip",
    description: "Package multiple PDF files together in one ZIP archive.",
    related: ["/merge-pdf", "/split-pdf", "/document-scanner", "/jpg-to-pdf"],
  },
  {
    id: "jpg-to-pdf",
    name: "JPG to PDF",
    path: "/jpg-to-pdf#upload",
    category: "Image Tools",
    group: "image",
    icon: "jpg",
    description: "Turn JPG or JPEG photos into one ordered PDF document.",
    related: ["/png-to-pdf", "/webp-to-pdf", "/document-scanner", "/resize-image"],
  },
  {
    id: "png-to-pdf",
    name: "PNG to PDF",
    path: "/png-to-pdf#upload",
    category: "Image Tools",
    group: "image",
    icon: "png",
    description: "Put PNG screenshots and graphics into a PDF.",
    related: ["/jpg-to-pdf", "/webp-to-pdf", "/resize-image", "/document-scanner"],
  },
  {
    id: "webp-to-pdf",
    name: "WEBP to PDF",
    path: "/webp-to-pdf#upload",
    category: "Image Tools",
    group: "image",
    icon: "webp",
    description: "Create a PDF document from WEBP images.",
    related: ["/jpg-to-pdf", "/png-to-pdf", "/resize-image", "/document-scanner"],
  },
  {
    id: "resize-image",
    name: "Resize Image",
    path: "/resize-image#upload",
    category: "Image Tools",
    group: "image",
    icon: "resize",
    description: "Resize JPG, PNG, and WebP images by pixels, percentage, and DPI.",
    related: ["/jpg-to-pdf", "/png-to-pdf", "/webp-to-pdf", "/document-scanner", "/webp-to-jpg", "/jpg-to-png"],
  },
  {
    id: "webp-to-jpg",
    name: "WebP to JPG",
    path: "/webp-to-jpg#upload",
    category: "Image Tools",
    group: "image",
    icon: "webpjpg",
    description: "Convert WebP images to standard JPG format for universal compatibility.",
    related: ["/webp-to-png", "/png-to-jpg", "/jpg-to-png", "/webp-to-pdf", "/resize-image"],
  },
  {
    id: "webp-to-png",
    name: "WebP to PNG",
    path: "/webp-to-png#upload",
    category: "Image Tools",
    group: "image",
    icon: "webppng",
    description: "Convert WebP images to lossless PNG format with transparency preserved.",
    related: ["/webp-to-jpg", "/jpg-to-png", "/png-to-jpg", "/png-to-pdf", "/resize-image"],
  },
  {
    id: "jpg-to-png",
    name: "JPG to PNG",
    path: "/jpg-to-png#upload",
    category: "Image Tools",
    group: "image",
    icon: "jpgpng",
    description: "Convert JPG or JPEG images to lossless PNG format without extra compression.",
    related: ["/png-to-jpg", "/webp-to-png", "/webp-to-jpg", "/jpg-to-pdf", "/resize-image"],
  },
  {
    id: "png-to-jpg",
    name: "PNG to JPG",
    path: "/png-to-jpg#upload",
    category: "Image Tools",
    group: "image",
    icon: "pngjpg",
    description: "Convert heavy PNG images to compact JPGs to drastically reduce file size.",
    related: ["/jpg-to-png", "/webp-to-jpg", "/webp-to-png", "/png-to-pdf", "/resize-image"],
  },
];

export const serviceCategories = ["PDF Tools", "Image Tools"];

export const routePath = (path = "") => String(path).split("#")[0];

export const findService = (path) =>
  serviceCatalog.find((service) => routePath(service.path) === routePath(path));

export const getRelatedServices = (currentPath, limit = 5) => {
  const current = findService(currentPath);
  const fallback = serviceCatalog
    .filter((service) => routePath(service.path) !== routePath(currentPath))
    .slice(0, limit);
  if (!current?.related?.length) return fallback;
  return current.related
    .map((path) => findService(path))
    .filter(Boolean)
    .filter((service) => routePath(service.path) !== routePath(currentPath))
    .slice(0, limit);
};
