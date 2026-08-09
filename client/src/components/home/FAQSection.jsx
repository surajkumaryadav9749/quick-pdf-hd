import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  {
    question: "Is QuickPDFHD completely free to use?",
    answer:
      "Yes. QuickPDFHD is completely free. You can convert your JPG, PNG and WEBP images into PDF without creating an account or paying any fees.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "QuickPDFHD currently supports JPG, JPEG, PNG and WEBP image formats for PDF conversion.",
  },
  {
    question: "Are my uploaded images stored on your server?",
    answer:
      "No. Your privacy is important to us. Uploaded files are processed securely and are not stored permanently on our servers.",
  },
  {
    question: "Can I upload multiple images?",
    answer:
      "Yes. You can upload multiple images and combine them into a single PDF document while maintaining their order.",
  },
  {
    question: "Do I need to install any software?",
    answer:
      "No. QuickPDFHD works entirely in your browser. There is no need to install any software or browser extensions.",
  },
  {
    question: "How do I convert images to PDF?",
    answer:
      "Simply upload your images, review their order, click the Convert button and download your PDF instantly.",
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
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Frequently Asked Questions
          </p>

          <h2
            id="faq-heading"
            className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl"
          >
            Image to PDF Converter FAQs
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Find answers to the most common questions about converting images
            into PDF files using QuickPDFHD.
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
                      className="shrink-0 text-xl text-blue-600"
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
