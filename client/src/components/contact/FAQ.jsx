import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

import Container from "../common/Container";

const faqs = [
  {
    question: "Is QuickPDFHD completely free?",
    answer:
      "Yes. QuickPDFHD is completely free to use. You can convert your images into PDF without any hidden charges or subscriptions.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. You don't need to register or log in. Simply upload your images and convert them instantly.",
  },
  {
    question: "Are my uploaded images secure?",
    answer:
      "Absolutely. Your images are processed securely and are not stored permanently on our servers.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "Currently QuickPDFHD supports JPG, JPEG, PNG and WEBP image formats.",
  },
  {
    question: "Can I rearrange images before converting?",
    answer:
      "Yes. You can drag and drop images to change their order before generating the PDF.",
  },
  {
    question: "Is there any upload limit?",
    answer:
      "Yes. Currently you can upload up to 20 images with a maximum size of 10 MB per image.",
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
          <p className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
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
                      className="shrink-0 text-blue-600"
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
                      ? "max-h-40 px-6 pb-6"
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
