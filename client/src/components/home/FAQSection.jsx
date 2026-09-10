import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  {
    question: "Is QuickPDFHD free to use?",
    answer:
      "Yes. The tools on this site can be used in the browser without creating an account. Each tool still has file-size and page limits, which are shown on that tool page.",
  },
  {
    question: "Which files can I process?",
    answer:
      "Available tools cover Word (DOC/DOCX), Excel (XLS/XLSX), PDF, JPG, JPEG, PNG, and WEBP, depending on the page you open. Resize Image accepts JPG, PNG, and WEBP.",
  },
  {
    question: "How are uploaded files handled?",
    answer:
      "Files are uploaded to the conversion server and processed in memory to generate your download. The application does not write uploaded files to its own disk or database. Hosting logs, email, analytics, and advertising providers can still receive other information, as described in the Privacy Policy.",
  },
  {
    question: "Do I need to install software?",
    answer:
      "No extra app or browser extension is required. Open the tool page, upload a supported file, and download the result.",
  },
  {
    question: "Can I convert a scanned PDF to Word?",
    answer:
      "Yes. PDF to Word includes an OCR option for scanned or image-only pages, with English, Hindi, or English + Hindi. Accuracy depends on scan quality.",
  },
  {
    question: "Where can I see every tool?",
    answer:
      "Open All Services for the full directory, or read the PDF Guides for step-by-step examples of common tasks.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">
            Frequently Asked Questions
          </p>

          <h2
            id="faq-heading"
            className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl"
          >
            Common questions about QuickPDFHD
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Short answers about accounts, file types, processing, and where to find each tool.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <article
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Question Button */}
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-slate-50"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {faq.question}
                  </h3>

                  {isOpen ? (
                    <FiChevronUp
                      aria-hidden="true"
                      className="shrink-0 text-xl text-teal-800"
                    />
                  ) : (
                    <FiChevronDown
                      aria-hidden="true"
                      className="shrink-0 text-xl text-slate-500"
                    />
                  )}
                </button>

                {/* Answer */}
                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    className="border-t border-slate-200 px-6 py-5"
                  >
                    <p className="leading-7 text-slate-600">{faq.answer}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
