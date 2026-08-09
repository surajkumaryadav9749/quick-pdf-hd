import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="relative overflow-hidden bg-slate-50"
    >
      {/* Background Blur */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center rounded-full border border-blue-200 bg-blue-50 px-5 py-2 text-sm font-medium text-blue-700">
            <li>
              <Link to="/" className="transition hover:text-blue-600">
                Home
              </Link>
            </li>

            <li aria-hidden="true" className="mx-2">
              /
            </li>

            <li aria-current="page">About</li>
          </ol>
        </nav>

        {/* Main Heading */}
        <h1
          id="about-hero-heading"
          className="max-w-4xl text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl"
        >
          About <span className="text-blue-600">QuickPDFHD</span>
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-600">
          QuickPDFHD is a fast, secure and completely free online Image to PDF
          converter that helps you transform multiple images into professional
          PDF documents within seconds.
        </p>
      </div>
    </section>
  );
};

export default Hero;
