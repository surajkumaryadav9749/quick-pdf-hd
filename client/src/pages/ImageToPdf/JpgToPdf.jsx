import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";

import UploadBox from "../../components/upload/UploadBox";
import ImagePreview from "../../components/upload/ImagePreview";
import ConvertButton from "../../components/upload/ConvertButton";

import RelatedTools from "../../components/seo/RelatedTools";
import ToolPageContent from "../../components/seo/ToolPageContent";
import SEO from "../../components/seo/SEO";
import imageToPdfToolContent from "../../config/imageToPdfToolContent";

const JpgToPdf = () => {
  const tool = imageToPdfToolContent.jpg;
  return (
    <Layout>
      <SEO
        title="JPG to PDF Converter Online – Combine JPG Images | QuickPDFHD"
        description="Convert JPG images to PDF online. Upload one or more JPG files, arrange the page order, and download a single PDF document. No account required."
        canonical="https://quickpdfhd.com/jpg-to-pdf"
        robots="index,follow"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebApplication", name: "QuickPDFHD JPG to PDF Converter", url: "https://quickpdfhd.com/jpg-to-pdf", applicationCategory: "UtilitiesApplication", operatingSystem: "Web", description: "Convert JPG and JPEG images into a PDF document online." },
            { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://quickpdfhd.com/" }, { "@type": "ListItem", position: 2, name: "JPG to PDF", item: "https://quickpdfhd.com/jpg-to-pdf" }] },
            { "@type": "FAQPage", mainEntity: tool.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
          ],
        }}
      />

      <main>
        {/* Hero Section */}
        <section className="px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
              <Link to="/" className="hover:text-teal-800">Home</Link> <span aria-hidden="true">/</span>{" "}
              <Link to="/all-services" className="hover:text-teal-800">All Services</Link> <span aria-hidden="true">/</span> JPG to PDF
            </nav>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-teal-800">
              JPG to PDF Converter
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Convert Multiple JPG Images to PDF
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Convert JPG or JPEG photos, scanned pages, and saved images into one PDF. Upload up to 20 files, arrange the page order, and download your document when it is ready.
            </p>
          </div>
        </section>

        {/* Converter Section */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <UploadBox />

            <ImagePreview />

            <ConvertButton />
          </div>
        </section>

        <ToolPageContent tool={tool} />

        {/* Related Tools */}
        <RelatedTools currentPath="/jpg-to-pdf" />
      </main>
    </Layout>
  );
};

export default JpgToPdf;
