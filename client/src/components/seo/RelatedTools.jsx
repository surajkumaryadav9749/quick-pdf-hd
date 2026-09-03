import { Link } from "react-router-dom";
import { serviceCatalog } from "../../config/serviceCatalog";

const relatedPaths = {
  "/document-scanner": ["/jpg-to-pdf", "/png-to-pdf", "/resize-image", "/pdf-to-zip"],
  "/pdf-to-zip": ["/document-scanner", "/jpg-to-pdf", "/png-to-pdf"],
  "/resize-image": ["/jpg-to-pdf", "/png-to-pdf", "/webp-to-pdf"],
  "/jpg-to-pdf": ["/jpeg-to-pdf", "/document-scanner", "/resize-image", "/pdf-to-zip"],
  "/jpeg-to-pdf": ["/jpg-to-pdf", "/document-scanner", "/resize-image", "/pdf-to-zip"],
  "/png-to-pdf": ["/resize-image", "/document-scanner", "/webp-to-pdf", "/pdf-to-zip"],
  "/webp-to-pdf": ["/resize-image", "/png-to-pdf", "/jpg-to-pdf", "/document-scanner"],
};

const RelatedTools = ({ currentPath }) => {
  const paths = relatedPaths[currentPath] || serviceCatalog.map(({ path }) => path.split("#")[0]);
  const relatedTools = paths.map((path) => serviceCatalog.find((service) => service.path.split("#")[0] === path)).filter(Boolean);

  return <section aria-labelledby="related-tools-heading" className="bg-white py-16 sm:py-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">Explore QuickPDFHD</p>
        <h2 id="related-tools-heading" className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Related tools for your next step</h2>
        <p className="mt-4 text-lg leading-8 text-slate-600">Continue with a tool that fits the files or document task you are working on.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedTools.map((tool) => <Link key={tool.path} to={tool.path} className="rounded-2xl border border-slate-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
          <h3 className="text-xl font-semibold text-slate-900">{tool.name}</h3>
          <p className="mt-3 leading-7 text-slate-600">{tool.description}</p>
          <span className="mt-4 inline-block font-medium text-teal-800">Open tool →</span>
        </Link>)}
      </div>
    </div>
  </section>;
};

export default RelatedTools;
