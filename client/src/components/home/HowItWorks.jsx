import { FiUploadCloud, FiLayers, FiDownload } from "react-icons/fi";

const steps = [
  {
    icon: <FiUploadCloud aria-hidden="true" />,
    title: "Upload Images",
    description:
      "Select or drag and drop your JPG, PNG or WEBP images into the upload box.",
  },
  {
    icon: <FiLayers aria-hidden="true" />,
    title: "Arrange Images",
    description:
      "Organize your uploaded images in the order you want before creating the PDF.",
  },
  {
    icon: <FiDownload aria-hidden="true" />,
    title: "Download PDF",
    description:
      "Click the Convert button and download your high-quality PDF instantly.",
  },
];

const HowItWorks = () => {
  return (
    <section
      aria-labelledby="how-it-works-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Simple Process
          </p>

          <h2
            id="how-it-works-heading"
            className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl"
          >
            How to Convert Images to PDF Online
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Convert JPG, PNG and WEBP images into a single PDF in three simple
            steps. No installation, no registration and completely free.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl"
            >
              {/* Step Number */}
              <span
                aria-label={`Step ${index + 1}`}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white"
              >
                {index + 1}
              </span>

              {/* Icon */}
              <div
                aria-hidden="true"
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-3xl text-blue-600"
              >
                {step.icon}
              </div>

              {/* Step Title */}
              <h3 className="mb-4 text-xl font-semibold text-slate-900">
                {step.title}
              </h3>

              {/* Description */}
              <p className="leading-7 text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
