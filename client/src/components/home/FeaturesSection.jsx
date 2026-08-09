import { FiZap, FiShield, FiMonitor, FiImage } from "react-icons/fi";

import { BsCloudCheck } from "react-icons/bs";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";

const features = [
  {
    icon: <FiZap aria-hidden="true" />,
    title: "Fast Conversion",
    description:
      "Convert your JPG, PNG and WEBP images into PDF files within seconds.",
  },
  {
    icon: <FiShield aria-hidden="true" />,
    title: "Secure & Private",
    description:
      "Your uploaded files are processed securely and are not stored permanently.",
  },
  {
    icon: <FiMonitor aria-hidden="true" />,
    title: "Works Everywhere",
    description:
      "Use QuickPDFHD on Windows, Mac, Android and iPhone directly from your browser.",
  },
  {
    icon: <FiImage aria-hidden="true" />,
    title: "Multiple Images",
    description:
      "Upload multiple images and combine them into a single PDF document.",
  },
  {
    icon: <HiOutlineCurrencyDollar aria-hidden="true" />,
    title: "100% Free",
    description:
      "Convert images to PDF without registration, subscriptions or hidden charges.",
  },
  {
    icon: <BsCloudCheck aria-hidden="true" />,
    title: "No Installation",
    description:
      "No software download or installation is required. Everything works online.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      aria-labelledby="features-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Why Choose QuickPDFHD
          </p>

          <h2
            id="features-heading"
            className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl"
          >
            Fast, Secure & Reliable Image to PDF Converter
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Convert JPG, PNG and WEBP images into high-quality PDF files in
            seconds. No registration, no installation and completely free to
            use.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl"
            >
              {/* Icon */}
              <div
                aria-hidden="true"
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl text-blue-600"
              >
                {feature.icon}
              </div>

              {/* Feature Title */}
              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>

              {/* Feature Description */}
              <p className="leading-7 text-slate-600">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
