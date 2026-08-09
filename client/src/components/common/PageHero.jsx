import Container from "./Container";
import Button from "./Button";

const PageHero = ({ badge, title, subtitle, buttonText, buttonLink = "/" }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-slate-100 py-24">
      {/* Background Blur */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

      <Container>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Badge */}
          {badge && (
            <span className="inline-flex rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-600">
              {badge}
            </span>
          )}

          {/* Heading */}
          <h1 className="mt-6 text-5xl font-extrabold leading-tight text-slate-900 md:text-6xl">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              {subtitle}
            </p>
          )}

          {/* Button */}
          {buttonText && (
            <div className="mt-10">
              <Button to={buttonLink}>{buttonText}</Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default PageHero;
