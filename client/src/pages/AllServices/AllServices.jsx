import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import { serviceCatalog, serviceCategories } from "../../config/serviceCatalog";

const AllServices = () => (
  <Layout>
    <SEO
      title="All PDF & Image Tools Online | QuickPDFHD"
      description="Explore QuickPDFHD's available online PDF and image tools, including image-to-PDF conversion, document scanning, PDF to ZIP, and image resizing."
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
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500"><Link to="/" className="hover:text-blue-600">Home</Link> <span aria-hidden="true">/</span> All Services</nav>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">All PDF &amp; Image Tools</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">Explore QuickPDFHD tools for common document and image tasks. Choose a service below to open its dedicated tool page.</p>
        </div>
      </section>

      {serviceCategories.map((category) => {
        const services = serviceCatalog.filter((service) => service.category === category);
        const sectionClass = category === "PDF Tools" ? "bg-white py-16 sm:py-20" : "bg-slate-50 py-16 sm:py-20";

        return (
          <section key={category} aria-labelledby={category.replace(" ", "-").toLowerCase()} className={sectionClass}>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">QuickPDFHD services</p>
                <h2 id={category.replace(" ", "-").toLowerCase()} className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">{category}</h2>
                <p className="mt-3 leading-7 text-slate-600">{category === "PDF Tools" ? "Create, organize, and package PDF documents from images and document photos." : "Adjust image dimensions and prepare image files for the size you need."}</p>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {services.map((service) => (
                  <Link key={service.path} to={service.path} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md">
                    <h3 className="text-xl font-semibold text-slate-900">{service.name}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{service.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-medium text-blue-600">Open tool <FiArrowRight aria-hidden="true" /></span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-white py-16 sm:py-20"><div className="mx-auto max-w-4xl px-4 text-center sm:px-6"><p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Choose the right tool</p><h2 className="mt-3 text-3xl font-bold text-slate-900">Start with the task you need to complete</h2><p className="mt-4 leading-8 text-slate-600">Use an image-to-PDF tool to combine images into a document, Document Scanner for document photos, PDF to ZIP to package several PDFs together, and Resize Image when you need different image dimensions.</p></div></section>
    </main>
  </Layout>
);

export default AllServices;
