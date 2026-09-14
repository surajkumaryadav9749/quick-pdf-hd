import { Link } from "react-router-dom";

const pdfTools = [
  { to: "/merge-pdf", name: "Merge PDF", text: "Combine 2–20 PDFs in list order, up to 200 pages together." },
  { to: "/split-pdf", name: "Split PDF", text: "Extract a range, export pages, or chunk a file up to 200 pages." },
  { to: "/pdf-to-jpg", name: "PDF to JPG", text: "Render each page as a JPEG (ZIP when there is more than one page)." },
  { to: "/pdf-to-zip", name: "PDF to ZIP", text: "Package up to 20 unchanged PDFs in one archive." },
];

const conversionTools = [
  { to: "/word-to-pdf", name: "Word to PDF", text: "DOC/DOCX up to 15 MB into a PDF of the document text." },
  { to: "/pdf-to-word", name: "PDF to Word", text: "Selectable text (40 pages) or OCR for scans (15 pages, English/Hindi)." },
  { to: "/excel-to-pdf", name: "Excel to PDF", text: "XLS/XLSX tables as landscape PDF pages (12 columns, 400 rows per sheet)." },
  { to: "/pdf-to-excel", name: "PDF to Excel", text: "Selectable table text into XLSX, one sheet per PDF page, no OCR." },
];

const imageTools = [
  { to: "/jpg-to-pdf", name: "JPG to PDF", text: "Up to 20 photos on A4 pages, in the order you set." },
  { to: "/png-to-pdf", name: "PNG to PDF", text: "Screenshots and graphics; transparency sits on white." },
  { to: "/webp-to-pdf", name: "WEBP to PDF", text: "Still web images when a PDF is easier to print or attach." },
  { to: "/resize-image", name: "Resize Image", text: "Pixels, percentage, format, quality, and DPI metadata for up to 20 files." },
];

const HomeOverview = () => (
  <section aria-labelledby="what-is-quickpdfhd" className="bg-slate-50 py-16 sm:py-20">
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <h2 id="what-is-quickpdfhd" className="text-3xl font-bold text-slate-900 sm:text-4xl">What is QuickPDFHD?</h2>
      <div className="mt-6 max-w-3xl space-y-5 leading-8 text-slate-600">
        <p>
          QuickPDFHD is a small set of browser tools for everyday PDF and image jobs: convert Word or Excel files, pull text or tables out of a PDF, split or merge pages, turn photos into an A4 document, scan photographed paperwork, package PDFs into a ZIP file, and resize images.
        </p>
        <p>
          Each tool has its own page with an upload area near the top and the limits that actually apply. Files are uploaded for the request. Most conversions stay in memory; PDF to JPG and OCR may use temporary server files that are removed afterward. That is not encryption or anonymity. Details are in the{" "}
          <Link to="/privacy-policy" className="font-semibold text-teal-800 hover:underline">Privacy Policy</Link>.
        </p>
      </div>

      <h2 className="mt-14 text-3xl font-bold text-slate-900">What you can do here</h2>
      <p className="mt-4 max-w-3xl leading-8 text-slate-600">
        You can change format (Word ↔ PDF, Excel ↔ PDF, PDF → JPG, images → PDF), reorganize PDFs (split, merge, ZIP), prepare photos of paper (Document Scanner), or change image pixel size. There is no account, and there is also no unlimited file size: every page lists megabyte and page caps.
      </p>

      <h2 className="mt-14 text-3xl font-bold text-slate-900">PDF tools</h2>
      <p className="mt-4 max-w-3xl leading-8 text-slate-600">
        Use these when you already have PDF files and need a different arrangement or a picture of a page. Merge copies pages; it does not redesign them. Split copies a subset. ZIP groups files without combining pages.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {pdfTools.map((item) => (
          <li key={item.to} className="rounded-2xl border border-slate-200 bg-white p-5">
            <Link to={item.to} className="font-semibold text-teal-800 hover:underline">{item.name}</Link>
            <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 text-3xl font-bold text-slate-900">Document conversion tools</h2>
      <p className="mt-4 max-w-3xl leading-8 text-slate-600">
        Conversion is for changing the kind of file. Word and Excel to PDF are for sharing a snapshot. PDF to Word and PDF to Excel are for recovering wording or tables. OCR exists only on PDF to Word, and only when you select it.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {conversionTools.map((item) => (
          <li key={item.to} className="rounded-2xl border border-slate-200 bg-white p-5">
            <Link to={item.to} className="font-semibold text-teal-800 hover:underline">{item.name}</Link>
            <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
          </li>
        ))}
      </ul>

      <h2 className="mt-14 text-3xl font-bold text-slate-900">Image tools</h2>
      <p className="mt-4 max-w-3xl leading-8 text-slate-600">
        Image-to-PDF tools accept up to 20 files (10 MB each) and place each still image on an A4 page. JPEG to PDF exists for the same codec with the .jpeg filename. Resize Image is for pixels and format, not for building a PDF.
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {imageTools.map((item) => (
          <li key={item.to} className="rounded-2xl border border-slate-200 bg-white p-5">
            <Link to={item.to} className="font-semibold text-teal-800 hover:underline">{item.name}</Link>
            <p className="mt-2 leading-7 text-slate-600">{item.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 leading-8 text-slate-600">
        Photographed forms, certificates, and notes belong on{" "}
        <Link to="/document-scanner" className="font-semibold text-teal-800 hover:underline">Document Scanner</Link>
        , which can trim edges, change color mode, rotate, number pages, aim at a size goal, and download processed images or a PDF.
      </p>

      <h2 className="mt-14 text-3xl font-bold text-slate-900">How QuickPDFHD works</h2>
      <ol className="mt-6 grid gap-4 md:grid-cols-2">
        {[
          ["Open the matching tool", "Formats that do not belong are rejected before processing. Empty files do not run."],
          ["Set the options on that page", "Examples: OCR language, split mode, image order, aspect-ratio lock, scanner size goal."],
          ["Wait for the server result", "The server creates a PDF, DOCX, XLSX, image, or ZIP. You download it and should check it before sending it on."],
          ["Check the download", "Layout, OCR mistakes, and missing pages are yours to catch before you send the file."],
        ].map(([title, text], index) => (
          <li key={title} className="list-none rounded-2xl border border-slate-200 bg-white p-5">
            <span className="font-bold text-teal-800">{index + 1}</span>
            <h3 className="mt-2 text-xl font-semibold text-slate-900">{title}</h3>
            <p className="mt-2 leading-7 text-slate-600">{text}</p>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 text-3xl font-bold text-slate-900">Choosing the right PDF tool</h2>
      <dl className="mt-6 space-y-5">
        {[
          ["I wrote this in Word", "Word to PDF, then merge if it must travel with other PDFs."],
          ["I cannot highlight text in the PDF", "PDF to Word with OCR, or keep it as a visual scan. PDF to Excel will not invent a table from a photo."],
          ["I only need chapter 2", "Split PDF extract range. Then merge if that chapter belongs in a new packet."],
          ["I have phone photos of paper", "Document Scanner. Plain JPG to PDF if the photos are already cropped and you skip scan modes."],
          ["I must send five PDFs that stay separate", "PDF to ZIP, not merge."],
        ].map(([q, a]) => (
          <div key={q}>
            <dt className="font-semibold text-slate-900">{q}</dt>
            <dd className="mt-1 leading-7 text-slate-600">{a}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-6">
        <Link to="/all-services" className="font-semibold text-teal-800 hover:underline">See every tool on All Services</Link>
      </p>

      <h2 className="mt-14 text-3xl font-bold text-slate-900">Useful document workflows</h2>
      <ul className="mt-6 list-disc space-y-3 pl-5 leading-7 text-slate-600">
        <li>Application packet: Word to PDF for the letter, Document Scanner for certificates, Merge PDF in cover-to-appendix order.</li>
        <li>Class notes: photograph pages, scan with grayscale and a size goal, or JPG to PDF if the photos are already clean.</li>
        <li>Spreadsheet snapshot: Excel to PDF for reading; keep the XLSX if anyone still needs formulas.</li>
        <li>Recover wording from a digital report: PDF to Word with NO OCR; use OCR only for scans.</li>
      </ul>
    </div>
  </section>
);

export default HomeOverview;
