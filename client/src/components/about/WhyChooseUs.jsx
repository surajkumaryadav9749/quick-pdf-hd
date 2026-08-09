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
      "Convert your images into PDF documents within seconds without unnecessary waiting.",
  },
  {
    icon: <FiLock aria-hidden="true" />,
    title: "Privacy First",
    description:
      "Your files are processed securely and are never stored permanently on our servers.",
  },
  {
    icon: <FiSmartphone aria-hidden="true" />,
    title: "Works on Every Device",
    description:
      "Use QuickPDFHD on desktop, laptop, tablet or mobile directly from your browser.",
  },
  {
    icon: <FiFileText aria-hidden="true" />,
    title: "High Quality PDF",
    description:
      "Generate sharp and professional PDF documents while preserving image quality.",
  },
  {
    icon: <FiDownload aria-hidden="true" />,
    title: "Instant Download",
    description:
      "Your PDF is ready immediately after conversion with a simple download.",
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
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Why Choose QuickPDFHD
          </p>

          <h2
            id="why-choose-heading"
            className="mt-6 text-4xl font-bold text-slate-900"
          >
            Built for Speed, Quality & Simplicity
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            QuickPDFHD combines performance, security and simplicity to provide
            a fast and reliable online Image to PDF conversion experience.
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
                className="mb-5 inline-flex rounded-xl bg-blue-100 p-4 text-blue-600"
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
