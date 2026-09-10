import { FiTarget, FiEye, FiHeart } from "react-icons/fi";

const values = [
  {
    icon: <FiTarget aria-hidden="true" />,
    title: "Our Mission",
    description:
      "Our mission is to keep common PDF and image tasks available in a browser: convert files, organize PDFs, and prepare images without installing extra software.",
  },
  {
    icon: <FiEye aria-hidden="true" />,
    title: "Our Vision",
    description:
      "We aim to keep QuickPDFHD useful, clearly documented, and honest about what each tool can and cannot do.",
  },
  {
    icon: <FiHeart aria-hidden="true" />,
    title: "Our Values",
    description:
      "Clear limits, in-memory file processing, and straightforward pages are the priorities. Features are added only when they help a real conversion or document task.",
  },
];

const Mission = () => {
  return (
    <section
      aria-labelledby="mission-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="inline-flex rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-800">
            Our Purpose
          </p>

          <h2
            id="mission-heading"
            className="mt-6 text-4xl font-bold text-slate-900"
          >
            Built Around Simplicity, Speed & Trust
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            QuickPDFHD is designed for everyday file tasks. Whether you are converting a homework sheet, merging forms, or turning photos into a PDF, each tool page explains the formats and limits that apply.
          </p>
        </div>

        {/* Values */}
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-teal-500 hover:shadow-xl"
            >
              <div
                aria-hidden="true"
                className="mb-6 inline-flex rounded-2xl bg-teal-100 p-5 text-teal-800"
              >
                {item.icon}
              </div>

              <h3 className="mb-4 text-2xl font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="leading-8 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
