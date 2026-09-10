import { Link } from "react-router-dom";

const HomeCta = () => (
  <section aria-labelledby="home-cta-heading" className="bg-teal-700 py-16 sm:py-20">
    <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
      <h2 id="home-cta-heading" className="text-3xl font-bold text-white sm:text-4xl">Choose a tool and convert a file</h2>
      <p className="mt-4 leading-8 text-teal-100">Open the full directory, or start with Word to PDF if you already have a document to share.</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link to="/all-services" className="inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-teal-800 transition hover:bg-teal-50">Browse all tools</Link>
        <Link to="/word-to-pdf#upload" className="inline-flex rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10">Open Word to PDF</Link>
      </div>
    </div>
  </section>
);

export default HomeCta;
