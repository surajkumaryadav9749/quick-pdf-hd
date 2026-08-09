import { FiGlobe, FiLock, FiZap, FiCheckCircle } from "react-icons/fi";

const features = [
  {
    icon: <FiZap aria-hidden="true" />,
    title: "Fast Conversion",
    description:
      "Convert multiple images into a high-quality PDF within seconds.",
  },
  {
    icon: <FiLock aria-hidden="true" />,
    title: "Secure & Private",
    description:
      "Your uploaded images are processed securely and never stored permanently.",
  },
  {
    icon: <FiGlobe aria-hidden="true" />,
    title: "Works Everywhere",
    description:
      "Use QuickPDFHD on Windows, Mac, Android or iPhone directly in your browser.",
  },
  {
    icon: <FiCheckCircle aria-hidden="true" />,
    title: "100% Free",
    description:
      "No registration, subscriptions or hidden charges. Convert your images for free.",
  },
];

const AboutQuickPDFHD = () => {
  return (
    <section
      aria-labelledby="about-quickpdf-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            About QuickPDFHD
          </p>

          <h2
            id="about-quickpdf-heading"
            className="mt-6 text-4xl font-bold text-slate-900"
          >
            Who We Are
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            QuickPDFHD is a modern online Image to PDF converter built to make
            document conversion simple, fast and secure. Whether you're a
            student, professional, freelancer or business owner, QuickPDFHD
            helps you convert multiple images into a professional PDF without
            installing any software.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl"
            >
              <div
                aria-hidden="true"
                className="mb-6 inline-flex rounded-2xl bg-blue-100 p-4 text-blue-600"
              >
                {feature.icon}
              </div>

              <h3 className="mb-4 text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>

              <p className="leading-7 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutQuickPDFHD;
