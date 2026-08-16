import Layout from "../../components/layout/Layout";

import UploadBox from "../../components/upload/UploadBox";
import ImagePreview from "../../components/upload/ImagePreview";
import ConvertButton from "../../components/upload/ConvertButton";

import HowToSection from "../../components/seo/HowToSection";
import RelatedTools from "../../components/seo/RelatedTools";
import SEO from "../../components/seo/SEO";

import FAQSection from "../../components/home/FAQSection";

const JpgToPdf = () => {
  return (
    <Layout>
      <SEO
        title="JPG to PDF Converter Online - Free | QuickPDFHD"
        description="Convert JPG images to PDF online for free with QuickPDFHD. Upload one or multiple JPG images, arrange them and download your PDF automatically."
        canonical="https://quickpdfhd.com/jpg-to-pdf"
      />

      <main className="bg-slate-50">
        {/* Hero Section */}
        <section className="px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              JPG to PDF Converter
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Convert JPG to PDF Online
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Convert JPG images to PDF online for free. Upload one or multiple
              JPG images, arrange them in your preferred order and download your
              PDF automatically after conversion.
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

        {/* How It Works */}
        <HowToSection />

        {/* Related Tools */}
        <RelatedTools />

        {/* FAQs */}
        <FAQSection />
      </main>
    </Layout>
  );
};

export default JpgToPdf;
