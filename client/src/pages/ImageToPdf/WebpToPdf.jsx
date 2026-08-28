import Layout from "../../components/layout/Layout";

import UploadBox from "../../components/upload/UploadBox";
import ImagePreview from "../../components/upload/ImagePreview";
import ConvertButton from "../../components/upload/ConvertButton";

import RelatedTools from "../../components/seo/RelatedTools";
import SEO from "../../components/seo/SEO";
import ToolPageContent from "../../components/seo/ToolPageContent";
import imageToPdfToolContent from "../../config/imageToPdfToolContent";

const WebpToPdf = () => {
  const tool = imageToPdfToolContent.webp;
  return (
    <Layout>
      <SEO
        title="WEBP to PDF Converter – Convert Multiple WEBP Images | QuickPDFHD"
        description="Convert multiple WEBP images into one PDF online. Upload, reorder up to 20 web images, and download one shareable PDF document."
        canonical="https://quickpdfhd.com/webp-to-pdf"
        structuredData={{ "@context": "https://schema.org", "@type": "WebApplication", name: "QuickPDFHD WEBP to PDF Converter", url: "https://quickpdfhd.com/webp-to-pdf", applicationCategory: "UtilitiesApplication", operatingSystem: "Web", description: "Convert WEBP images into a PDF document online." }}
      />

      <main className="bg-slate-50">
        {/* Hero Section */}
        <section className="px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              WEBP to PDF Converter
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Convert Multiple WEBP Images to PDF
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Turn WEBP images saved from websites or browsers into one PDF. Upload up to 20 images, arrange the pages, and download your completed document.
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

        <RelatedTools currentPath="/webp-to-pdf" />
      </main>
    </Layout>
  );
};

export default WebpToPdf;
