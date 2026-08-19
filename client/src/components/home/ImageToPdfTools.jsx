import { Link } from "react-router-dom";

const tools = [
  {
    title: "JPG to PDF",
    description: "Convert JPG images into PDF documents online.",
    format: "JPG",
    path: "/jpg-to-pdf",
    badgeClass: "bg-blue-100 text-blue-700",
  },
  {
    title: "PNG to PDF",
    description: "Convert PNG images into PDF documents quickly.",
    format: "PNG",
    path: "/png-to-pdf",
    badgeClass: "bg-green-100 text-green-800",
  },
  {
    title: "JPEG to PDF",
    description: "Turn JPEG images into a single PDF file with ease.",
    format: "JPEG",
    path: "/jpeg-to-pdf",
    badgeClass: "bg-purple-100 text-purple-700",
  },
  {
    title: "WEBP to PDF",
    description: "Convert WEBP images into PDF files online.",
    format: "WEBP",
    path: "/webp-to-pdf",
    badgeClass: "bg-orange-100 text-orange-800",
  },
];

const ImageToPdfTools = () => {
  return (
    <section
      id="upload"
      className="scroll-mt-20 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Image to PDF Tools
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Convert Images to PDF Online
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Choose an image format and convert your images into PDF files
            quickly and easily. To combine JPG photos, use our{" "}
            <Link to="/jpg-to-pdf" className="font-semibold text-blue-600 hover:underline">
              JPG to PDF converter
            </Link>.
          </p>
        </div>

        {/* Tool Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
            >
              {/* Format Badge */}
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl text-xl font-bold ${tool.badgeClass}`}
              >
                {tool.format}
              </div>

              {/* Title */}
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {tool.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {tool.description}
              </p>

              {/* CTA */}
              <span className="mt-5 inline-flex items-center font-semibold text-blue-600 transition-all duration-300 group-hover:gap-2">
                Convert Now
                <span className="ml-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageToPdfTools;
