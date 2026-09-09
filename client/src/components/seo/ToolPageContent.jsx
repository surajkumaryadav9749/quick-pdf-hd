import { Link } from "react-router-dom";

const relatedTools = [
  { name: "JPG to PDF", path: "/jpg-to-pdf" },
  { name: "PDF to JPG", path: "/pdf-to-jpg" },
  { name: "Merge PDF", path: "/merge-pdf" },
  { name: "Word to PDF", path: "/word-to-pdf" },
  { name: "PNG to PDF", path: "/png-to-pdf" },
  { name: "JPEG to PDF", path: "/jpeg-to-pdf" },
  { name: "WEBP to PDF", path: "/webp-to-pdf" },
  { name: "Document Scanner", path: "/document-scanner" },
  { name: "Resize Image", path: "/resize-image" },
  { name: "PDF to ZIP", path: "/pdf-to-zip" },
];

const ToolPageContent = ({ tool }) => {
  const links = relatedTools.filter((relatedTool) => relatedTool.path !== tool.path);

  return (
    <>
      <section aria-labelledby={`${tool.id}-guide`} className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">How this tool works</p>
            <h2 id={`${tool.id}-guide`} className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              {tool.guideTitle}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{tool.introduction}</p>
          </div>

          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tool.steps.map((step, index) => (
              <li key={step.title} className="list-none rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <span className="text-sm font-bold text-teal-800">Step {index + 1}</span>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby={`${tool.id}-tips`} className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 id={`${tool.id}-tips`} className="text-2xl font-bold text-slate-900">{tool.shortName}-specific tips</h2>
            <p className="mt-4 leading-7 text-slate-600">{tool.formatNotes}</p>
            <ul className="mt-5 list-disc space-y-2 pl-5 leading-7 text-slate-600">{tool.tips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">If the result is not what you expected</h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 leading-7 text-slate-600">{tool.problems.map((problem) => <li key={problem}>{problem}</li>)}</ul>
          </article>
        </div>
      </section>

      <section aria-labelledby={`${tool.id}-batch`} className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 id={`${tool.id}-batch`} className="text-2xl font-bold text-slate-900">Convert multiple {tool.shortName} images into one PDF</h2>
            <p className="mt-4 leading-7 text-slate-600">Upload up to 20 {tool.shortName} files in one conversion, including by drag and drop. Review the previews, arrange the page order, then create one PDF instead of sharing separate image files.</p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">{tool.shortName} to PDF file details</h2>
            <p className="mt-4 leading-7 text-slate-600">This converter accepts {tool.formats} files up to 10 MB each. It is useful for turning photos, screenshots, or saved images into an ordered PDF document for printing, sharing, or uploading.</p>
          </article>
        </div>
      </section>

      <section aria-labelledby={`${tool.id}-uses`} className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 id={`${tool.id}-uses`} className="text-2xl font-bold text-slate-900">When {tool.name} is useful</h2>
            <p className="mt-4 leading-7 text-slate-600">{tool.useCaseIntro}</p>
            <ul className="mt-5 list-disc space-y-2 pl-5 leading-7 text-slate-600">
              {tool.useCases.map((useCase) => <li key={useCase}>{useCase}</li>)}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">File handling and limits</h2>
            <p className="mt-4 leading-7 text-slate-600">
              Files are uploaded to QuickPDFHD&apos;s conversion server and held in memory while the PDF is generated. The application does not write uploaded files to its own disk or database. Use the tool only for files you are allowed to process.
            </p>
            <ul className="mt-5 list-disc space-y-2 pl-5 leading-7 text-slate-600">
              <li>Accepted format: {tool.formats}.</li>
              <li>Up to 20 images per conversion.</li>
              <li>Up to 10 MB per image.</li>
              <li>Images can be reordered before conversion.</li>
            </ul>
            <Link to="/privacy-policy" className="mt-5 inline-block font-semibold text-teal-800 hover:underline">Read the Privacy Policy</Link>
          </article>
        </div>
      </section>

      <section aria-labelledby={`${tool.id}-faq`} className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">FAQs</p>
          <h2 id={`${tool.id}-faq`} className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{tool.name} questions</h2>
          <dl className="mt-8 space-y-4">
            {tool.faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl border border-slate-200 p-6">
                <dt className="text-lg font-semibold text-slate-900">{faq.question}</dt>
                <dd className="mt-3 leading-7 text-slate-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 leading-7 text-slate-600">
            Looking for another format? {links.map((link, index) => (
              <span key={link.path}>{index > 0 && ", "}<Link to={link.path} className="font-semibold text-teal-800 hover:underline">{link.name}</Link></span>
            ))}.
          </p>
        </div>
      </section>
    </>
  );
};

export default ToolPageContent;
