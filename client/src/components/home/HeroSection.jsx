import { Link } from "react-router-dom";
import { FiCheckCircle, FiFileText, FiGrid, FiImage, FiLayers } from "react-icons/fi";

const toolPreviews = [
  { label: "Word\nto PDF", icon: <FiFileText aria-hidden="true" />, position: "left-0 top-8" },
  { label: "Merge\nPDF", icon: <FiLayers aria-hidden="true" />, position: "left-0 bottom-8" },
  { label: "JPG\nto PDF", icon: <FiImage aria-hidden="true" />, position: "right-0 top-7" },
  { label: "Split\nPDF", icon: <FiGrid aria-hidden="true" />, position: "right-0 bottom-8" },
];

const HeroSection = () => (
  <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-teal-100 py-14 sm:py-16">
    <div aria-hidden="true" className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-teal-100/70 blur-3xl" />
    <div aria-hidden="true" className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-teal-200/40 blur-3xl" />
    <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 md:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <div className="max-w-2xl">
        <h1 id="hero-heading" className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">Online PDF tools<span className="block text-teal-600">for documents and images</span></h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">Convert Word and Excel files, extract PDF text, split or merge PDFs, turn images into documents, scan pages, and resize photos in the browser. No account is required.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/all-services" className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white shadow-lg transition hover:bg-teal-700 hover:shadow-xl"><FiGrid aria-hidden="true" /> Explore All Tools</Link>
          <Link to="/#services" className="inline-flex items-center justify-center gap-2 rounded-xl border border-teal-600 bg-white/80 px-6 py-3.5 font-semibold text-teal-800 transition hover:bg-teal-100"><FiFileText aria-hidden="true" /> Browse PDF tools</Link>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
          {["Free to use", "No sign-up", "In-memory file processing"].map((item) => <li key={item} className="inline-flex items-center gap-2"><FiCheckCircle aria-hidden="true" className="text-lg text-teal-600" />{item}</li>)}
        </ul>
      </div>
      <div aria-hidden="true" className="relative mx-auto h-[280px] w-full max-w-md sm:h-[310px]">
        <div className="absolute inset-6 rounded-[3rem] bg-white/35 shadow-inner" />
        <div className="absolute left-1/2 top-1/2 flex h-52 w-40 -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-2xl bg-white p-5 shadow-xl ring-1 ring-slate-200/70 sm:h-60 sm:w-44"><FiFileText className="mx-auto text-6xl text-teal-600" /><span className="rounded-xl bg-teal-600 px-3 py-2 text-center text-3xl font-bold text-white shadow-md">PDF</span></div>
        {toolPreviews.map((tool) => <div key={tool.label} className={`absolute ${tool.position} flex w-24 flex-col items-center rounded-xl bg-white p-3 text-center shadow-lg ring-1 ring-slate-200/70 sm:w-28`}><span className="text-2xl text-teal-600">{tool.icon}</span><span className="mt-1 whitespace-pre-line text-xs font-bold leading-4 text-slate-800">{tool.label}</span></div>)}
      </div>
    </div>
  </section>
);

export default HeroSection;
