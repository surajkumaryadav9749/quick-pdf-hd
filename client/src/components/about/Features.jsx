import {
  FiCheckCircle,
  FiImage,
  FiMove,
  FiDownload,
  FiFileText,
  FiShield,
  FiSmartphone,
  FiZap,
} from "react-icons/fi";

const features = [
  {
    icon: <FiImage aria-hidden="true" />,
    title: "Multiple Image Upload",
    description: "Upload multiple JPG, PNG and WEBP images at once.",
  },
  {
    icon: <FiMove aria-hidden="true" />,
    title: "Drag & Drop Reordering",
    description: "Arrange images before converting them into a PDF.",
  },
  {
    icon: <FiFileText aria-hidden="true" />,
    title: "High Quality PDF",
    description: "Generate sharp and professional PDF documents.",
  },
  {
    icon: <FiDownload aria-hidden="true" />,
    title: "Instant Download",
    description: "Download your PDF immediately after conversion.",
  },
  {
    icon: <FiShield aria-hidden="true" />,
    title: "Secure Processing",
    description: "Your images remain private and are processed securely.",
  },
  {
    icon: <FiZap aria-hidden="true" />,
    title: "Fast Conversion",
    description: "Convert images to PDF in just a few seconds.",
  },
  {
    icon: <FiSmartphone aria-hidden="true" />,
    title: "Works on All Devices",
    description: "Compatible with desktop, tablet and mobile devices.",
  },
  {
    icon: <FiCheckCircle aria-hidden="true" />,
    title: "100% Free",
    description: "No registration, no watermark and no hidden charges.",
  },
];

const Features = () => {
  return (
    <section
      aria-labelledby="features-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:items-center">
        {/* Left Side */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Powerful Features
          </p>

          <h2
            id="features-heading"
            className="mt-6 text-4xl font-bold text-slate-900"
          >
            Everything You Need to Convert Images into PDF
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            QuickPDFHD provides the essential tools required for a fast, secure
            and hassle-free Image to PDF conversion experience.
          </p>

          <div className="mt-10 space-y-6">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="flex gap-4 rounded-xl border border-slate-200 p-5 transition-all duration-300 hover:border-blue-500 hover:shadow-lg"
              >
                <div
                  aria-hidden="true"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600"
                >
                  {feature.icon}
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-slate-600">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <aside aria-label="QuickPDFHD benefits" className="flex justify-center">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-600 to-sky-500 p-10 text-white shadow-2xl">
            <h3 className="text-3xl font-bold">QuickPDFHD</h3>

            <p className="mt-4 text-blue-100">
              Convert images into high-quality PDFs with a clean, modern and
              fast online experience.
            </p>

            <ul className="mt-10 space-y-4">
              <li className="rounded-xl bg-white/10 p-4">
                Unlimited Conversions
              </li>

              <li className="rounded-xl bg-white/10 p-4">Fast Processing</li>

              <li className="rounded-xl bg-white/10 p-4">Privacy Protected</li>

              <li className="rounded-xl bg-white/10 p-4">
                High Quality Output
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default Features;
