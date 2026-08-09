import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";

import Container from "../common/Container";
import Button from "../common/Button";

const Hero = () => {
  return (
    <section
      aria-labelledby="contact-hero-heading"
      className="relative overflow-hidden bg-slate-50"
    >
      {/* Background Blur */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl"
      />

      <Container>
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
          {/* Badge */}
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <FiMail aria-hidden="true" />
            We'd Love to Hear From You
          </p>

          {/* Main Heading */}
          <h1
            id="contact-hero-heading"
            className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl"
          >
            Get in{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Have questions, feedback, or need assistance with QuickPDFHD? Our
            team is here to help you with image-to-PDF conversion and answer
            your general inquiries.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#contact-form">
              <Button>Contact Support</Button>
            </a>

            <Link to="/">
              <Button variant="secondary">Convert Images</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
