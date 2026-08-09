import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import Container from "../common/Container";

const CTA = () => {
  return (
    <section
      aria-labelledby="contact-cta-heading"
      className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-cyan-600 py-20"
    >
      {/* Background Blur */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
      />

      <Container>
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          {/* Badge */}
          <p className="inline-flex rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white">
            Start Converting Today
          </p>

          {/* Heading */}
          <h2
            id="contact-cta-heading"
            className="mt-6 text-4xl font-extrabold leading-tight text-white md:text-5xl"
          >
            Ready to Convert Your Images into PDF?
          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-blue-100">
            QuickPDFHD makes Image to PDF conversion simple, secure and
            lightning fast. Upload your images and generate professional PDFs in
            seconds.
          </p>

          {/* Button */}
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Convert Images to PDF
              <FiArrowRight aria-hidden="true" size={22} />
            </Link>
          </div>

          {/* Stats */}
          <dl className="mt-16 grid gap-8 sm:grid-cols-3">
            <div>
              <dt className="text-3xl font-bold text-white">Fast</dt>
              <dd className="mt-2 text-blue-100">Instant PDF Generation</dd>
            </div>

            <div>
              <dt className="text-3xl font-bold text-white">Secure</dt>
              <dd className="mt-2 text-blue-100">Privacy Protected</dd>
            </div>

            <div>
              <dt className="text-3xl font-bold text-white">100%</dt>
              <dd className="mt-2 text-blue-100">Free to Use</dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
