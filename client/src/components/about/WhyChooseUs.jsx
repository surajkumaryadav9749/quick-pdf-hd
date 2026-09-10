import {
  FiZap,
  FiLock,
  FiSmartphone,
  FiFileText,
  FiDownload,
  FiClock,
} from "react-icons/fi";

const benefits = [
  {
    icon: <FiZap aria-hidden="true" />,
    title: "Lightning Fast",
    description:
      "Open a tool page, upload a supported file, and download the result. Processing time depends on file size and the selected tool.",
  },
  {
    icon: <FiLock aria-hidden="true" />,
    title: "Straightforward file handling",
    description:
      "Files are uploaded for conversion and processed in memory by the application.",
  },
  {
    icon: <FiSmartphone aria-hidden="true" />,
    title: "Works on Every Device",
    description:
      "Use QuickPDFHD on desktop, laptop, tablet or mobile directly from your browser.",
  },
  {
    icon: <FiFileText aria-hidden="true" />,
    title: "Useful PDF output",
    description:
      "Create PDFs from Word, Excel, or images, or extract PDF text into Word or Excel when you need an editable file.",
  },
  {
    icon: <FiDownload aria-hidden="true" />,
    title: "Instant Download",
    description:
      "Download the generated file when processing finishes. Check the result before you send or print it.",
  },
  {
    icon: <FiClock aria-hidden="true" />,
    title: "No Registration",
    description:
      "No signup, login or installation is required. Start converting instantly for free.",
  },
];

const WhyChooseUs = () => {
  return (
    <section
      aria-labelledby="why-choose-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
            Why Choose QuickPDFHD
          </p>

          <h2
            id="why-choose-heading"
            className="mt-6 text-4xl font-bold text-slate-900"
          >
            Built for everyday document tasks
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            QuickPDFHD focuses on clear upload limits, in-memory processing, and
            dedicated pages for each conversion or PDF task.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div
                aria-hidden="true"
                className="mb-5 inline-flex rounded-xl bg-teal-100 p-4 text-teal-800"
              >
                {item.icon}
              </div>

              <h3 className="mb-3 text-xl font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="leading-7 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
