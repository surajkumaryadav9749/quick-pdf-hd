import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import SEO from "../seo/SEO";
import RelatedTools from "../seo/RelatedTools";
import DocumentToolWorkspace from "../filetools/DocumentToolWorkspace";
import { serviceCatalog } from "../../config/serviceCatalog";

const structuredDataFor = (tool) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: `QuickPDFHD ${tool.name}`,
      url: tool.canonical,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web",
      description: tool.description,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://quickpdfhd.com/" },
        { "@type": "ListItem", position: 2, name: tool.name, item: tool.canonical },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: tool.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
});

const DocumentToolPage = ({ tool }) => {
  const relatedNames = tool.related
    .map((path) => serviceCatalog.find((service) => service.path.split("#")[0] === path))
    .filter(Boolean);

  return (
    <Layout>
      <SEO title={tool.title} description={tool.description} canonical={tool.canonical} robots="index,follow" structuredData={structuredDataFor(tool)} />
      <main>
        <section className="bg-slate-50 pb-10 pt-16 text-center sm:pt-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
              <Link to="/" className="hover:text-teal-800">Home</Link> <span aria-hidden="true">/</span>{" "}
              <Link to="/all-services" className="hover:text-teal-800">All Services</Link> <span aria-hidden="true">/</span> {tool.name}
            </nav>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-teal-800">{tool.badge}</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{tool.heading}</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">{tool.intro}</p>
          </div>
        </section>

        <DocumentToolWorkspace tool={tool} />

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">How to use</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">{tool.howTitle}</h2>
            <p className="mt-4 max-w-3xl leading-8 text-slate-600">{tool.howIntro}</p>
            <ol className="mt-8 grid gap-5 md:grid-cols-3">
              {tool.steps.map((step, index) => (
                <li key={step.title} className="list-none rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <span className="font-bold text-teal-800">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-slate-900">Key features</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {tool.features.map((feature) => (
                <article key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2 sm:px-6">
            <article className="rounded-2xl border border-slate-200 p-7">
              <h2 className="text-2xl font-bold text-slate-900">Supported file formats</h2>
              <p className="mt-4 leading-7 text-slate-600">This tool accepts {tool.formatsLabel}. Files over {tool.maxSizeLabel}{tool.multiple ? " per file" : ""} are rejected before processing.</p>
            </article>
            <article className="rounded-2xl border border-slate-200 p-7">
              <h2 className="text-2xl font-bold text-slate-900">File handling</h2>
              <p className="mt-4 leading-7 text-slate-600">{tool.privacy}</p>
              <Link to="/privacy-policy" className="mt-5 inline-block font-semibold text-teal-800 hover:underline">Read the Privacy Policy</Link>
            </article>
          </div>
        </section>

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-slate-900">{tool.explanationTitle}</h2>
            <div className="mt-6 space-y-5">
              {tool.explanation.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="max-w-3xl leading-8 text-slate-600">{paragraph}</p>
              ))}
            </div>
            <h3 className="mt-10 text-2xl font-bold text-slate-900">{tool.usesTitle}</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
              {tool.uses.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <h3 className="mt-10 text-2xl font-bold text-slate-900">{tool.tipsTitle}</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
              {tool.tips.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-800">FAQs</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">{tool.name} questions</h2>
            <dl className="mt-8 space-y-4">
              {tool.faqs.map((faq) => (
                <div key={faq.question} className="rounded-2xl border border-slate-200 p-6">
                  <dt className="text-lg font-semibold text-slate-900">{faq.question}</dt>
                  <dd className="mt-3 leading-7 text-slate-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
            {relatedNames.length > 0 && (
              <p className="mt-10 leading-7 text-slate-600">
                Related tools:{" "}
                {relatedNames.map((item, index) => (
                  <span key={item.path}>
                    {index > 0 && ", "}
                    <Link to={item.path.split("#")[0]} className="font-semibold text-teal-800 hover:underline">{item.name}</Link>
                  </span>
                ))}
                .
              </p>
            )}
          </div>
        </section>

        <RelatedTools currentPath={tool.path} />

        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-3xl font-bold text-slate-900">Ready to use {tool.name}?</h2>
            <p className="mt-4 leading-8 text-slate-600">Return to the upload area and convert your file when you are ready.</p>
            <a href="#upload" className="mt-6 inline-block rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700">{tool.actionLabel}</a>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default DocumentToolPage;
