import { Link, Navigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import SEO from "../../components/seo/SEO";
import RelatedTools from "../../components/seo/RelatedTools";
import { findGuide, getRelatedGuides, guideUrl, pdfGuides } from "../../config/pdfGuides";

const guideSchema = (guide, canonical) => {
  const graph = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://quickpdfhd.com/" },
        { "@type": "ListItem", position: 2, name: "PDF Guides", item: "https://quickpdfhd.com/pdf-guides" },
        { "@type": "ListItem", position: 3, name: guide.title, item: canonical },
      ],
    },
    {
      "@type": "Article",
      headline: guide.title,
      description: guide.description,
      mainEntityOfPage: canonical,
    },
  ];
  if (guide.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
};

export const PdfGuides = () => (
  <Layout>
    <SEO
      title="PDF Guides | QuickPDFHD"
      description="Practical guides for Word to PDF, PDF to Word and OCR, Excel conversion, split, merge, PDF to JPG, image PDFs, scanning, ZIP packaging, and image resizing."
      canonical="https://quickpdfhd.com/pdf-guides"
    />
    <main>
      <section className="bg-slate-50 py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <Link to="/" className="hover:text-teal-800">Home</Link> <span aria-hidden="true">/</span> PDF Guides
          </nav>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-teal-800">QuickPDFHD help</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">PDF guides for real file tasks</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Short instructions for tools that already exist on QuickPDFHD. For the full directory, see{" "}
            <Link to="/all-services" className="font-semibold text-teal-800 hover:underline">All Services</Link>.
          </p>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:grid-cols-2 sm:px-6">
          {pdfGuides.map((guide) => (
            <article key={guide.slug} className="rounded-2xl border border-slate-200 p-7 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                <Link to={`/pdf-guides/${guide.slug}`} className="hover:text-teal-800">{guide.title}</Link>
              </h2>
              <p className="mt-4 leading-7 text-slate-600">{guide.description}</p>
              <Link to={`/pdf-guides/${guide.slug}`} className="mt-5 inline-block font-semibold text-teal-800 hover:underline">Read guide →</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  </Layout>
);

export const PdfGuide = () => {
  const { slug } = useParams();
  const guide = findGuide(slug);
  if (!guide) return <Navigate to="/pdf-guides" replace />;
  const canonical = guideUrl(guide.slug);
  const related = getRelatedGuides(guide);

  return (
    <Layout>
      <SEO
        title={guide.seoTitle || `${guide.title} | QuickPDFHD`}
        description={guide.description}
        canonical={canonical}
        structuredData={guideSchema(guide, canonical)}
      />
      <main>
        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
              <Link to="/" className="hover:text-teal-800">Home</Link> <span aria-hidden="true">/</span>{" "}
              <Link to="/pdf-guides" className="hover:text-teal-800">PDF Guides</Link> <span aria-hidden="true">/</span> {guide.title}
            </nav>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{guide.title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{guide.intro}</p>
          </div>
        </section>
        <article className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            {guide.why && (
              <>
                <h2 className="text-3xl font-bold text-slate-900">When to use this</h2>
                <p className="mt-5 leading-8 text-slate-600">{guide.why}</p>
              </>
            )}
            {guide.formats && (
              <>
                <h2 className="mt-12 text-3xl font-bold text-slate-900">Formats and limits</h2>
                <p className="mt-5 leading-8 text-slate-600">{guide.formats}</p>
              </>
            )}
            <h2 className={`${guide.why || guide.formats ? "mt-12" : ""} text-3xl font-bold text-slate-900`}>Steps</h2>
            <ol className="mt-7 space-y-5">
              {guide.steps.map((step, index) => (
                <li key={step} className="rounded-2xl border border-slate-200 p-6 leading-7 text-slate-600">
                  <span className="mr-3 font-bold text-teal-800">{index + 1}.</span>{step}
                </li>
              ))}
            </ol>
            {guide.limitations?.length ? (
              <>
                <h2 className="mt-12 text-3xl font-bold text-slate-900">Limitations</h2>
                <ul className="mt-6 list-disc space-y-3 pl-6 leading-7 text-slate-600">
                  {guide.limitations.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </>
            ) : null}
            <h2 className="mt-12 text-3xl font-bold text-slate-900">Useful checks</h2>
            <ul className="mt-6 list-disc space-y-3 pl-6 leading-7 text-slate-600">
              {guide.tips.map((tip) => <li key={tip}>{tip}</li>)}
            </ul>
            {guide.problems?.length ? (
              <>
                <h2 className="mt-12 text-3xl font-bold text-slate-900">If something goes wrong</h2>
                <ul className="mt-6 list-disc space-y-3 pl-6 leading-7 text-slate-600">
                  {guide.problems.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </>
            ) : null}
            {guide.faqs?.length ? (
              <section className="mt-12">
                <h2 className="text-3xl font-bold text-slate-900">Questions</h2>
                <dl className="mt-6 space-y-4">
                  {guide.faqs.map((faq) => (
                    <div key={faq.question} className="rounded-2xl border border-slate-200 p-6">
                      <dt className="text-lg font-semibold text-slate-900">{faq.question}</dt>
                      <dd className="mt-3 leading-7 text-slate-600">{faq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}
            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="text-3xl font-bold text-slate-900">Related guides</h2>
                <ul className="mt-5 list-disc space-y-2 pl-6 leading-7 text-slate-600">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link to={`/pdf-guides/${item.slug}`} className="font-semibold text-teal-800 hover:underline">{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <div className="mt-12 rounded-2xl bg-teal-50 p-7">
              <h2 className="text-2xl font-bold text-slate-900">Ready to try it?</h2>
              <p className="mt-3 leading-7 text-slate-600">Open the {guide.toolName} workspace to complete this task.</p>
              <Link to={`${guide.tool}#upload`} className="mt-5 inline-block rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700">Open {guide.toolName}</Link>
              <p className="mt-4 text-sm text-slate-600">
                Or browse <Link to="/all-services" className="font-semibold text-teal-800 hover:underline">All Services</Link>.
              </p>
            </div>
          </div>
        </article>
        <RelatedTools currentPath={guide.tool} />
      </main>
    </Layout>
  );
};
