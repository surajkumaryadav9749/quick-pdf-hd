const ArticleList = ({ items }) => (
  <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-slate-600">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const ToolArticleBody = ({ explainer }) => {
  if (!explainer) return null;

  return (
    <>
      {explainer.what?.length ? (
        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-slate-900">{explainer.whatTitle}</h2>
            <div className="mt-6 max-w-3xl space-y-5">
              {explainer.what.map((paragraph, index) => (
                <p key={`${explainer.whatTitle}-${index}`} className="leading-8 text-slate-600">{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {explainer.when?.length ? (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-slate-900">{explainer.whenTitle}</h2>
            {explainer.whenIntro ? <p className="mt-5 max-w-3xl leading-8 text-slate-600">{explainer.whenIntro}</p> : null}
            <ArticleList items={explainer.when} />
          </div>
        </section>
      ) : null}

      {explainer.limits?.length ? (
        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-slate-900">{explainer.limitsTitle}</h2>
            <ArticleList items={explainer.limits} />
          </div>
        </section>
      ) : null}

      {explainer.know?.length ? (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-slate-900">{explainer.knowTitle}</h2>
            <ArticleList items={explainer.know} />
          </div>
        </section>
      ) : null}

      {explainer.alternatives?.length ? (
        <section className="bg-slate-50 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-slate-900">{explainer.alternativesTitle}</h2>
            <p className="mt-5 max-w-3xl leading-8 text-slate-600">{explainer.alternativesIntro}</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {explainer.alternatives.map((item) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default ToolArticleBody;
