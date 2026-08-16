const steps = [
  {
    number: "01",
    title: "Upload Your Images",
    description:
      "Select or drag and drop your JPG, JPEG, PNG or WEBP images into QuickPDFHD.",
  },
  {
    number: "02",
    title: "Arrange Your Images",
    description:
      "Arrange your uploaded images in the order you want them to appear in your PDF.",
  },
  {
    number: "03",
    title: "Convert Images to PDF",
    description:
      "Click the convert button and QuickPDFHD will create your PDF from the selected images.",
  },
  {
    number: "04",
    title: "Get Your PDF",
    description:
      "Once the conversion is complete, your PDF is generated and downloaded automatically to your device.",
  },
];

const HowToSection = () => {
  return (
    <section
      aria-labelledby="how-to-convert-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            How It Works
          </p>

          <h2
            id="how-to-convert-heading"
            className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl"
          >
            How to Convert Images to PDF Online
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Convert JPG, JPEG, PNG and WEBP images into a PDF in just a few
            simple steps using QuickPDFHD.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="text-sm font-bold text-blue-600">
                {step.number}
              </span>

              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToSection;
