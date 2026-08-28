import Layout from "../../components/layout/Layout";

import UploadBox from "../../components/upload/UploadBox";
import ImagePreview from "../../components/upload/ImagePreview";
import ConvertButton from "../../components/upload/ConvertButton";

import RelatedTools from "../../components/seo/RelatedTools";
import SEO from "../../components/seo/SEO";
import ToolPageContent from "../../components/seo/ToolPageContent";
import imageToPdfToolContent from "../../config/imageToPdfToolContent";

const PngToPdf = () => {
  const tool = imageToPdfToolContent.png;
  return (
    <Layout>
      <SEO
        title="PNG to PDF Converter – Combine PNG Images | QuickPDFHD"
        description="Convert multiple PNG images, screenshots, or graphics into one PDF online. Reorder up to 20 PNG files and download one document."
        canonical="https://quickpdfhd.com/png-to-pdf"
        structuredData={{ "@context": "https://schema.org", "@type": "WebApplication", name: "QuickPDFHD PNG to PDF Converter", url: "https://quickpdfhd.com/png-to-pdf", applicationCategory: "UtilitiesApplication", operatingSystem: "Web", description: "Convert PNG images into a PDF document online." }}
      />

      <main className="bg-slate-50">
        {/* Hero Section */}
        <section className="px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              PNG to PDF Converter
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Convert Multiple PNG Images to PDF
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Turn PNG screenshots, diagrams, and graphics into one ordered PDF. Upload up to 20 images, arrange the pages, and download the completed document.
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

        <RelatedTools currentPath="/png-to-pdf" />
      </main>
    </Layout>
  );
};

export default PngToPdf;
