import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import Container from "../common/Container";

const CTA = () => {
  return (
    <section
      aria-labelledby="contact-cta-heading"
      className="relative overflow-hidden bg-gradient-to-r from-teal-700 to-teal-600 py-20"
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
            Ready to use a QuickPDFHD tool?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-teal-100">
            Browse the directory or open a specific converter such as Word to PDF or JPG to PDF.
          </p>

          <div className="mt-10">
            <Link
              to="/all-services"
              className="inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-teal-800 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Browse all tools
              <FiArrowRight aria-hidden="true" size={22} />
            </Link>
          </div>

          <dl className="mt-16 grid gap-8 sm:grid-cols-3">
            <div>
              <dt className="text-3xl font-bold text-white">Browser-based</dt>
              <dd className="mt-2 text-teal-100">No extra app to install</dd>
            </div>

            <div>
              <dt className="text-3xl font-bold text-white">In memory</dt>
              <dd className="mt-2 text-teal-100">Uploads processed for conversion</dd>
            </div>

            <div>
              <dt className="text-3xl font-bold text-white">Free</dt>
              <dd className="mt-2 text-teal-100">No account required</dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
};

export default CTA;
