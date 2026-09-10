import { Link } from "react-router-dom";

const cases = [
  {
    title: "Share a Word or Excel file as PDF",
    description: "Create a printable PDF from a DOC, DOCX, XLS, or XLSX file when the recipient does not need an editable office document.",
    to: "/word-to-pdf",
    label: "Open Word to PDF",
  },
  {
    title: "Edit text that is trapped in a PDF",
    description: "Extract selectable text without OCR, or use OCR on scanned pages, then continue in Word or Excel.",
    to: "/pdf-to-word",
    label: "Open PDF to Word",
  },
  {
    title: "Reorganize PDF pages",
    description: "Split out a page range, separate pages, or merge related PDFs into one file.",
    to: "/merge-pdf",
    label: "Open Merge PDF",
  },
  {
    title: "Turn photos into a document",
    description: "Combine JPG, PNG, JPEG, or WEBP images, or use Document Scanner for photographed paperwork.",
    to: "/jpg-to-pdf",
    label: "Open JPG to PDF",
  },
];

const HowToSection = () => (
  <section aria-labelledby="how-to-convert-heading" className="bg-slate-50 py-16 sm:py-20 lg:py-24">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">Useful starting points</p>
        <h2 id="how-to-convert-heading" className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">
          Common tasks people complete here
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Pick the tool that matches the files you already have. Limits and supported formats are listed on each tool page.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {cases.map((item) => (
          <article key={item.title} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-3 flex-1 leading-7 text-slate-600">{item.description}</p>
            <Link to={item.to} className="mt-5 font-semibold text-teal-800 hover:underline">{item.label}</Link>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default HowToSection;
