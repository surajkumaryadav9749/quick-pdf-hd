import { FiMail, FiClock, FiGlobe } from "react-icons/fi";

import Container from "../common/Container";

const contactInfo = [
  {
    id: 1,
    icon: <FiMail aria-hidden="true" />,
    title: "Email Support",
    value: "support@quickpdfhd.com",
    description: "Replies within 24 hours.",
  },
  {
    id: 2,
    icon: <FiClock aria-hidden="true" />,
    title: "Support Hours",
    value: "24 × 7 Available",
    description: "We're here whenever you need us.",
  },
  {
    id: 3,
    icon: <FiGlobe aria-hidden="true" />,
    title: "Worldwide",
    value: "Remote Support",
    description: "Helping users across the globe.",
  },
];

const ContactInfo = () => {
  return (
    <section
      aria-labelledby="contact-info-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <Container>
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Contact Information
          </p>

          <h2
            id="contact-info-heading"
            className="mt-5 text-4xl font-bold text-slate-900"
          >
            We're Always Ready to Help
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Whether you have a question, feedback, or need assistance, our team
            is always happy to hear from you.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {contactInfo.map((item) => (
            <article
              key={item.id}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl"
            >
              {/* Icon */}
              <div
                aria-hidden="true"
                className="mb-6 inline-flex rounded-2xl bg-blue-100 p-4 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white"
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-900">
                {item.title}
              </h3>

              {/* Value */}
              {item.title === "Email Support" ? (
                <a
                  href="mailto:support@quickpdfhd.com"
                  className="mt-3 block break-words text-lg font-semibold text-blue-600 hover:text-blue-700"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-3 break-words text-lg font-semibold text-blue-600">
                  {item.value}
                </p>
              )}

              {/* Description */}
              <p className="mt-4 leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ContactInfo;
