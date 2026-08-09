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
          <div className="mt-10 flex justify-center">
            <Link to="/">
              <Button>
                <FiArrowLeft size={20} />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
