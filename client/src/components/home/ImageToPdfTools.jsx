import { Link } from "react-router-dom";
import { FiArchive, FiCamera, FiColumns, FiCopy, FiFileText, FiGrid, FiImage, FiLayers, FiMaximize } from "react-icons/fi";

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
      <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {tools.map(({ title, description, path, icon: Icon }) => <Link key={path} to={`${path}#upload`} className="group rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"><span aria-hidden="true" className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-2xl text-teal-600 transition group-hover:bg-teal-50"><Icon /></span><h3 className="mt-3 text-sm font-semibold text-slate-900">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-600">{description}</p></Link>)}
      </div>
    </div>
  </section>
);

export default ImageToPdfTools;
