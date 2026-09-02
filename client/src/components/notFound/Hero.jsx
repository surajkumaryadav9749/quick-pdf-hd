import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import Container from "../common/Container";
import Button from "../common/Button";

const Hero = () => {
  return (
    <section className="flex min-h-[85vh] items-center bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          {/* Error Code */}
          <span className="text-7xl font-extrabold text-blue-600 md:text-9xl">
            404
          </span>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold text-slate-900 md:text-6xl">
            Oops! Page Not Found
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            The page you're looking for doesn't exist, may have been moved, or
            the URL may be incorrect.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/">
              <Button>
                <FiArrowLeft size={20} />
                Back to Home
              </Button>
            </Link>
            <Link
              to="/all-services"
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-400 hover:text-blue-700"
            >
              Browse all tools
            </Link>
          </div>
          <p className="mt-7 text-sm text-slate-600">
            Popular tools: <Link to="/document-scanner" className="font-semibold text-blue-600 hover:underline">Document Scanner</Link>,{" "}
            <Link to="/jpg-to-pdf" className="font-semibold text-blue-600 hover:underline">JPG to PDF</Link>, and{" "}
            <Link to="/resize-image" className="font-semibold text-blue-600 hover:underline">Resize Image</Link>.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
