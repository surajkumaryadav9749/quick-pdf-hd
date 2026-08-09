import { FiTarget, FiEye, FiHeart } from "react-icons/fi";

const values = [
  {
    icon: <FiTarget aria-hidden="true" />,
    title: "Our Mission",
    description:
      "Our mission is to make PDF conversion simple, fast and accessible for everyone. We believe creating professional PDFs should never require expensive software or complicated steps.",
  },
  {
    icon: <FiEye aria-hidden="true" />,
    title: "Our Vision",
    description:
      "We aim to become a trusted platform offering fast, secure and user-friendly PDF tools that help students, professionals and businesses work more efficiently.",
  },
  {
    icon: <FiHeart aria-hidden="true" />,
    title: "Our Values",
    description:
      "Privacy, simplicity, performance and reliability are the foundation of QuickPDFHD. Every feature is built with the user experience in mind.",
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
          <p className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
            Our Purpose
          </p>

          <h2
            id="mission-heading"
            className="mt-6 text-4xl font-bold text-slate-900"
          >
            Built Around Simplicity, Speed & Trust
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            QuickPDFHD is designed to make document conversion effortless.
            Whether you're converting homework, business documents or personal
            files, our goal is to provide a secure and seamless experience for
            every user.
          </p>
        </div>

        {/* Values */}
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl"
            >
              <div
                aria-hidden="true"
                className="mb-6 inline-flex rounded-2xl bg-blue-100 p-5 text-blue-600"
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
