import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import PdfZipWorkspace from "../../components/filetools/PdfZipWorkspace";
import SEO from "../../components/seo/SEO";
import RelatedTools from "../../components/seo/RelatedTools";
import RelatedGuides from "../../components/seo/RelatedGuides";
import ToolArticleBody from "../../components/seo/ToolArticleBody";
import { toolExplainers } from "../../config/toolExplainers";

const faqs = [
  { question: "Does ZIP change the PDF pages?", answer: "No. Each PDF is copied into the archive. Bookmarks and passwords on those files stay as they were." },
  { question: "How many PDFs can I include?", answer: "Up to 20 PDF files, 25 MB each. You can add more files after the first selection and remove any you do not want." },
  { question: "Will the ZIP always be smaller?", answer: "Not necessarily. PDFs are often already compressed. ZIP is mainly a container so several files travel as one download." },
  { question: "Can I choose the archive name?", answer: "Yes. Type a name before creating the ZIP. Characters that are unsafe in filenames are replaced." },
  { question: "Should I ZIP or merge?", answer: "ZIP if each PDF must remain a separate file after unzipping. Merge if the recipient should scroll one document." },
  { question: "Are non-PDF files accepted?", answer: "No. This tool only packages PDF files." },
  { question: "What names appear inside the ZIP?", answer: "The uploaded PDF names are used as ZIP entry names. Characters that are unsafe in archive entries are replaced." },
];

const PdfToZip = () => (
  <Layout>
    <SEO
      title="PDF to ZIP Converter – Convert Multiple PDFs | QuickPDFHD"
      description="Package up to 20 PDF files into one ZIP archive. Files stay separate inside the ZIP; pages are not merged or recompressed."
      canonical="https://quickpdfhd.com/pdf-to-zip"
      structuredData={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebApplication", name: "QuickPDFHD PDF to ZIP Converter", url: "https://quickpdfhd.com/pdf-to-zip", applicationCategory: "UtilitiesApplication", operatingSystem: "Web", description: "Package up to 20 PDF files into a single ZIP archive." },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://quickpdfhd.com/" },
              { "@type": "ListItem", position: 2, name: "PDF to ZIP", item: "https://quickpdfhd.com/pdf-to-zip" },
            ],
          },
          { "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
        ],
      }}
    />
    <main>
      <section className="bg-slate-50 pb-10 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <Link to="/" className="hover:text-teal-800">Home</Link> <span aria-hidden="true">/</span>{" "}
            <Link to="/all-services" className="hover:text-teal-800">All Services</Link> <span aria-hidden="true">/</span> PDF to ZIP
          </nav>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Convert Multiple PDFs to One ZIP</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            Package up to 20 PDF files into one ZIP archive. Drag and drop documents, remove unwanted files, choose an archive name, and download them together.
          </p>
        </div>
      </section>
      <PdfZipWorkspace />
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">How it works</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">Create a ZIP archive from multiple PDF files</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-5">
            {[
              ["Select PDFs", "Choose or drop up to 20 PDF files, up to 25 MB each."],
              ["Review files", "Check filenames and remove any file you do not need."],
              ["Name the archive", "Choose a clear ZIP filename for your download."],
              ["Create ZIP", "Package the selected PDFs into one archive."],
              ["Download", "Save the ready ZIP file to your device."],
            ].map(([title, text], index) => (
              <li key={title} className="list-none rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <span className="font-bold text-teal-800">{index + 1}</span>
                <h3 className="mt-2 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ToolArticleBody explainer={toolExplainers["pdf-to-zip"]} />
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">FAQs</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">PDF to ZIP questions</h2>
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
      <RelatedGuides toolPath="/pdf-to-zip" />
      <RelatedTools currentPath="/pdf-to-zip" />
    </main>
  </Layout>
);

export default PdfToZip;
