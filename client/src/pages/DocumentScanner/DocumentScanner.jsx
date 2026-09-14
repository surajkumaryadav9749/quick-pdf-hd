import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import ScannerWorkspace from "../../components/scanner/ScannerWorkspace";
import RelatedTools from "../../components/seo/RelatedTools";
import RelatedGuides from "../../components/seo/RelatedGuides";
import ToolArticleBody from "../../components/seo/ToolArticleBody";
import { toolExplainers } from "../../config/toolExplainers";

const faqs = [
  { question: "Can I combine several document photos into one PDF?", answer: "Yes. Upload up to 20 JPG, PNG, or WEBP images. The PDF uses A4 pages, one image per page after processing." },
  { question: "Can I download the processed photos without a PDF?", answer: "Yes. Use Download Image or Download Images. That path returns processed JPEGs rather than a document." },
  { question: "What does auto-crop white edges do?", answer: "It tries to trim extra blank margin around the page. A busy desk background or a dark table can confuse the crop, so check the preview." },
  { question: "What do color, grayscale, and black-and-white change?", answer: "Color keeps hues. Grayscale drops color. Black-and-white pushes the page toward high-contrast text and can hide light pencil or stamps." },
  { question: "Are blank or blurry warnings definite?", answer: "No. They are a simple brightness and edge check in the browser. A page can still be usable, or a “clean” page can still be unreadable. Review the preview." },
  { question: "Does a size goal guarantee an exact file size?", answer: "No. Goals of 100 KB, 200 KB, 500 KB, or 1 MB steer JPEG quality. Page count and detail still change the outcome." },
  { question: "Does Document Scanner run OCR?", answer: "No. It prepares images and a PDF. For editable text, open the PDF in PDF to Word and choose OCR." },
  { question: "How are the photos handled?", answer: "Photos are uploaded for the scan request. There is no user file library. See the Privacy Policy for temporary-file details on other tools." },
];

const DocumentScanner = () => (
  <Layout>
    <SEO
      title="Scan Multiple Photos to PDF – Document Scanner | QuickPDFHD"
      description="Scan up to 20 document photos into one PDF. Crop white edges, choose color or black-and-white mode, add page numbers, and set a compact size goal."
      canonical="https://quickpdfhd.com/document-scanner"
      structuredData={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebApplication", name: "QuickPDFHD Document Scanner", url: "https://quickpdfhd.com/document-scanner", applicationCategory: "UtilitiesApplication", operatingSystem: "Web", description: "Scan up to 20 document photos into a cleaned, page-numbered PDF with size and color settings." },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://quickpdfhd.com/" },
              { "@type": "ListItem", position: 2, name: "Document Scanner", item: "https://quickpdfhd.com/document-scanner" },
            ],
          },
          { "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
        ],
      }}
    />
    <main>
      <section className="bg-slate-50 pb-10 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500"><Link to="/" className="hover:text-teal-800">Home</Link> <span aria-hidden="true">/</span> <Link to="/all-services" className="hover:text-teal-800">All Services</Link> <span aria-hidden="true">/</span> Document Scanner</nav>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-teal-800">Document scanner</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Scan Multiple Document Photos to PDF</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">Turn up to 20 JPG, PNG, or WEBP document photos into one clean PDF. Crop white edges, choose a document mode and size goal, add page numbers, and download it.</p>
        </div>
      </section>
      <ScannerWorkspace />
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">How it works</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Turn document photos into a submission-ready PDF</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Use this multi-page document scanner for notes, forms, certificates, and other document photos. Review every page, choose color, grayscale, or black-and-white processing, then create a compact PDF for sharing or uploading.</p>
          </div>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            <li className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><span className="font-bold text-teal-800">01</span><h3 className="mt-3 text-xl font-semibold text-slate-900">Upload and review</h3><p className="mt-3 leading-7 text-slate-600">Add JPG, PNG, or WEBP document photos, then open the full preview to check every page.</p></li>
            <li className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><span className="font-bold text-teal-800">02</span><h3 className="mt-3 text-xl font-semibold text-slate-900">Choose scan settings</h3><p className="mt-3 leading-7 text-slate-600">Crop white margins, choose color or black-and-white mode, rotate pages, and select a PDF-size goal.</p></li>
            <li className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><span className="font-bold text-teal-800">03</span><h3 className="mt-3 text-xl font-semibold text-slate-900">Create your PDF</h3><p className="mt-3 leading-7 text-slate-600">Optionally add page numbers, create one PDF from all pages, and download it to your device.</p></li>
          </ol>
        </div>
      </section>
      <ToolArticleBody explainer={toolExplainers["document-scanner"]} />
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">FAQs</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Document scanner FAQs</h2>
          <dl className="mt-8 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-6">
                <dt className="text-lg font-semibold text-slate-900">{faq.question}</dt>
                <dd className="mt-3 leading-7 text-slate-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <RelatedGuides toolPath="/document-scanner" />
      <RelatedTools currentPath="/document-scanner" />
    </main>
  </Layout>
);

export default DocumentScanner;
