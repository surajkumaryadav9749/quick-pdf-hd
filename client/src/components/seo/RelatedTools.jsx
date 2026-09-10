import { Link } from "react-router-dom";
import ToolCard, { toolCardGridClass } from "../common/ToolCard";
import { iconForService } from "../common/toolIcons";
import { getRelatedServices, serviceCatalog } from "../../config/serviceCatalog";

const RelatedTools = ({ currentPath }) => {
  const relatedTools = currentPath
    ? getRelatedServices(currentPath, 5)
    : serviceCatalog.filter((service) => ["word-to-pdf", "pdf-to-word", "merge-pdf", "split-pdf", "jpg-to-pdf", "document-scanner"].includes(service.id));

  if (!relatedTools.length) return null;

  return (
    <section aria-labelledby="related-tools-heading" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">Explore QuickPDFHD</p>
          <h2 id="related-tools-heading" className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            {currentPath ? "Related tools for your next step" : "More tools and guides"}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {currentPath
              ? "Continue with a tool that fits the files or document task you are working on."
              : "Open a related tool, browse the full directory, or read a short PDF guide."}
          </p>
        </div>
        <div className={toolCardGridClass}>
          {relatedTools.map((tool) => (
            <ToolCard
              key={tool.path}
              to={tool.path}
              title={tool.name}
              description={tool.description}
              icon={iconForService(tool.icon)}
            />
          ))}
        </div>
        {!currentPath && (
          <p className="mt-8 text-center text-slate-600">
            See the <Link to="/all-services" className="font-semibold text-teal-800 hover:underline">All Services</Link> directory or the{" "}
            <Link to="/pdf-guides" className="font-semibold text-teal-800 hover:underline">PDF Guides</Link>.
          </p>
        )}
      </div>
    </section>
  );
};

export default RelatedTools;
