import { Link } from "react-router-dom";

const tools = [
  { title: "PDF to ZIP", description: "Package several PDF files together in one ZIP archive.", path: "/pdf-to-zip" },
  { title: "Resize Image", description: "Resize JPG, PNG, and WebP images by pixels or percentage.", path: "/resize-image" },
  { title: "Document Scanner", description: "Clean document photos and create a smaller, page-numbered PDF.", path: "/document-scanner" },
  { title: "JPG to PDF", description: "Convert JPG images into PDF documents online.", path: "/jpg-to-pdf" },
  { title: "PNG to PDF", description: "Convert PNG images into PDF documents quickly.", path: "/png-to-pdf" },
  { title: "JPEG to PDF", description: "Turn JPEG images into a single PDF file with ease.", path: "/jpeg-to-pdf" },
  { title: "WEBP to PDF", description: "Convert WEBP images into PDF files online.", path: "/webp-to-pdf" },
];

const ImageToPdfTools = () => (
  <section id="services" className="scroll-mt-20 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Our PDF Services</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Choose the PDF tool you need</h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Create PDFs from images or prepare clean, compact document scans. To combine JPG photos, use our{" "}
          <Link to="/jpg-to-pdf" className="font-semibold text-blue-600 hover:underline">JPG to PDF converter</Link>.
        </p>
        <Link to="/all-services" className="mt-5 inline-flex font-semibold text-blue-600 hover:underline">View all QuickPDFHD services →</Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => (
          <Link key={tool.path} to={`${tool.path}#upload`} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md">
            <h3 className="text-xl font-semibold text-slate-900">{tool.title}</h3>
            <p className="mt-3 leading-7 text-slate-600">{tool.description}</p>
            <span className="mt-4 inline-flex items-center font-medium text-blue-600">Convert now <span className="ml-1">→</span></span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ImageToPdfTools;
