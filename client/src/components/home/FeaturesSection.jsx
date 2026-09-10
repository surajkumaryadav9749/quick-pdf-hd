import { FiZap, FiShield, FiMonitor, FiImage } from "react-icons/fi";

import { BsCloudCheck } from "react-icons/bs";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";

const features = [
  {
    icon: <FiZap aria-hidden="true" />,
    title: "Browser-based tools",
    description:
      "Run conversions from a browser on desktop or mobile. You do not need to install a desktop PDF suite.",
  },
  {
    icon: <FiShield aria-hidden="true" />,
    title: "In-memory processing",
    description:
      "Uploaded files are sent to the conversion server and processed in memory to create your download.",
  },
  {
    icon: <FiMonitor aria-hidden="true" />,
    title: "Works in the browser",
    description:
      "Use QuickPDFHD on Windows, Mac, Android, and iPhone from a current web browser.",
  },
  {
    icon: <FiImage aria-hidden="true" />,
    title: "Documents and images",
    description:
      "Handle Word, Excel, PDF, JPG, PNG, JPEG, and WEBP files with dedicated tools for each task.",
  },
  {
    icon: <HiOutlineCurrencyDollar aria-hidden="true" />,
    title: "No account required",
    description:
      "The tools are free to use in the browser. File-size and page limits still apply on each tool page.",
  },
  {
    icon: <BsCloudCheck aria-hidden="true" />,
    title: "No installation",
    description:
      "Nothing extra needs to be installed. Each tool has its own page with upload controls and limits.",
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
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
            Why Choose QuickPDFHD
          </p>

          <h2
            id="features-heading"
            className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl"
          >
            Practical tools for documents and images
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Convert office files, manage PDFs, create documents from photos, and
            resize images without installing extra software.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-teal-500 hover:shadow-xl"
            >
              {/* Icon */}
              <div
                aria-hidden="true"
                className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100 text-3xl text-teal-800"
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
