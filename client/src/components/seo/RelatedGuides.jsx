import { Link } from "react-router-dom";
import { getGuidesForTool } from "../../config/pdfGuides";

const RelatedGuides = ({ toolPath }) => {
  const guides = getGuidesForTool(toolPath);
  if (!guides.length) return null;

  return (
    <section aria-labelledby="related-guides-heading" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">Learn the workflow</p>
        <h2 id="related-guides-heading" className="mt-3 text-3xl font-bold text-slate-900">Related PDF guides</h2>
        <ul className="mt-6 space-y-3">
          {guides.map((guide) => (
            <li key={guide.slug}>
              <Link to={`/pdf-guides/${guide.slug}`} className="font-semibold text-teal-800 hover:underline">{guide.title}</Link>
              <span className="text-slate-600"> — {guide.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RelatedGuides;
