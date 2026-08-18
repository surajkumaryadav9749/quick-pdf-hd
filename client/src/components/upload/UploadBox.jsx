import { HiOutlineCloudArrowUp } from "react-icons/hi2";
import useDragDrop from "../../hooks/useDragDrop";

const UploadBox = ({ allowedTypes, accept }) => {
  const { isDragging, dragProps, openFilePicker, fileInputRef } =
    useDragDrop(allowedTypes);

  return (
    <div
      {...dragProps}
      className={`
        cursor-pointer
        rounded-3xl
        border-2
        border-dashed
        p-12
        text-center
        shadow-sm
        transition-all
        duration-300

        ${
          isDragging
            ? "scale-[1.01] border-blue-600 bg-blue-50"
            : "border-slate-300 bg-white hover:border-blue-500"
        }
      `}
    >
      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) {
            dragProps.onFilesSelected(e.target.files);
          }

          e.target.value = "";
        }}
      />

      <div className="flex flex-col items-center gap-6">
        {/* Icon */}
        <div
          className={`
            flex h-24 w-24 items-center justify-center
            rounded-full
            transition-all
            duration-300

            ${isDragging ? "scale-110 bg-blue-200" : "bg-blue-100"}
          `}
        >
          {isDragging ? (
            <span className="text-5xl">⬇️</span>
          ) : (
            <HiOutlineCloudArrowUp className="text-5xl text-blue-600" />
          )}
        </div>

        {/* Heading */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            {isDragging ? "Drop Images Here" : "Drag & Drop Images Here"}
          </h2>

          <p className="mt-4 text-slate-600">
            {isDragging
              ? "Release your mouse to upload images."
              : "Upload supported images for PDF conversion."}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Maximum 20 Images • 10 MB each
          </p>
        </div>

        {/* Divider */}
        <div className="flex w-full max-w-xs items-center gap-3">
          <div className="h-px flex-1 bg-slate-300" />

          <span className="text-sm font-medium text-slate-600">OR</span>

          <div className="h-px flex-1 bg-slate-300" />
        </div>

        {/* Browse Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openFilePicker();
          }}
          className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Browse Files
        </button>
      </div>
    </div>
  );
};

export default UploadBox;
