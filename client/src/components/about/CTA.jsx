import { Link } from "react-router-dom";
import { FiArrowRight, FiHome } from "react-icons/fi";

const CTA = () => {
  return (
    <section
      aria-labelledby="about-cta-heading"
      className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-sky-600 py-20"
    >
      {/* Background Blur */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
          Start Converting Today
        </p>

        <h2
          id="about-cta-heading"
          className="mt-8 text-4xl font-extrabold leading-tight text-white md:text-5xl"
        >
          Ready to Convert Your Images into PDF?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
          Use QuickPDFHD for fast, secure and high-quality Image to PDF
          conversion. No signup, no watermark and completely free.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Convert Images to PDF
            <FiArrowRight aria-hidden="true" size={20} />
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded-xl border border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-blue-700"
          >
            <FiHome aria-hidden="true" size={20} />
            Back to Home
          </Link>
        </div>

        {/* Supporting Stats */}
        <dl className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <dt className="text-3xl font-bold text-white">100%</dt>
            <dd className="mt-2 text-blue-100">Free to Use</dd>
          </div>

          <div>
            <dt className="text-3xl font-bold text-white">Secure</dt>
            <dd className="mt-2 text-blue-100">Privacy Focused</dd>
          </div>

          <div>
            <dt className="text-3xl font-bold text-white">Fast</dt>
            <dd className="mt-2 text-blue-100">Instant PDF Generation</dd>
          </div>
        </dl>
      </div>
    </section>
  );
};

export default CTA;
