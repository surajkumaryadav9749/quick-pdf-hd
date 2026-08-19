import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How do I convert JPG to PDF online?",
    answer:
      "Add one or more JPG files, check their order in the preview, select Convert, and download the generated PDF.",
  },
  {
    question: "Can I combine several JPG images into one PDF?",
    answer:
      "Yes. You can upload up to 20 JPG images and arrange them in the order you want before creating one PDF.",
  },
  {
    question: "What JPG files can I upload?",
    answer:
      "This tool accepts .jpg and .jpeg image files. Each image can be up to 10 MB.",
  },
  {
    question: "Do I need an account or software?",
    answer:
      "No. The converter works in a web browser and does not require an account, download, or browser extension.",
  },
  {
    question: "Are my images stored permanently?",
    answer:
      "No. Files are processed only to create your PDF and are not stored permanently. Read our Privacy Policy for more details.",
  },
];

const JpgToPdfContent = () => {
  return (
    <>
      <section
        aria-labelledby="jpg-converter-guide-heading"
        className="bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              JPG to PDF guide
            </p>
            <h2
              id="jpg-converter-guide-heading"
              className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              Create a PDF from JPG images in four steps
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              QuickPDFHD lets you combine photos, scanned pages, and other JPG
              images into a single PDF directly in your browser.
            </p>
          </div>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["1", "Upload JPG files", "Drag files into the upload area or choose them from your device."],
              ["2", "Review the order", "Move images into the sequence you want in the final document."],
              ["3", "Convert to PDF", "Select the convert button to create one PDF from your images."],
              ["4", "Download the PDF", "Save the finished PDF to your device when the conversion is complete."],
            ].map(([number, title, description]) => (
              <li
                key={number}
                className="list-none rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <span className="text-sm font-bold text-blue-600">Step {number}</span>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="jpg-details-heading" className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 id="jpg-details-heading" className="text-2xl font-bold text-slate-900">
              Supported JPG files and limits
            </h2>
            <ul className="mt-5 space-y-3 leading-7 text-slate-600">
              <li><strong className="text-slate-900">Accepted formats:</strong> JPG and JPEG (.jpg, .jpeg).</li>
              <li><strong className="text-slate-900">Maximum files:</strong> 20 images in one conversion.</li>
              <li><strong className="text-slate-900">Maximum size:</strong> 10 MB per image.</li>
              <li>You can reorder uploaded images before creating the PDF.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Your file privacy</h2>
            <p className="mt-5 leading-7 text-slate-600">
              Your images are processed to generate the PDF and are not stored
              permanently. Use this tool only for files you have permission to
              handle. For full details, see our{" "}
              <Link to="/privacy-policy" className="font-semibold text-blue-600 hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </article>
        </div>
      </section>

      <section aria-labelledby="jpg-faq-heading" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">FAQs</p>
          <h2 id="jpg-faq-heading" className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            JPG to PDF converter questions
          </h2>
          <dl className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-slate-200 p-6">
                <dt className="text-lg font-semibold text-slate-900">{faq.question}</dt>
                <dd className="mt-3 leading-7 text-slate-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 leading-7 text-slate-600">
            Need a different image format? Try our{" "}
            <Link to="/png-to-pdf" className="font-semibold text-blue-600 hover:underline">PNG to PDF</Link>,{" "}
            <Link to="/jpeg-to-pdf" className="font-semibold text-blue-600 hover:underline">JPEG to PDF</Link>, or{" "}
            <Link to="/webp-to-pdf" className="font-semibold text-blue-600 hover:underline">WEBP to PDF</Link> tool.
          </p>
        </div>
      </section>
    </>
  );
};

export default JpgToPdfContent;
