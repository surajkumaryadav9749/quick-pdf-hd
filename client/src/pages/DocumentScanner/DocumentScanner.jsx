import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import ScannerWorkspace from "../../components/scanner/ScannerWorkspace";
import RelatedTools from "../../components/seo/RelatedTools";
import RelatedGuides from "../../components/seo/RelatedGuides";

const faqs = [
  { question: "Can I combine several document photos into one PDF?", answer: "Yes. Upload up to 20 images and QuickPDFHD will create one PDF with one image on each page." },
  { question: "Can I reduce the PDF file size?", answer: "Choose a size goal of 100 KB, 200 KB, 500 KB, or 1 MB. The final size depends on the number of pages and image detail." },
  { question: "How are document photos handled?", answer: "Files are uploaded to the conversion server and processed in memory to create the PDF. The application does not write uploaded files to its own disk or database." },
];

const DocumentScanner = () => (
  <Layout>
    <SEO title="Scan Multiple Photos to PDF – Document Scanner | QuickPDFHD" description="Scan up to 20 document photos into one PDF. Crop white edges, choose color or black-and-white mode, add page numbers, and set a compact size goal." canonical="https://quickpdfhd.com/document-scanner" structuredData={{ "@context": "https://schema.org", "@graph": [{ "@type": "WebApplication", name: "QuickPDFHD Document Scanner", url: "https://quickpdfhd.com/document-scanner", applicationCategory: "UtilitiesApplication", operatingSystem: "Web", description: "Scan up to 20 document photos into a cleaned, page-numbered PDF with size and color settings." }, { "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }] }} />
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
