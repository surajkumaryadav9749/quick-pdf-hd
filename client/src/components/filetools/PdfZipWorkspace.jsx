import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle, FiFileText, FiFolderPlus, FiTrash2, FiUploadCloud, FiX } from "react-icons/fi";
import { createPdfZip } from "../../services/file-tools.service";
import useResultFocus from "../common/useResultFocus";

const MAX_FILES = 20;
const MAX_SIZE = 25 * 1024 * 1024;
const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(bytes >= 10 * 1024 * 1024 ? 1 : 2)} MB`;
const safeZipName = (name) => {
  const cleanName = name.replace(/[\\/:*?"<>|]+/g, "-").replace(/^\.+/, "").trim().slice(0, 100) || "quickpdfhd-pdfs";
  return cleanName.toLowerCase().endsWith(".zip") ? cleanName : `${cleanName}.zip`;
};

const PdfZipWorkspace = () => {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [zipName, setZipName] = useState("quickpdfhd-pdfs.zip");
  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState(null);
  const resultRef = useResultFocus(result);

  const addFiles = (fileList) => {
    const selected = Array.from(fileList || []);
    const valid = selected.filter((file) => file.type === "application/pdf" && file.name.toLowerCase().endsWith(".pdf") && file.size > 0 && file.size <= MAX_SIZE);
    if (!valid.length) return toast.error("Choose PDF files up to 25 MB each.");
    if (files.length + valid.length > MAX_FILES) return toast.error(`You can add up to ${MAX_FILES} PDF files.`);
    setFiles((current) => [...current, ...valid]);
    setResult(null);
    if (valid.length !== selected.length) toast.error("Some files were skipped because they were not valid PDFs or exceeded 25 MB.");
  };

  const createZip = async () => {
    if (!files.length) return toast.error("Select at least one PDF file.");
    try {
      setIsCreating(true);
      const blob = await createPdfZip(files);
      const filename = safeZipName(zipName);
      const url = URL.createObjectURL(blob);
      setResult({ url, filename, size: blob.size });
      toast.success("Your ZIP file is ready.");
    } catch {
      toast.error("Could not create the ZIP. Please try again.");
    } finally { setIsCreating(false); }
  };

  const reset = () => {
    if (result?.url) URL.revokeObjectURL(result.url);
    setFiles([]); setResult(null); setZipName("quickpdfhd-pdfs.zip");
  };

  if (result) return <section ref={resultRef} tabIndex="-1" aria-live="polite" className="scroll-mt-24 bg-slate-50 pb-16 outline-none"><div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm"><FiCheckCircle className="mx-auto text-5xl text-emerald-600" /><h2 className="mt-4 text-2xl font-bold text-slate-900">Your ZIP file is ready</h2><p className="mt-3 text-slate-600">{files.length} PDF{files.length > 1 ? "s" : ""} included · {result.filename} · {formatBytes(result.size)}</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><a href={result.url} download={result.filename} className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">Download ZIP</a><button type="button" onClick={reset} className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50">Start over</button></div></div></div></section>;

  return <section className="bg-slate-50 pb-16 sm:pb-20"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><input ref={inputRef} type="file" accept="application/pdf,.pdf" multiple className="hidden" onChange={(event) => { addFiles(event.target.files); event.target.value = ""; }} /><button type="button" onClick={() => inputRef.current?.click()} onDrop={(event) => { event.preventDefault(); addFiles(event.dataTransfer.files); }} onDragOver={(event) => event.preventDefault()} className="flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 px-6 py-10 text-center transition hover:border-blue-500 hover:bg-blue-100"><FiUploadCloud className="text-5xl text-blue-600" /><span className="mt-4 text-xl font-bold text-slate-900">Select PDF files</span><span className="mt-2 text-slate-600">Drop PDFs here or choose files · up to 20 files · 25 MB each</span></button>
      {files.length > 0 && <><div className="mt-6 flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-bold text-slate-900">Selected PDFs ({files.length})</h2><div className="flex gap-2"><button type="button" onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"><FiFolderPlus />Add more files</button><button type="button" onClick={() => setFiles([])} className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"><FiTrash2 />Clear all</button></div></div><div className="mt-4 max-h-80 space-y-2 overflow-y-auto pr-1">{files.map((file, index) => <div key={`${file.name}-${file.lastModified}-${index}`} className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 p-3"><FiFileText className="shrink-0 text-2xl text-red-500" /><div className="min-w-0 flex-1"><p className="truncate font-medium text-slate-800" title={file.name}>{file.name}</p><p className="text-sm text-slate-500">{formatBytes(file.size)}</p></div><button type="button" onClick={() => setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600" aria-label={`Remove ${file.name}`}><FiX /></button></div>)}</div><label className="mt-6 block text-sm font-semibold text-slate-800">ZIP file name<input value={zipName} onChange={(event) => setZipName(event.target.value)} maxLength="104" className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-3 font-normal text-slate-700" /></label><p className="mt-2 text-sm text-slate-500">Total size: {formatBytes(files.reduce((sum, file) => sum + file.size, 0))}. ZIP packages your PDFs together; it may not substantially reduce PDF size.</p><button type="button" onClick={createZip} disabled={isCreating} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"><FiFileText />{isCreating ? "Creating ZIP..." : "Create ZIP"}</button></>}</div></div></section>;
};

export default PdfZipWorkspace;
