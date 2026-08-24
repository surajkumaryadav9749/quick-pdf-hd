import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle, FiLock, FiUnlock, FiUploadCloud } from "react-icons/fi";
import { resizeImageFile } from "../../services/file-tools.service";

const presets = [[1920, 1080], [1280, 720], [1200, 630], [1080, 1080], [1080, 1350], [1080, 1920], [800, 600], [640, 480]];
const supportedTypes = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024;
const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(bytes > 10 * 1024 * 1024 ? 1 : 2)} MB`;
const outputExtension = (format) => (format === "jpeg" ? "jpg" : format);

const ImageResizerWorkspace = () => {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [mode, setMode] = useState("pixels");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [percentage, setPercentage] = useState(100);
  const [locked, setLocked] = useState(true);
  const [format, setFormat] = useState("jpeg");
  const [quality, setQuality] = useState(80);
  const [isResizing, setIsResizing] = useState(false);
  const [result, setResult] = useState(null);

  const addImage = (file) => {
    if (!file || !supportedTypes.includes(file.type) || file.size > MAX_SIZE) return toast.error("Choose a JPG, PNG, or WEBP image up to 10 MB.");
    const preview = URL.createObjectURL(file);
    const element = new Image();
    element.onload = () => {
      if (element.width > 8000 || element.height > 8000) { URL.revokeObjectURL(preview); return toast.error("Images cannot be wider or taller than 8000 px."); }
      setImage({ file, preview, width: element.width, height: element.height });
      setWidth(element.width); setHeight(element.height); setFormat(file.type.split("/")[1] === "jpeg" ? "jpeg" : file.type.split("/")[1]); setResult(null);
    };
    element.onerror = () => { URL.revokeObjectURL(preview); toast.error("This image could not be read."); };
    element.src = preview;
  };

  const changeWidth = (value) => { const next = Math.max(1, Math.min(8000, Number(value) || 1)); setWidth(next); if (locked && image) setHeight(Math.max(1, Math.round(next / (image.width / image.height)))); };
  const changeHeight = (value) => { const next = Math.max(1, Math.min(8000, Number(value) || 1)); setHeight(next); if (locked && image) setWidth(Math.max(1, Math.round(next * (image.width / image.height)))); };
  const dimensions = mode === "percentage" ? { width: Math.max(1, Math.round(image.width * percentage / 100)), height: Math.max(1, Math.round(image.height * percentage / 100)) } : { width, height };

  const resize = async () => {
    if (!image || dimensions.width < 1 || dimensions.height < 1 || dimensions.width > 8000 || dimensions.height > 8000) return toast.error("Enter dimensions between 1 and 8000 px.");
    try { setIsResizing(true); const blob = await resizeImageFile(image.file, { ...dimensions, format, quality }); const url = URL.createObjectURL(blob); setResult({ url, size: blob.size, dimensions, filename: `${image.file.name.replace(/\.[^.]+$/, "")}-resized.${outputExtension(format)}` }); toast.success("Your resized image is ready."); } catch { toast.error("Could not resize the image. Please try again."); } finally { setIsResizing(false); }
  };
  const reset = () => { if (image?.preview) URL.revokeObjectURL(image.preview); if (result?.url) URL.revokeObjectURL(result.url); setImage(null); setResult(null); };

  if (!image) return <section className="bg-slate-50 pb-16 sm:pb-20"><div className="mx-auto max-w-4xl px-4 sm:px-6"><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(event) => { addImage(event.target.files?.[0]); event.target.value = ""; }} /><button type="button" onClick={() => inputRef.current?.click()} onDrop={(event) => { event.preventDefault(); addImage(event.dataTransfer.files?.[0]); }} onDragOver={(event) => event.preventDefault()} className="flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 px-6 py-14 text-center transition hover:border-blue-500 hover:bg-blue-100"><FiUploadCloud className="text-5xl text-blue-600" /><span className="mt-4 text-xl font-bold text-slate-900">Upload an image</span><span className="mt-2 text-slate-600">JPG, PNG, or WEBP · up to 10 MB · maximum 8000 px</span></button></div></div></section>;

  return <section className="bg-slate-50 pb-16 sm:pb-20"><div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="grid gap-6 lg:grid-cols-2"><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><p className="text-sm font-semibold text-slate-500">Original · {image.width} × {image.height} px · {formatBytes(image.file.size)}</p><img src={image.preview} alt={`Original preview of ${image.file.name}`} className="mt-4 max-h-[420px] w-full rounded-xl bg-slate-100 object-contain" /></div><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex rounded-xl bg-slate-100 p-1"><button type="button" onClick={() => setMode("pixels")} className={`flex-1 rounded-lg py-2 text-sm font-semibold ${mode === "pixels" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"}`}>Pixels</button><button type="button" onClick={() => setMode("percentage")} className={`flex-1 rounded-lg py-2 text-sm font-semibold ${mode === "percentage" ? "bg-white text-blue-700 shadow-sm" : "text-slate-600"}`}>Percentage</button></div>{mode === "pixels" ? <><div className="mt-5 grid grid-cols-2 gap-3"><label className="text-sm font-semibold text-slate-700">Width (px)<input type="number" min="1" max="8000" value={width} onChange={(event) => changeWidth(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal" /></label><label className="text-sm font-semibold text-slate-700">Height (px)<input type="number" min="1" max="8000" value={height} onChange={(event) => changeHeight(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal" /></label></div><button type="button" onClick={() => setLocked((current) => !current)} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">{locked ? <FiLock /> : <FiUnlock />}{locked ? "Lock aspect ratio on" : "Lock aspect ratio off"}</button><div className="mt-5 flex flex-wrap gap-2">{presets.map(([presetWidth, presetHeight]) => <button key={`${presetWidth}-${presetHeight}`} type="button" onClick={() => { setWidth(presetWidth); setHeight(presetHeight); }} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-700">{presetWidth} × {presetHeight}</button>)}</div></> : <div className="mt-5"><label className="text-sm font-semibold text-slate-700">Resize percentage<select value={percentage} onChange={(event) => setPercentage(Number(event.target.value))} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal">{[25, 50, 75, 100, 150, 200].map((value) => <option key={value} value={value}>{value}%</option>)}</select></label><p className="mt-3 text-sm text-slate-600">New size: {dimensions.width} × {dimensions.height} px</p></div>}<div className="mt-6 grid gap-3 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-700">Output format<select value={format} onChange={(event) => setFormat(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal"><option value="jpeg">JPG</option><option value="png">PNG</option><option value="webp">WebP</option></select></label><label className="text-sm font-semibold text-slate-700">Quality ({quality})<input type="range" min="20" max="95" value={quality} disabled={format === "png"} onChange={(event) => setQuality(Number(event.target.value))} className="mt-3 w-full accent-blue-600 disabled:opacity-50" /><span className="mt-1 block text-xs font-normal text-slate-500">{format === "png" ? "PNG uses lossless compression; quality does not apply." : "Applies to JPG and WebP output."}</span></label></div><button type="button" onClick={resize} disabled={isResizing} className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400">{isResizing ? "Resizing image..." : "Resize image"}</button><button type="button" onClick={reset} className="mt-3 w-full rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50">Start over</button></div></div>{result && <div className="mt-6 rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-4"><div><p className="inline-flex items-center gap-2 font-semibold text-emerald-700"><FiCheckCircle />Resized image ready</p><p className="mt-2 text-slate-600">{result.dimensions.width} × {result.dimensions.height} px · {formatBytes(result.size)}</p></div><a href={result.url} download={result.filename} className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Download resized image</a></div></div>}</div></section>;
};

export default ImageResizerWorkspace;
