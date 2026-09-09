import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiArrowDown, FiArrowUp, FiCheckCircle, FiFileText, FiFolderPlus, FiTrash2, FiUploadCloud, FiX } from "react-icons/fi";
import { inspectPdfFile, processPdfTool } from "../../services/file-tools.service";
import useResultFocus from "../common/useResultFocus";

const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(bytes >= 10 * 1024 * 1024 ? 1 : 2)} MB`;

const extensionOf = (name = "") => {
  const match = String(name).toLowerCase().match(/(\.[a-z0-9]+)$/);
  return match ? match[1] : "";
};

const downloadNameFromType = (tool, contentType) => {
  if (contentType.includes("zip")) {
    if (tool.id === "split-pdf") return "QuickPDFHD-split-pdf.zip";
    if (tool.id === "pdf-to-jpg") return "QuickPDFHD-pdf-pages.zip";
  }
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return "QuickPDFHD-page.jpg";
  return tool.downloadName;
};

const DocumentToolWorkspace = ({ tool }) => {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [result, setResult] = useState(null);
  const [splitMode, setSplitMode] = useState("extract");
  const [range, setRange] = useState("");
  const [chunkSize, setChunkSize] = useState(2);
  const [wordMode, setWordMode] = useState("text");
  const [ocrLanguage, setOcrLanguage] = useState("eng");
  const [pdfInfo, setPdfInfo] = useState(null);
  const [progressLabel, setProgressLabel] = useState("");
  const resultRef = useResultFocus(result);

  useEffect(() => {
    if (tool.extra !== "pdf-to-word" || !files[0]) return undefined;
    let cancelled = false;
    inspectPdfFile(files[0]).then((info) => {
      if (!cancelled) setPdfInfo(info);
    }).catch(() => {
      if (!cancelled) setPdfInfo(null);
    });
    return () => { cancelled = true; };
  }, [files, tool.extra]);

  const addFiles = (fileList) => {
    const selected = Array.from(fileList || []);
    const valid = selected.filter((file) => {
      const extension = extensionOf(file.name);
      const typeOk = tool.mimeTypes.includes(file.type) || tool.extensions.includes(extension);
      return typeOk && tool.extensions.includes(extension) && file.size > 0 && file.size <= tool.maxSize;
    });

    if (!valid.length) {
      return toast.error(`Choose ${tool.formatsLabel} up to ${tool.maxSizeLabel}.`);
    }

    setFiles((current) => {
      const next = tool.multiple ? [...current, ...valid].slice(0, tool.maxFiles) : valid.slice(0, 1);
      if (tool.multiple && current.length + valid.length > tool.maxFiles) {
        toast.error(`You can add up to ${tool.maxFiles} files.`);
      }
      return next;
    });
    setResult(null);
    if (valid.length !== selected.length) {
      toast.error("Some files were skipped because they were empty, too large, or the wrong type.");
    }
  };

  const moveFile = (index, direction) => {
    setFiles((current) => {
      const next = [...current];
      const target = index + direction;
      if (target < 0 || target >= next.length) return current;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const run = async () => {
    if (!files.length) return toast.error("Select a file first.");
    if (tool.multiple && files.length < 2) return toast.error("Upload at least two PDF files to merge.");
    if (tool.extra === "split" && splitMode === "extract" && !range.trim()) {
      return toast.error("Enter a page range such as 1-3, 5.");
    }

    if (tool.extra === "pdf-to-word" && wordMode === "ocr") {
      const ocrLimit = pdfInfo?.ocrPageLimit || 15;
      if (pdfInfo?.pageCount > ocrLimit) {
        return toast.error(`OCR accepts PDFs with up to ${ocrLimit} pages.`);
      }
    }

    try {
      setIsWorking(true);
      const fields = tool.extra === "split"
        ? { mode: splitMode === "extract" ? "extract" : splitMode, range, chunkSize }
        : tool.extra === "pdf-to-word"
          ? { ocr: wordMode === "ocr", language: ocrLanguage }
          : {};
      if (tool.extra === "pdf-to-word" && wordMode === "ocr") {
        setProgressLabel(pdfInfo?.pageCount
          ? `Recognizing text on ${pdfInfo.pageCount} page${pdfInfo.pageCount === 1 ? "" : "s"}...`
          : "Running OCR on the server...");
        const { blob, contentType } = await processPdfTool(tool.endpoint, files, fields);
        setProgressLabel("Creating Word document...");
        const filename = downloadNameFromType(tool, contentType);
        setResult({ url: URL.createObjectURL(blob), filename, size: blob.size });
        toast.success("Your file is ready.");
        return;
      }
      const { blob, contentType } = await processPdfTool(tool.endpoint, files, fields);
      const filename = downloadNameFromType(tool, contentType);
      setResult({ url: URL.createObjectURL(blob), filename, size: blob.size });
      toast.success("Your file is ready.");
    } catch (error) {
      toast.error(error.message || "Could not process the file. Please try again.");
    } finally {
      setIsWorking(false);
      setProgressLabel("");
    }
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFiles([]);
    setResult(null);
    setRange("");
    setSplitMode("extract");
    setWordMode("text");
    setOcrLanguage("eng");
    setPdfInfo(null);
    setChunkSize(2);
  };

  if (result) {
    return (
      <section ref={resultRef} tabIndex="-1" aria-live="polite" className="scroll-mt-24 bg-slate-50 pb-16 outline-none">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm">
            <FiCheckCircle className="mx-auto text-5xl text-emerald-600" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900">{tool.successTitle}</h2>
            <p className="mt-3 text-slate-600">{result.filename} · {formatBytes(result.size)}</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={result.url} download={result.filename} className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700">{tool.downloadLabel}</a>
              <button type="button" onClick={reset} className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50">Start over</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="upload" className="scroll-mt-24 bg-slate-50 pb-16 sm:pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <input
            ref={inputRef}
            type="file"
            accept={tool.accept}
            multiple={tool.multiple}
            className="hidden"
            onChange={(event) => {
              addFiles(event.target.files);
              event.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDrop={(event) => {
              event.preventDefault();
              addFiles(event.dataTransfer.files);
            }}
            onDragOver={(event) => event.preventDefault()}
            className="flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50 px-6 py-10 text-center transition hover:border-teal-500 hover:bg-teal-100"
          >
            <FiUploadCloud className="text-5xl text-teal-800" aria-hidden="true" />
            <span className="mt-4 text-xl font-bold text-slate-900">{tool.uploadTitle}</span>
            <span className="mt-2 text-slate-600">{tool.uploadHint}</span>
          </button>

          {files.length > 0 && (
            <>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-slate-900">Selected files ({files.length}{tool.multiple ? `/${tool.maxFiles}` : ""})</h2>
                <div className="flex gap-2">
                  {tool.multiple && (
                    <button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                      <FiFolderPlus aria-hidden="true" /> Add more
                    </button>
                  )}
                  <button type="button" onClick={() => setFiles([])} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
                    <FiTrash2 aria-hidden="true" /> Clear
                  </button>
                </div>
              </div>

              <ul className="mt-4 max-h-80 space-y-2 overflow-y-auto pr-1">
                {files.map((file, index) => (
                  <li key={`${file.name}-${file.lastModified}-${index}`} className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 p-3">
                    <FiFileText className="shrink-0 text-2xl text-red-500" aria-hidden="true" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-slate-800" title={file.name}>{file.name}</p>
                      <p className="text-sm text-slate-500">{formatBytes(file.size)}</p>
                    </div>
                    {tool.extra === "merge" && (
                      <div className="flex flex-col">
                        <button type="button" onClick={() => moveFile(index, -1)} className="rounded p-1 text-slate-500 hover:bg-slate-100" aria-label={`Move ${file.name} up`}><FiArrowUp /></button>
                        <button type="button" onClick={() => moveFile(index, 1)} className="rounded p-1 text-slate-500 hover:bg-slate-100" aria-label={`Move ${file.name} down`}><FiArrowDown /></button>
                      </div>
                    )}
                    <button type="button" onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${file.name}`}>
                      <FiX />
                    </button>
                  </li>
                ))}
              </ul>

              {tool.extra === "split" && (
                <fieldset className="mt-6 rounded-2xl border border-slate-200 p-5">
                  <legend className="px-1 text-sm font-semibold text-slate-800">Split mode</legend>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ["extract", "Extract range"],
                      ["pages", "Separate pages"],
                      ["chunks", "Equal chunks"],
                    ].map(([value, label]) => (
                      <label key={value} className={`rounded-xl border px-3 py-3 text-sm font-semibold ${splitMode === value ? "border-teal-500 bg-teal-50 text-teal-800" : "border-slate-200 text-slate-700"}`}>
                        <input className="mr-2 accent-teal-600" type="radio" name="split-mode" value={value} checked={splitMode === value} onChange={() => setSplitMode(value)} />
                        {label}
                      </label>
                    ))}
                  </div>
                  {(splitMode === "extract" || splitMode === "pages") && (
                    <label className="mt-4 block text-sm font-semibold text-slate-800">
                      Page range {splitMode === "pages" ? "(optional)" : ""}
                      <input value={range} onChange={(event) => setRange(event.target.value)} placeholder="Example: 1-3, 5, 8-10" className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3 font-normal text-slate-700" />
                    </label>
                  )}
                  {splitMode === "chunks" && (
                    <label className="mt-4 block text-sm font-semibold text-slate-800">
                      Pages per file
                      <input type="number" min="1" max="50" value={chunkSize} onChange={(event) => setChunkSize(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3 font-normal text-slate-700" />
                    </label>
                  )}
                </fieldset>
              )}

              {tool.extra === "pdf-to-word" && (
                <fieldset className="mt-6">
                  <legend className="text-sm font-semibold text-slate-800">PDF to Word mode</legend>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <button type="button" onClick={() => setWordMode("text")} className={`rounded-2xl border p-5 text-left ${wordMode === "text" ? "border-teal-500 bg-teal-50" : "border-slate-200 bg-white"}`}>
                      <span className="text-base font-bold text-slate-900">NO OCR</span>
                      <span className="mt-2 block text-sm leading-6 text-slate-600">Convert PDFs with selectable text into editable Word files. Faster, and no extra recognition step.</span>
                    </button>
                    <button type="button" onClick={() => setWordMode("ocr")} className={`rounded-2xl border p-5 text-left ${wordMode === "ocr" ? "border-teal-500 bg-teal-50" : "border-slate-200 bg-white"}`}>
                      <span className="text-base font-bold text-slate-900">OCR</span>
                      <span className="mt-2 block text-sm leading-6 text-slate-600">Convert scanned PDFs with non-selectable text into editable Word files. Up to 15 pages.</span>
                    </button>
                  </div>
                  {pdfInfo && (
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {pdfInfo.hasSelectableText ? "Selectable text detected. NO OCR is recommended." : "Little or no selectable text detected. OCR is recommended."}
                    </p>
                  )}
                  {wordMode === "ocr" && (
                    <label className="mt-4 block text-sm font-semibold text-slate-800">
                      OCR language
                      <select value={ocrLanguage} onChange={(event) => setOcrLanguage(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 font-normal text-slate-700">
                        <option value="eng">English</option>
                        <option value="hin">Hindi</option>
                        <option value="eng+hin">English + Hindi</option>
                      </select>
                    </label>
                  )}
                </fieldset>
              )}

              <p className="mt-4 text-sm text-slate-500">Supported: {tool.formatsLabel}. Maximum size: {tool.maxSizeLabel}.</p>
              <button type="button" onClick={run} disabled={isWorking} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3.5 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-400">
                <FiFileText aria-hidden="true" />
                {isWorking ? (progressLabel || tool.processingLabel) : tool.actionLabel}
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default DocumentToolWorkspace;
