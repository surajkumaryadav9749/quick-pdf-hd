import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import ToolCard, { toolCardGridClass } from "../../components/common/ToolCard";
import { iconForService } from "../../components/common/toolIcons";
import { findService, serviceCatalog, serviceCategories } from "../../config/serviceCatalog";
import { pdfGuides } from "../../config/pdfGuides";

const categoryCopy = {
  "PDF Tools": "Convert office files, extract PDF text, split or merge PDFs, render pages as images, scan document photos, and package PDFs into a ZIP file.",
  "Image Tools": "Create PDFs from JPG, JPEG, PNG, or WEBP images, and resize JPG, PNG, and WEBP files.",
};

const chooserGroups = [
  {
    title: "PDF Conversion Tools",
    intro: "Change a file from one document format to another.",
    ids: ["word-to-pdf", "pdf-to-word", "excel-to-pdf", "pdf-to-excel", "pdf-to-jpg"],
  },
  {
    title: "PDF Organization Tools",
    intro: "Rearrange or package PDFs without converting their pages to photos.",
    ids: ["split-pdf", "merge-pdf", "pdf-to-zip"],
  },
  {
    title: "PDF & Image Tools",
    intro: "Turn photos into documents, turn PDF pages into images, or resize pictures.",
    ids: ["jpg-to-pdf", "jpeg-to-pdf", "png-to-pdf", "webp-to-pdf", "pdf-to-jpg", "resize-image"],
  },
  {
    title: "Document Tools",
    intro: "Work with photographed paperwork and Word files.",
    ids: ["document-scanner", "word-to-pdf", "pdf-to-word"],
  },
];

const chooserTasks = [
  { id: "word-to-pdf", when: "You wrote a letter, resume, or report in Word and need a file others can open without Microsoft Word." },
  { id: "pdf-to-word", when: "You need editable paragraphs from a PDF. Use NO OCR if you can already select text; use OCR if the pages are scans." },
  { id: "excel-to-pdf", when: "You want worksheet tables as a printable document rather than a spreadsheet." },
  { id: "pdf-to-excel", when: "The PDF already has selectable table text that you want in an XLSX file. Scans will not extract this way." },
  { id: "split-pdf", when: "You only need some pages, or each page should become its own PDF." },
  { id: "merge-pdf", when: "Several PDFs should travel as one document in a set order." },
  { id: "pdf-to-jpg", when: "A website or chat app wants a picture of a page instead of a PDF." },
  { id: "jpg-to-pdf", when: "You have photos or photographed pages that should become one ordered document." },
  { id: "pdf-to-zip", when: "You want several PDFs in one download without combining their pages." },
];

const faqs = [
  { question: "What tools are available on QuickPDFHD?", answer: "The site includes Word and Excel conversion, PDF to Word (with optional OCR), PDF to Excel, split, merge, PDF to JPG, JPG/JPEG/PNG/WEBP to PDF, Document Scanner, PDF to ZIP, and Resize Image." },
  { question: "Do I need an account?", answer: "No. Open a tool page, upload a supported file, and download the result. Each page lists its own size and page limits." },
  { question: "How do the tools work?", answer: "You upload a file, choose any options shown on that page, the server processes the request in memory, and you download the generated PDF, Word, Excel, image, or ZIP file." },
  { question: "Which file types are supported?", answer: "Depending on the tool: DOC, DOCX, XLS, XLSX, PDF, JPG, JPEG, PNG, and WEBP. Resize Image accepts JPG, PNG, and WEBP." },
  { question: "When should I use OCR on PDF to Word?", answer: "Use OCR when you cannot select text in the PDF because the pages are scans or images. Use NO OCR when text is already selectable." },
  { question: "Are uploaded files saved in a user library?", answer: "The conversion tools use memory storage and do not write uploaded files to the application’s own disk or database. Hosting logs, email, and analytics can still handle other information, as described in the Privacy Policy." },
  { question: "Where can I find step-by-step help?", answer: "Open PDF Guides for Word, Excel, split, merge, OCR, image, scanner, and ZIP walkthroughs." },
  { question: "Are the tools unlimited?", answer: "No. Each page lists its own limits, such as 15 MB for Word or Excel, 25 MB for most PDF tools, 20 images for image-to-PDF, and page caps for OCR, split, merge, and PDF to JPG." },
];

const AllServices = () => (
  <Layout>
    <SEO
      title="All PDF & Image Tools Online | QuickPDFHD"
      description="Browse every QuickPDFHD tool: Word and Excel conversion, PDF to Word with OCR, split and merge, PDF to JPG, image-to-PDF, scanning, ZIP packaging, and image resizing."
      canonical="https://quickpdfhd.com/all-services"
      structuredData={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://quickpdfhd.com/" },
              { "@type": "ListItem", position: 2, name: "All Services", item: "https://quickpdfhd.com/all-services" },
            ],
          },
          {
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ],
      }}
    />
    <main>
      <section className="bg-slate-50 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500"><Link to="/" className="hover:text-teal-800">Home</Link> <span aria-hidden="true">/</span> All Services</nav>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">All PDF &amp; Image Tools</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            QuickPDFHD is a set of browser-based tools for everyday file jobs: convert Word or Excel to PDF, pull text or tables out of a PDF, split or merge pages, turn photos into a document, scan paperwork, package PDFs into a ZIP file, or resize images. Each card below opens a dedicated page with its own upload area, formats, and limits.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Tool categories</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-600">The same catalog is grouped below by task type. The grids that follow are the full directory.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {chooserGroups.map((group) => (
              <article key={group.title} className="rounded-2xl border border-slate-200 p-6">
                <h3 className="text-xl font-semibold text-slate-900">{group.title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{group.intro}</p>
                <ul className="mt-4 space-y-2">
                  {group.ids.map((id) => {
                    const service = serviceCatalog.find((item) => item.id === id);
                    if (!service) return null;
                    return (
                      <li key={`${group.title}-${id}`}>
                        <Link to={service.path} className="font-semibold text-teal-800 hover:underline">{service.name}</Link>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {serviceCategories.map((category) => {
        const services = serviceCatalog.filter((service) => service.category === category);
        const sectionClass = category === "PDF Tools" ? "bg-slate-50 py-16 sm:py-20" : "bg-white py-16 sm:py-20";

        return (
          <section key={category} aria-labelledby={category.replace(" ", "-").toLowerCase()} className={sectionClass}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">QuickPDFHD services</p>
                <h2 id={category.replace(" ", "-").toLowerCase()} className="mt-3 scroll-mt-24 text-3xl font-bold text-slate-900 sm:text-4xl">{category}</h2>
                <p className="mt-3 leading-7 text-slate-600">{categoryCopy[category]}</p>
              </div>
              <div className={toolCardGridClass}>
                {services.map((service) => (
                  <ToolCard
                    key={service.path}
                    to={service.path}
                    title={service.name}
                    description={service.description}
                    icon={iconForService(service.icon)}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Choose the right PDF tool</h2>
          <p className="mt-4 leading-8 text-slate-600">Match the job to a tool instead of opening every page. Limits still apply on the tool itself.</p>
          <dl className="mt-8 space-y-6">
            {chooserTasks.map((task) => {
              const service = findService(`/${task.id}`);
              if (!service) return null;
              return (
                <div key={task.id}>
                  <dt className="text-lg font-semibold text-slate-900">
                    <Link to={service.path} className="text-teal-800 hover:underline">{service.name}</Link>
                  </dt>
                  <dd className="mt-2 leading-7 text-slate-600">{task.when}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">How QuickPDFHD tools work</h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-2">
            {[
              ["Upload", "Choose the file types listed on that tool page. Empty or oversize files are rejected before processing."],
              ["Choose options", "Examples include NO OCR vs OCR, page ranges, image order, aspect-ratio lock, or ZIP filename."],
              ["Process", "The file is sent to the conversion server and handled in memory to create the download."],
              ["Download", "Save the PDF, DOCX, XLSX, JPG, or ZIP to your device and check it before you send it."],
            ].map(([title, text], index) => (
              <li key={title} className="list-none rounded-2xl border border-slate-200 p-6">
                <span className="font-bold text-teal-800">{index + 1}</span>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2 sm:px-6">
          <article className="rounded-2xl border border-slate-200 bg-white p-7">
            <h2 className="text-2xl font-bold text-slate-900">Supported file types</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
              <li>Word: DOC, DOCX (Word to PDF).</li>
              <li>Excel: XLS, XLSX (Excel to PDF).</li>
              <li>PDF: split, merge, PDF to Word, PDF to Excel, PDF to JPG, PDF to ZIP.</li>
              <li>Images: JPG, JPEG, PNG, WEBP for image-to-PDF and Document Scanner. Resize Image accepts JPG, PNG, and WEBP.</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-7">
            <h2 className="text-2xl font-bold text-slate-900">File privacy and handling</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Uploads are processed in server memory to create your download. The application does not write uploaded files to its own disk or database. That is not a claim of encryption grade, timed deletion, or that no other service can see related data. Hosting logs, the contact-form email path, and Google Analytics are described in the{" "}
              <Link to="/privacy-policy" className="font-semibold text-teal-800 hover:underline">Privacy Policy</Link>.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">PDF and image tools for everyday tasks</h2>
          <p className="mt-4 leading-8 text-slate-600">
            Students often turn notes or a Word assignment into a PDF. Office users merge packets, split out a signature page, or extract a table. Freelancers send invoices and portfolios as PDFs. Small teams photograph forms with Document Scanner, or resize images before upload. None of the tools replace checking the download for names, numbers, and layout.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">Related PDF guides</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {pdfGuides.slice(0, 10).map((guide) => (
              <li key={guide.slug}>
                <Link to={`/pdf-guides/${guide.slug}`} className="font-semibold text-teal-800 hover:underline">{guide.title}</Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link to="/pdf-guides" className="font-semibold text-teal-800 hover:underline">See every guide</Link>
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">FAQs</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Using the tool collection</h2>
          <dl className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-slate-200 p-6">
                <dt className="text-lg font-semibold text-slate-900">{faq.question}</dt>
                <dd className="mt-3 leading-7 text-slate-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  </Layout>
);

export default AllServices;
