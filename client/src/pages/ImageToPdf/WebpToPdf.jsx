import Layout from "../../components/layout/Layout";
import UploadBox from "../../components/upload/UploadBox";
import ImagePreview from "../../components/upload/ImagePreview";
import ConvertButton from "../../components/upload/ConvertButton";

const WebpToPdf = () => {
  return (
    <Layout>
      <main className="bg-slate-50">
        {/* Hero */}
        <section className="px-4 pb-10 pt-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              WEBP to PDF Converter
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Convert WEBP to PDF Online
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Convert your WEBP images into PDF files quickly and easily. Upload
              one or multiple WEBP images, arrange them in your preferred order
              and download your PDF after conversion.
            </p>
          </div>
        </section>

        {/* Converter */}
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <UploadBox />

            <ImagePreview />

            <ConvertButton />
          </div>
        </section>

        {/* Information */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-slate-900">
              WEBP to PDF Converter
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              QuickPDFHD makes it easy to convert WEBP images into PDF
              documents. Upload your WEBP files, arrange them in the order you
              want and convert them into a single PDF file.
            </p>

            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              How to Convert WEBP to PDF
            </h2>

            <ol className="mt-5 list-decimal space-y-3 pl-6 leading-7 text-slate-600">
              <li>Upload one or more WEBP images.</li>
              <li>Arrange the images in your preferred order.</li>
              <li>Click the Convert WEBP to PDF button.</li>
              <li>Your PDF will be generated and downloaded automatically.</li>
            </ol>

            <h2 className="mt-10 text-2xl font-bold text-slate-900">
              Why Convert WEBP to PDF?
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Converting WEBP images to PDF allows you to combine multiple
              images into a single document that is easier to share, print and
              organize. It is useful when you need a PDF version of web images
              or other WEBP files.
            </p>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default WebpToPdf;
