import { Link } from "react-router-dom";
import ToolCard, { toolCardGridClass } from "../common/ToolCard";
import { iconForService } from "../common/toolIcons";
import { serviceCatalog } from "../../config/serviceCatalog";

const sections = [
  {
    id: "services",
    title: "PDF and document tools",
    intro: "Convert Word and Excel files, extract text or tables, split or merge PDFs, and render pages as JPG images.",
    group: "document",
  },
  {
    title: "Image tools",
    intro: "Turn JPG, JPEG, PNG, or WEBP files into a PDF, or resize a batch of images.",
    group: "image",
    className: "bg-slate-50",
  },
  {
    title: "Scanner and file utilities",
    intro: "Clean photographed pages into a PDF, or package several PDF files into one ZIP archive.",
    group: "utility",
  },
];

const ImageToPdfTools = () => (
  <>
    {sections.map((section, index) => {
      const tools = serviceCatalog.filter((service) => service.group === section.group);
      return (
        <section
          key={section.title}
          id={section.id}
          className={`scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8 ${section.className || (index % 2 === 0 ? "bg-white" : "bg-slate-50")}`}
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{section.title}</h2>
                <p className="mt-2 max-w-3xl text-slate-600">{section.intro}</p>
              </div>
              {index === 0 && (
                <Link to="/all-services" className="inline-flex items-center gap-2 font-semibold text-teal-800 transition hover:text-teal-600">
                  View all tools <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
            <div className={toolCardGridClass}>
              {tools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  to={tool.path}
                  title={tool.name}
                  description={tool.description}
                  icon={iconForService(tool.icon)}
                />
              ))}
            </div>
          </div>
        </section>
      );
    })}
  </>
);

export default ImageToPdfTools;
