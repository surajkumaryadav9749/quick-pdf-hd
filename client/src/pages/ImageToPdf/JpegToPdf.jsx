import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";

import UploadBox from "../../components/upload/UploadBox";
import ImagePreview from "../../components/upload/ImagePreview";
import ConvertButton from "../../components/upload/ConvertButton";

import RelatedTools from "../../components/seo/RelatedTools";
import SEO from "../../components/seo/SEO";
import ToolPageContent from "../../components/seo/ToolPageContent";
import imageToPdfToolContent from "../../config/imageToPdfToolContent";

const JpegToPdf = () => {
  const tool = imageToPdfToolContent.jpeg;
  return (
    <Layout>
      <SEO
        title="JPEG to PDF Converter – Combine JPEG Images | QuickPDFHD"
        description="Convert multiple JPEG or JPG photos into one PDF online. Upload, reorder up to 20 images, and download a single PDF document."
        canonical="https://quickpdfhd.com/jpeg-to-pdf"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebApplication", name: "QuickPDFHD JPEG to PDF Converter", url: "https://quickpdfhd.com/jpeg-to-pdf", applicationCategory: "UtilitiesApplication", operatingSystem: "Web", description: "Convert JPEG and JPG images into a PDF document online." },
            { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://quickpdfhd.com/" }, { "@type": "ListItem", position: 2, name: "JPEG to PDF", item: "https://quickpdfhd.com/jpeg-to-pdf" }] },
            { "@type": "FAQPage", mainEntity: tool.faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
          ],
        }}
      />

      <main className="bg-slate-50">
        {/* Hero Section */}
        <section className="px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
              <Link to="/" className="hover:text-teal-800">Home</Link> <span aria-hidden="true">/</span>{" "}
              <Link to="/all-services" className="hover:text-teal-800">All Services</Link> <span aria-hidden="true">/</span> JPEG to PDF
            </nav>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-teal-800">
              JPEG to PDF Converter
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Convert Multiple JPEG Images to PDF
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Combine JPEG or JPG camera photos into one PDF. Upload up to 20 images, drag them into the correct page order, and download the finished document.
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

        <RelatedTools currentPath="/jpeg-to-pdf" />
      </main>
    </Layout>
  );
};

export default JpegToPdf;
