import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  FiCheckCircle,
  FiDownload,
  FiFile,
  FiImage,
  FiRefreshCw,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { convertImageFiles } from "../../services/file-tools.service";
import { downloadBlobAsFile, saveImageFiles } from "../../utils/save-image-files";
import useResultFocus from "../common/useResultFocus";

const formatBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const extensionOf = (name = "") => {
  const match = String(name).toLowerCase().match(/(\.[a-z0-9]+)$/);
  return match ? match[1] : "";
};

const ImageConvertWorkspace = ({ tool }) => {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [results, setResults] = useState(null);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [previews, setPreviews] = useState([]);
  const resultRef = useResultFocus(results);

  // Clean up object URLs on unmount or file changes
  useEffect(() => {
    return () => {
      previews.forEach((p) => {
        if (p.url) URL.revokeObjectURL(p.url);
      });
    };
  }, [previews]);

  const addFiles = (selectedFiles) => {
    const incoming = Array.from(selectedFiles || []);
    if (!incoming.length) return;

    const valid = incoming.filter((file) => {
      const ext = extensionOf(file.name);
      const isExtOk = tool.extensions.includes(ext);
      const isMimeOk = tool.mimeTypes.includes(file.type) || isExtOk;
      const isSizeOk = file.size > 0 && file.size <= tool.maxSize;
      return isExtOk && isMimeOk && isSizeOk;
    });

    if (!valid.length) {
      toast.error(`Please select valid ${tool.formatsLabel} under ${tool.maxSizeLabel}.`);
      return;
    }

    if (valid.length !== incoming.length) {
      toast.error("Some files were skipped because they exceeded 10 MB or were not supported formats.");
    }

    setFiles((current) => {
      const combined = [...current, ...valid].slice(0, tool.maxFiles);
      if (current.length + valid.length > tool.maxFiles) {
        toast.error(`You can convert up to ${tool.maxFiles} images at once.`);
      }

      // Generate previews
      const newPreviews = combined.map((file) => ({
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
      }));
      setPreviews(newPreviews);

      return combined;
    });

    setResults(null);
  };

  const removeFile = (indexToRemove) => {
    setFiles((current) => {
      const next = current.filter((_, idx) => idx !== indexToRemove);
      const nextPreviews = next.map((file) => ({
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
      }));
      setPreviews(nextPreviews);
      return next;
    });
  };

  const clearAll = () => {
    setFiles([]);
    setPreviews([]);
    setResults(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer?.files) {
      addFiles(e.dataTransfer.files);
    }
  };

  const runConversion = async () => {
    if (!files.length) {
      toast.error("Please add at least one image to convert.");
      return;
    }

    try {
      setIsWorking(true);
      const converted = await convertImageFiles(files, tool.targetFormat);
      setResults(converted);
      toast.success(`Successfully converted ${converted.length} ${converted.length === 1 ? "image" : "images"}!`);
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error(error.message || "Failed to convert images. Please check the files and try again.");
    } finally {
      setIsWorking(false);
    }
  };

  const handleDownloadSingle = (file) => {
    downloadBlobAsFile(file.blob, file.filename);
  };

  const handleDownloadAll = async () => {
    if (!results || !results.length) return;
    try {
      setIsSavingAll(true);
      await saveImageFiles(results, { subfolderName: tool.name });
      toast.success("All images saved successfully.");
    } catch (error) {
      if (error?.code !== "CANCELLED") {
        console.error("Save all error:", error);
        toast.error("Failed to save files. You can download each file individually below.");
      }
    } finally {
      setIsSavingAll(false);
    }
  };

  return (
    <section id="upload" className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Dropzone Area */}
        {!results && (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="relative rounded-3xl border-2 border-dashed border-teal-300 bg-white p-8 text-center shadow-sm transition hover:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500 sm:p-12"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
              <FiUploadCloud className="h-8 w-8" aria-hidden="true" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-slate-900">{tool.uploadTitle}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">{tool.uploadHint}</p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                <FiImage className="h-5 w-5" aria-hidden="true" />
                Select {tool.badge.split(" ")[0]} Images
              </button>

              {files.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  <FiTrash2 className="h-4 w-4" aria-hidden="true" />
                  Clear
                </button>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept={tool.accept}
              multiple
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
              className="sr-only"
              aria-label="Upload image files"
            />
          </div>
        )}

        {/* Selected Files Preview List */}
        {files.length > 0 && !results && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Ready to Convert ({files.length} {files.length === 1 ? "file" : "files"})
                </h3>
                <p className="text-xs text-slate-500">Target output: {tool.outputFormatLabel}</p>
              </div>

              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={files.length >= tool.maxFiles}
                className="text-sm font-semibold text-teal-800 hover:text-teal-700 disabled:opacity-50"
              >
                + Add more
              </button>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {files.map((file, idx) => (
                <div
                  key={`${file.name}-${idx}`}
                  className="group relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
                >
                  {previews[idx]?.url ? (
                    <img
                      src={previews[idx].url}
                      alt={file.name}
                      className="h-14 w-14 shrink-0 rounded-xl object-cover border border-slate-200"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-200 text-slate-500">
                      <FiFile className="h-6 w-6" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500">{formatBytes(file.size)}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
                    aria-label={`Remove ${file.name}`}
                  >
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Conversion CTA */}
            <div className="mt-8 border-t border-slate-100 pt-6 text-center">
              <button
                type="button"
                onClick={runConversion}
                disabled={isWorking}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 py-4 text-lg font-bold text-white shadow-md transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 sm:w-auto sm:min-w-[280px]"
              >
                {isWorking ? (
                  <>
                    <FiRefreshCw className="h-5 w-5 animate-spin" aria-hidden="true" />
                    {tool.processingLabel}
                  </>
                ) : (
                  <>
                    <FiCheckCircle className="h-5 w-5" aria-hidden="true" />
                    {tool.actionLabel}
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Results Success State */}
        {results && (
          <div
            ref={resultRef}
            tabIndex={-1}
            className="rounded-3xl border border-teal-200 bg-white p-8 shadow-md outline-none"
          >
            <div className="text-center">
              <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-100 text-teal-800">
                <FiCheckCircle className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-2xl font-extrabold text-slate-900">{tool.successTitle}</h3>
              <p className="mt-2 text-sm text-slate-600">
                Converted {results.length} {results.length === 1 ? "file" : "files"} to {tool.outputFormatLabel}.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {results.length > 1 && (
                  <button
                    type="button"
                    onClick={handleDownloadAll}
                    disabled={isSavingAll}
                    className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <FiDownload className="h-5 w-5" />
                    {isSavingAll ? "Saving files..." : tool.downloadAllLabel}
                  </button>
                )}

                {results.length === 1 && (
                  <button
                    type="button"
                    onClick={() => handleDownloadSingle(results[0])}
                    className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 font-bold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <FiDownload className="h-5 w-5" />
                    {tool.downloadLabel}
                  </button>
                )}

                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                  <FiRefreshCw className="h-4 w-4" />
                  Convert More Images
                </button>
              </div>
            </div>

            {/* Converted Files List */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Converted Files</h4>
              <div className="mt-4 space-y-3">
                {results.map((item, idx) => (
                  <div
                    key={`${item.filename}-${idx}`}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-teal-50/40"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-800">
                        <FiImage className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900" title={item.filename}>
                          {item.filename}
                        </p>
                        <p className="text-xs text-slate-500">{formatBytes(item.blob.size)}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadSingle(item)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-teal-600 bg-white px-3.5 py-2 text-xs font-semibold text-teal-800 shadow-sm transition hover:bg-teal-600 hover:text-white"
                    >
                      <FiDownload className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ImageConvertWorkspace;
