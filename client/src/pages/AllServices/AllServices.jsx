import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import ToolCard, { toolCardGridClass } from "../../components/common/ToolCard";
import { iconForService } from "../../components/common/toolIcons";
import { serviceCatalog, serviceCategories } from "../../config/serviceCatalog";

const AllServices = () => (
  <Layout>
    <SEO
      title="All PDF & Image Tools Online | QuickPDFHD"
      description="Explore QuickPDFHD's available online PDF and image tools, including Word and Excel conversion, split and merge, PDF to JPG, image-to-PDF, scanning, ZIP packaging, and image resizing."
      canonical="https://quickpdfhd.com/all-services"
      structuredData={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://quickpdfhd.com/" },
          { "@type": "ListItem", position: 2, name: "All Services", item: "https://quickpdfhd.com/all-services" },
        ],
      }}
    />
    <main>
      <section className="bg-slate-50 pb-12 pt-16 text-center sm:pt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500"><Link to="/" className="hover:text-teal-800">Home</Link> <span aria-hidden="true">/</span> All Services</nav>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">All PDF &amp; Image Tools</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">Explore QuickPDFHD tools for common document and image tasks. Choose a service below to open its dedicated tool page.</p>
        </div>
      </section>

      {serviceCategories.map((category) => {
        const services = serviceCatalog.filter((service) => service.category === category);
        const sectionClass = category === "PDF Tools" ? "bg-white py-16 sm:py-20" : "bg-slate-50 py-16 sm:py-20";

        return (
          <section key={category} aria-labelledby={category.replace(" ", "-").toLowerCase()} className={sectionClass}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">QuickPDFHD services</p>
                <h2 id={category.replace(" ", "-").toLowerCase()} className="mt-3 scroll-mt-24 text-3xl font-bold text-slate-900 sm:text-4xl">{category}</h2>
                <p className="mt-3 leading-7 text-slate-600">{category === "PDF Tools" ? "Convert office files, extract PDF text, split or merge PDFs, render pages as images, scan document photos, and package PDFs into a ZIP file." : "Create PDFs from JPG, JPEG, PNG, or WEBP images, and resize JPG, PNG, and WEBP files."}</p>
              </div>

              <div className={toolCardGridClass}>
                {services.map((service) => (
                  <ToolCard
                    key={service.path}
                    to={service.path}
                    title={service.name}
                    description={service.description}
                    icon={iconForService(service.icon)}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-white py-16 sm:py-20"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6"><p className="text-sm font-semibold uppercase tracking-wide text-teal-800">Choose the right tool</p><h2 className="mt-3 text-3xl font-bold text-slate-900">Start with the task you need to complete</h2><p className="mt-4 leading-8 text-slate-600">Convert Word or Excel files to PDF, extract text or tables, split and merge PDFs, turn pages into JPG images, or use the existing image-to-PDF, scanner, ZIP, and resize tools.</p></div></section>
    </main>
  </Layout>
);

export default AllServices;
