import { Link } from "react-router-dom";
import { pdfGuides } from "../../config/pdfGuides";

const featured = [
  "reduce-pdf-file-size-without-losing-readability",
  "pdf-compression-quality-versus-file-size",
  "merge-pdf-files-in-the-correct-order",
  "split-pdf-and-extract-selected-pages",
  "scanned-pdf-versus-searchable-pdf",
  "how-ocr-converts-scanned-pdfs",
  "pdf-page-size-a4-letter-and-common-formats",
  "image-dpi-versus-pixel-dimensions",
];

const HomeGuides = () => {
  const guides = featured.map((slug) => pdfGuides.find((guide) => guide.slug === slug)).filter(Boolean);

  return (
    <section aria-labelledby="home-guides-heading" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">PDF Guides</p>
          <h2 id="home-guides-heading" className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Helpful guides</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">Articles on file size, OCR, page size, and DPI, written around the tools that actually exist on this site.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <article key={guide.slug} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">
                <Link to={`/pdf-guides/${guide.slug}`} className="hover:text-teal-800">{guide.title}</Link>
              </h3>
              <p className="mt-3 leading-7 text-slate-600">{guide.description}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center">
          <Link to="/pdf-guides" className="font-semibold text-teal-800 hover:underline">See all PDF guides</Link>
        </p>
      </div>
    </section>
  );
};

export default HomeGuides;
