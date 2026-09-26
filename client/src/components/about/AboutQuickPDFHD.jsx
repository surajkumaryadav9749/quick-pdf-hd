import { Link } from "react-router-dom";
import { FiCheckCircle, FiGlobe, FiLock, FiMail, FiZap } from "react-icons/fi";

const corePillars = [
  {
    icon: <FiZap aria-hidden="true" />,
    title: "Immediate Browser Processing",
    description:
      "Perform conversions and document modifications straight from your desktop or mobile browser without installing desktop software or extensions.",
  },
  {
    icon: <FiLock aria-hidden="true" />,
    title: "In-Memory Privacy Approach",
    description:
      "Files are processed in memory for the active request and never saved into a persistent user file library or sold to third parties.",
  },
  {
    icon: <FiGlobe aria-hidden="true" />,
    title: "Universal Cross-Platform Access",
    description:
      "QuickPDFHD works consistently across Windows, macOS, Linux, iOS, and Android using standard, modern web standards.",
  },
  {
    icon: <FiCheckCircle aria-hidden="true" />,
    title: "Clear, Honest Capabilities",
    description:
      "Every tool documents exact supported formats, file limits, and realistic layout tradeoffs so you always know what to expect.",
  },
];

const workflows = [
  {
    category: "Office & Document Conversion",
    items: [
      "Word to PDF: Convert DOC and DOCX files into clean, printable PDFs.",
      "Excel to PDF: Transform spreadsheet tables into readable landscape documents.",
      "PDF to Word: Extract selectable text or run OCR on scanned documents into editable DOCX.",
      "PDF to Excel: Extract structured tables from digital PDFs into XLSX spreadsheets.",
    ],
  },
  {
    category: "PDF Organization & Packaging",
    items: [
      "Merge PDF: Combine multiple PDF files into one ordered document.",
      "Split PDF: Extract specific page ranges, separate pages, or break into chunks.",
      "PDF to ZIP: Package separate PDFs together into an archive without merging pages.",
    ],
  },
  {
    category: "Image to PDF & Document Scanning",
    items: [
      "JPG/JPEG to PDF: Compile photos and camera pictures into an A4 PDF booklet.",
      "PNG to PDF: Turn screenshots, mockups, and UI graphics into a shareable document.",
      "WebP to PDF: Package saved web images into a single printable file.",
      "Document Scanner: Crop margins, apply black-and-white filters, and set target PDF file sizes.",
    ],
  },
  {
    category: "Image Format Conversion & Resizing",
    items: [
      "WebP to JPG: Convert modern WebP graphics to universally compatible JPEGs.",
      "WebP to PNG: Extract WebP graphics into lossless PNGs with alpha transparency preserved.",
      "JPG to PNG: Convert JPG photos to lossless PNG to stop generational compression loss.",
      "PNG to JPG: Drastically reduce image file sizes for email and portal uploads.",
      "Resize Image: Adjust dimensions by pixels or percentage and set DPI print metadata.",
    ],
  },
];

const AboutQuickPDFHD = () => {
  return (
    <section aria-labelledby="about-quickpdf-heading" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
            About QuickPDFHD
          </p>

          <h2 id="about-quickpdf-heading" className="mt-4 text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Why QuickPDFHD Exists
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            QuickPDFHD was built to solve a simple, frustrating everyday problem: converting and organizing
            documents shouldn&apos;t require bulky desktop software, expensive subscriptions, or uploading sensitive
            files to obscure sites that keep permanent libraries of user documents.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {corePillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:border-teal-500 hover:shadow-lg"
            >
              <div
                aria-hidden="true"
                className="mb-5 inline-flex rounded-xl bg-teal-100 p-3.5 text-teal-800"
              >
                {pillar.icon}
              </div>

              <h3 className="text-lg font-bold text-slate-900">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{pillar.description}</p>
            </article>
          ))}
        </div>

        {/* Detailed Explanation */}
        <div className="mx-auto mt-20 max-w-4xl space-y-10">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">How Our Tools Are Designed</h3>
            <p className="mt-4 leading-8 text-slate-600">
              Each QuickPDFHD tool is designed around a single, focused task. We don&apos;t build complicated multi-step
              dashboards or bury conversion buttons behind registration paywalls. You arrive on a tool page, upload
              your file, adjust any available settings (such as OCR language, split mode, or target image format),
              and download your result immediately.
            </p>
            <p className="mt-3 leading-8 text-slate-600">
              Under the hood, we rely on established, robust open-source processing engines including{" "}
              <strong>Sharp</strong> for high-performance image manipulation, <strong>pdf-lib</strong> and{" "}
              <strong>pdfjs-dist</strong> for PDF stream composition, and <strong>Tesseract.js</strong> for
              optical character recognition.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">Supported Workflows</h3>
            <p className="mt-4 leading-8 text-slate-600">
              QuickPDFHD supports four core workflow categories tailored to students, professionals, educators, and
              everyday computer users:
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {workflows.map((wf) => (
                <div key={wf.category} className="rounded-2xl border border-slate-200 p-6">
                  <h4 className="text-base font-bold text-teal-800">{wf.category}</h4>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    {wf.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-teal-700" aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900">Our File Privacy &amp; Handling Approach</h3>
            <p className="mt-4 leading-8 text-slate-600">
              We take a transparent, privacy-first engineering stance. Files sent to QuickPDFHD are processed in server
              memory during the active HTTP request. We do not store your files in an application database, we do not
              build persistent user file libraries, and we do not profile your documents. For OCR requests, temporary
              rasterized page files may exist on the server only while recognition is running and are purged
              immediately upon completion.
            </p>
          </div>

          <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-8">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h4 className="text-xl font-bold text-slate-900">Have Questions or Suggestions?</h4>
                <p className="mt-1 text-sm text-slate-600">
                  We are continuously refining QuickPDFHD. Reach out to report an issue or suggest a feature.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-700"
              >
                <FiMail className="h-4 w-4" aria-hidden="true" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutQuickPDFHD;
