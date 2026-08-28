import { FiDownload } from "react-icons/fi";

import useConvertPdf from "../../hooks/useConvertPdf";
import useImageUpload from "../../hooks/useImageUpload";
import useResultFocus from "../common/useResultFocus";

const ConvertButton = () => {
  const { images } = useImageUpload();

  const { convertPdf, isConverting, result, resetResult } = useConvertPdf();
  const resultRef = useResultFocus(result);

  if (result) {
    return (
      <section ref={resultRef} tabIndex="-1" aria-live="polite" className="scroll-mt-24 mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center outline-none">
        <h2 className="text-2xl font-bold text-slate-900">Your PDF is ready</h2>
        <p className="mt-2 text-slate-600">{result.imageCount} image{result.imageCount > 1 ? "s" : ""} converted · {(result.size / 1024 / 1024).toFixed(2)} MB</p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={result.url} download="QuickPDFHD.pdf" className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Download PDF</a>
          <button type="button" onClick={resetResult} className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50">Convert more images</button>
        </div>
      </section>
    );
  }

  return (
    <div className="mt-10 flex justify-center">
      <button
        type="button"
        onClick={convertPdf}
        disabled={!images.length || isConverting}
        className={`flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300

        ${
          !images.length || isConverting
            ? "cursor-not-allowed bg-slate-400"
            : "bg-blue-600 hover:-translate-y-1 hover:bg-blue-700"
        }`}
      >
        {isConverting ? (
          <>
            {/* Spinner */}
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Creating PDF...
          </>
        ) : (
          <>
            <FiDownload size={22} />
            Convert {images.length} Image
            {images.length > 1 ? "s" : ""} to PDF
          </>
        )}
      </button>
    </div>
  );
};

export default ConvertButton;
