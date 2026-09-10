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
    related: ["/merge-pdf", "/pdf-to-word", "/pdf-to-jpg", "/pdf-to-zip"],
  },
  {
    id: "merge-pdf",
    name: "Merge PDF",
    path: "/merge-pdf#upload",
    category: "PDF Tools",
    group: "document",
    icon: "merge",
    description: "Combine multiple PDF files into one document.",
    related: ["/split-pdf", "/pdf-to-word", "/pdf-to-jpg", "/pdf-to-zip"],
  },
  {
    id: "pdf-to-jpg",
    name: "PDF to JPG",
    path: "/pdf-to-jpg#upload",
    category: "PDF Tools",
    group: "document",
    icon: "pdfjpg",
    description: "Render PDF pages as JPG images.",
    related: ["/jpg-to-pdf", "/split-pdf", "/merge-pdf", "/png-to-pdf"],
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
    description: "Turn JPG photos into one ordered PDF document.",
    related: ["/png-to-pdf", "/jpeg-to-pdf", "/webp-to-pdf", "/pdf-to-jpg", "/document-scanner"],
  },
  {
    id: "jpeg-to-pdf",
    name: "JPEG to PDF",
    path: "/jpeg-to-pdf#upload",
    category: "Image Tools",
    group: "image",
    icon: "jpeg",
    description: "Convert JPEG image files into a PDF document.",
    related: ["/jpg-to-pdf", "/png-to-pdf", "/webp-to-pdf", "/pdf-to-jpg", "/document-scanner"],
  },
  {
    id: "png-to-pdf",
    name: "PNG to PDF",
    path: "/png-to-pdf#upload",
    category: "Image Tools",
    group: "image",
    icon: "png",
    description: "Put PNG screenshots and graphics into a PDF.",
    related: ["/jpg-to-pdf", "/jpeg-to-pdf", "/webp-to-pdf", "/resize-image", "/document-scanner"],
  },
  {
    id: "webp-to-pdf",
    name: "WEBP to PDF",
    path: "/webp-to-pdf#upload",
    category: "Image Tools",
    group: "image",
    icon: "webp",
    description: "Create a PDF document from WEBP images.",
    related: ["/jpg-to-pdf", "/png-to-pdf", "/jpeg-to-pdf", "/pdf-to-jpg", "/resize-image"],
  },
  {
    id: "resize-image",
    name: "Resize Image",
    path: "/resize-image#upload",
    category: "Image Tools",
    group: "image",
    icon: "resize",
    description: "Resize JPG, PNG, and WebP images by pixels, percentage, and DPI.",
    related: ["/jpg-to-pdf", "/png-to-pdf", "/webp-to-pdf", "/jpeg-to-pdf"],
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
