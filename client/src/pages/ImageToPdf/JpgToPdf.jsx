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

        {/* About JPG to PDF */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-slate-900">
              Free JPG to PDF Converter
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              QuickPDFHD is a free online JPG to PDF converter that lets you
              turn your JPG images into PDF documents directly from your
              browser. You can upload one or multiple images, arrange them in
              the order you want and convert them into a single PDF file.
            </p>

            <p className="mt-5 leading-8 text-slate-600">
              No software installation or account is required. After the
              conversion is completed, your PDF is downloaded automatically to
              your device.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              Convert Multiple JPG Images to One PDF
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              QuickPDFHD allows you to upload multiple JPG images and combine
              them into a single PDF document. You can also change the image
              order before starting the conversion, making it easy to create a
              PDF in the exact sequence you need.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              How to Convert JPG to PDF
            </h2>

            <ol className="mt-5 list-decimal space-y-3 pl-6 leading-7 text-slate-600">
              <li>Upload one or more JPG images.</li>
              <li>Arrange the images in your preferred order.</li>
              <li>Click the Convert JPG to PDF button.</li>
              <li>Your PDF will be generated and downloaded automatically.</li>
            </ol>
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
