import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import Container from "../common/Container";

const faqs = [
  {
    question: "Is QuickPDFHD free?",
    answer:
      "Yes. You can use the tools in the browser without creating an account. Each tool still has file-size and page limits listed on its page.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. Open a tool, upload a supported file, and download the result.",
  },
  {
    question: "How are uploaded files handled?",
    answer:
      "Files are uploaded to the conversion server and processed in memory to generate the requested download. The application does not write uploaded files to its own disk or database.",
  },
  {
    question: "Which file types are supported?",
    answer:
      "Depending on the tool: DOC, DOCX, XLS, XLSX, PDF, JPG, JPEG, PNG, and WEBP. Resize Image accepts JPG, PNG, and WEBP.",
  },
  {
    question: "How do I contact you about a conversion issue?",
    answer:
      "Use the form on this page. Include the tool name, file type, and what happened so the report is easier to understand.",
  },
  {
    question: "Where can I see every tool?",
    answer:
      "Open the All Services page for the complete directory.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      aria-labelledby="contact-faq-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <Container>
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="inline-flex rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-800">
            Frequently Asked Questions
          </p>

          <h2
            id="contact-faq-heading"
            className="mt-5 text-4xl font-bold text-slate-900"
          >
            Have Questions?
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Find answers to the most commonly asked questions about QuickPDFHD.
          </p>
        </div>

        {/* Accordion */}
        <div className="mx-auto max-w-4xl space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            const answerId = `contact-faq-answer-${index}`;

            return (
              <article
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-slate-50"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {faq.question}
                  </h3>

                  {isOpen ? (
                    <FiChevronUp
                      aria-hidden="true"
                      size={22}
                      className="shrink-0 text-teal-800"
                    />
                  ) : (
                    <FiChevronDown
                      aria-hidden="true"
                      size={22}
                      className="shrink-0 text-slate-500"
                    />
                  )}
                </button>

                <div
                  id={answerId}
                  className={`transition-all duration-300 ${
                    isOpen
                      ? "max-h-96 px-6 pb-6"
                      : "max-h-0 overflow-hidden px-6"
                  }`}
                >
                  <p className="leading-7 text-slate-600">{faq.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
