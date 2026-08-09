import Container from "../common/Container";

const LegalSection = ({ title, children }) => {
  return (
    <section
      aria-labelledby={`legal-section-${title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}`}
      className="bg-white py-10"
    >
      <Container>
        <div className="mx-auto max-w-4xl">
          {/* Section Heading */}
          <h2
            id={`legal-section-${title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}`}
            className="mb-6 text-3xl font-bold text-slate-900"
          >
            {title}
          </h2>

          {/* Content */}
          <div className="space-y-5 leading-8 text-slate-600">{children}</div>
        </div>
      </Container>
    </section>
  );
};

export default LegalSection;
