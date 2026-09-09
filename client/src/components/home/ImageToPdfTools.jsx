import { Link } from "react-router-dom";
import { FiArchive, FiCamera, FiColumns, FiCopy, FiFileText, FiGrid, FiImage, FiLayers, FiMaximize } from "react-icons/fi";
import ToolCard, { toolCardGridClass } from "../common/ToolCard";

const tools = [
  { title: "Word to PDF", description: "Convert DOC or DOCX to PDF", path: "/word-to-pdf", icon: FiFileText },
  { title: "PDF to Word", description: "Extract PDF text to DOCX", path: "/pdf-to-word", icon: FiFileText },
  { title: "Excel to PDF", description: "Turn spreadsheets into PDF", path: "/excel-to-pdf", icon: FiGrid },
  { title: "PDF to Excel", description: "Extract PDF tables to XLSX", path: "/pdf-to-excel", icon: FiGrid },
  { title: "Split PDF", description: "Extract or separate PDF pages", path: "/split-pdf", icon: FiColumns },
  { title: "Merge PDF", description: "Combine multiple PDF files", path: "/merge-pdf", icon: FiLayers },
  { title: "PDF to JPG", description: "Save PDF pages as images", path: "/pdf-to-jpg", icon: FiCopy },
  { title: "JPG to PDF", description: "Convert JPG images to PDF", path: "/jpg-to-pdf", icon: FiImage },
  { title: "PNG to PDF", description: "Convert PNG images to PDF", path: "/png-to-pdf", icon: FiImage },
  { title: "PDF to ZIP", description: "Package PDF files into ZIP", path: "/pdf-to-zip", icon: FiArchive },
  { title: "Document Scanner", description: "Scan documents into a PDF", path: "/document-scanner", icon: FiCamera },
  { title: "Resize Image", description: "Resize images online", path: "/resize-image", icon: FiMaximize },
];

const ImageToPdfTools = () => (
  <section id="services" className="scroll-mt-20 bg-white px-4 py-14 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Popular Tools</h2><Link to="/all-services" className="inline-flex items-center gap-2 font-semibold text-teal-800 transition hover:text-teal-600">View all tools <span aria-hidden="true">→</span></Link></div>
      <div className={toolCardGridClass}>
        {tools.map(({ title, description, path, icon }) => (
          <ToolCard key={path} to={`${path}#upload`} title={title} description={description} icon={icon} />
        ))}
      </div>
    </div>
  </section>
);

export default ImageToPdfTools;
