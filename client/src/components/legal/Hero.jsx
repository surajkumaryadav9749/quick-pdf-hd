import Container from "../common/Container";

const Hero = ({ badge, title, description }) => {
  return (
    <section
      aria-labelledby="legal-hero-heading"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-24"
    >
      {/* Background Blur */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl"
      />

      <Container>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Badge */}
          {badge && (
            <p className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-600">
              {badge}
            </p>
          )}

          {/* H1 */}
          <h1
            id="legal-hero-heading"
            className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-6xl"
          >
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
