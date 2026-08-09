import { FiDownload } from "react-icons/fi";

import useConvertPdf from "../../hooks/useConvertPdf";
import useImageUpload from "../../hooks/useImageUpload";

const ConvertButton = () => {
  const { images } = useImageUpload();

  const { convertPdf, isConverting } = useConvertPdf();

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
