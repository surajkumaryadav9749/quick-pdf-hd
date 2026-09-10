import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { homeFaqs } from "../../config/homeFaqs";

const faqs = homeFaqs;

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
