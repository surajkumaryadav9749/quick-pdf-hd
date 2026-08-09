import UploadSection from "./UploadSection";

const HeroSection = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Announcement */}
        <p className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
          No Sign-up Required • 100% Free • Fast Conversion
        </p>

        {/* Main SEO Heading */}
        <h1
          id="hero-heading"
          className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl lg:text-6xl"
        >
          Convert Images to PDF
          <span className="block text-blue-600">Instantly</span>
        </h1>

        {/* Introduction */}
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Convert JPG, PNG and WEBP images into a single high-quality PDF in
          seconds. QuickPDFHD is fast, secure and completely free to use.
        </p>

        {/* PDF Upload Tool */}
        <div className="mx-auto mt-12 w-full max-w-3xl">
          <UploadSection />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
