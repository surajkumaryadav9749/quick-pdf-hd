import { Link } from "react-router-dom";

const tools = [
  {
    title: "JPG to PDF",
    description: "Convert JPG images to PDF online for free.",
    path: "/jpg-to-pdf",
  },
  {
    title: "PNG to PDF",
    description: "Convert PNG images into a PDF quickly and easily.",
    path: "/png-to-pdf",
  },
  {
    title: "JPEG to PDF",
    description: "Convert JPEG images to PDF without installing software.",
    path: "/jpeg-to-pdf",
  },
  {
    title: "WEBP to PDF",
    description: "Convert WEBP images into PDF files online.",
    path: "/webp-to-pdf",
  },
];

const RelatedTools = ({ currentPath }) => {
  const relatedTools = tools.filter((tool) => tool.path !== currentPath);

  return (
    <section
      aria-labelledby="related-tools-heading"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            PDF Tools
          </p>

          <h2
            id="related-tools-heading"
            className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl"
          >
            Related PDF Conversion Tools
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Choose a dedicated image-to-PDF converter for your preferred image
            format.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedTools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="rounded-2xl border border-slate-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-xl font-semibold text-slate-900">
                {tool.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {tool.description}
              </p>

              <span className="mt-4 inline-block font-medium text-blue-600">
                Convert now →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedTools;
