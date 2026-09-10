import { FiUploadCloud, FiLayers, FiDownload } from "react-icons/fi";

const steps = [
  {
    icon: <FiUploadCloud aria-hidden="true" />,
    title: "Open the right tool",
    description:
      "Choose a converter from All Services, such as Word to PDF, Merge PDF, or JPG to PDF.",
  },
  {
    icon: <FiLayers aria-hidden="true" />,
    title: "Add your files",
    description:
      "Upload the supported format shown on that page. Check order, page range, or language options when they appear.",
  },
  {
    icon: <FiDownload aria-hidden="true" />,
    title: "Download the result",
    description:
      "Create the file on the server, then save the PDF, Word, Excel, image, or ZIP download to your device.",
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
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
            Simple Process
          </p>

          <h2
            id="how-it-works-heading"
            className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl"
          >
            How QuickPDFHD tools work
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Each tool has its own page, file types, and limits. Upload, review the
            options, then download the generated file.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="relative rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-teal-500 hover:shadow-xl"
            >
              {/* Step Number */}
              <span
                aria-label={`Step ${index + 1}`}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 text-sm font-bold text-white"
              >
                {index + 1}
              </span>

              {/* Icon */}
              <div
                aria-hidden="true"
                className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100 text-3xl text-teal-800"
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
