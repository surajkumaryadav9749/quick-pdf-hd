import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import ScannerWorkspace from "../../components/scanner/ScannerWorkspace";

const DocumentScanner = () => (
  <Layout>
    <SEO title="Document Scanner & PDF Compressor Online | QuickPDFHD" description="Scan document photos, clean white edges, use grayscale or black and white mode, add page numbers, and create a smaller PDF online." canonical="https://quickpdfhd.com/document-scanner" />
    <main>
      <section className="bg-slate-50 pb-10 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Document scanner</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">Scan photos into a clean, smaller PDF</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">Clean document photos, choose a compact PDF size, add page numbers, and download one submission-ready PDF.</p>
        </div>
      </section>
      <ScannerWorkspace />
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">How it works</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Turn document photos into a submission-ready PDF</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">Use this scanner for notes, forms, certificates, and other document photos. Review every page before creating a compact PDF for sharing or uploading.</p>
          </div>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            <li className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><span className="font-bold text-blue-600">01</span><h3 className="mt-3 text-xl font-semibold text-slate-900">Upload and review</h3><p className="mt-3 leading-7 text-slate-600">Add JPG, PNG, or WEBP document photos, then open the full preview to check every page.</p></li>
            <li className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><span className="font-bold text-blue-600">02</span><h3 className="mt-3 text-xl font-semibold text-slate-900">Choose scan settings</h3><p className="mt-3 leading-7 text-slate-600">Crop white margins, choose color or black-and-white mode, rotate pages, and select a PDF-size goal.</p></li>
            <li className="rounded-2xl border border-slate-200 bg-slate-50 p-6"><span className="font-bold text-blue-600">03</span><h3 className="mt-3 text-xl font-semibold text-slate-900">Create your PDF</h3><p className="mt-3 leading-7 text-slate-600">Optionally add page numbers, create one PDF from all pages, and download it to your device.</p></li>
          </ol>
        </div>
      </section>
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">FAQs</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Document scanner FAQs</h2>
          <dl className="mt-8 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6"><dt className="text-lg font-semibold text-slate-900">Can I combine several document photos into one PDF?</dt><dd className="mt-3 leading-7 text-slate-600">Yes. Upload up to 20 images and QuickPDFHD will create one PDF with one image on each page.</dd></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6"><dt className="text-lg font-semibold text-slate-900">Can I reduce the PDF file size?</dt><dd className="mt-3 leading-7 text-slate-600">Choose a size goal of 100 KB, 200 KB, 500 KB, or 1 MB. The final size depends on the number of pages and image detail.</dd></div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6"><dt className="text-lg font-semibold text-slate-900">Are my document photos stored permanently?</dt><dd className="mt-3 leading-7 text-slate-600">No. Files are processed only to create your PDF and are not stored permanently.</dd></div>
          </dl>
        </div>
      </section>
    </main>
  </Layout>
);

export default DocumentScanner;
