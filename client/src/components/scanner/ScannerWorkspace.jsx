import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiAlertTriangle, FiCheckCircle, FiFileText, FiUploadCloud, FiX } from "react-icons/fi";
import { scanImagesToPdf } from "../../services/scanner.service";

const targets = [
  { value: 100, label: "Under 100 KB" },
  { value: 200, label: "Under 200 KB" },
  { value: 500, label: "Under 500 KB" },
  { value: 1024, label: "Under 1 MB" },
];

const inspectImage = (file) =>
  new Promise((resolve) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      const scale = Math.min(1, 180 / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let sum = 0;
      let sumSquared = 0;
      let edgeDifference = 0;
      let comparisons = 0;

      for (let y = 0; y < canvas.height; y += 2) {
        for (let x = 0; x < canvas.width; x += 2) {
          const point = (y * canvas.width + x) * 4;
          const brightness = (pixels[point] + pixels[point + 1] + pixels[point + 2]) / 3;
          sum += brightness;
          sumSquared += brightness * brightness;
          if (x > 1) {
            const previous = (y * canvas.width + x - 2) * 4;
            const previousBrightness = (pixels[previous] + pixels[previous + 1] + pixels[previous + 2]) / 3;
            edgeDifference += Math.abs(brightness - previousBrightness);
            comparisons += 1;
          }
        }
      }

      const samples = Math.ceil(canvas.width / 2) * Math.ceil(canvas.height / 2);
      const variance = sumSquared / samples - (sum / samples) ** 2;
      const averageEdge = edgeDifference / Math.max(comparisons, 1);
      URL.revokeObjectURL(url);
      resolve({ blank: variance < 18, blurry: variance >= 18 && averageEdge < 7 });
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve({ blank: false, blurry: false });
    };
    image.src = url;
  });

const ScannerWorkspace = () => {
  const inputRef = useRef(null);
  const [pages, setPages] = useState([]);
  const [settings, setSettings] = useState({
    autoCrop: true,
    enhance: "color",
    pageNumbers: true,
    rotation: 0,
    targetKb: 500,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  const addFiles = async (fileList) => {
    const files = Array.from(fileList || []).filter((file) => file.type.startsWith("image/"));
    if (!files.length) return toast.error("Please choose JPG, PNG, or WEBP images.");
    if (pages.length + files.length > 20) return toast.error("You can scan up to 20 pages at once.");

    const scannedPages = await Promise.all(
      files.map(async (file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        ...(await inspectImage(file)),
      })),
    );
    setPages((current) => [...current, ...scannedPages]);
  };

  const removePage = (id) => {
    setPages((current) => {
      const page = current.find((item) => item.id === id);
      if (page) URL.revokeObjectURL(page.preview);
      if (selectedPage?.id === id) setSelectedPage(null);
      return current.filter((item) => item.id !== id);
    });
  };

  const createPdf = async () => {
    if (!pages.length) return toast.error("Add at least one document image first.");
    try {
      setIsCreating(true);
      const toastId = toast.loading("Cleaning pages and creating your PDF...");
      const pdfBlob = await scanImagesToPdf(pages.map((page) => page.file), settings);
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "QuickPDFHD-scanned-document.pdf";
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Your scanned PDF is ready.", { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not create the PDF. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const warnings = pages.filter((page) => page.blank || page.blurry);

  return (
    <section className="bg-slate-50 pb-16 sm:pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={(event) => { addFiles(event.target.files); event.target.value = ""; }} />
            <button type="button" onClick={() => inputRef.current?.click()} className="flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 px-6 py-10 text-center transition hover:border-blue-500 hover:bg-blue-100">
              <FiUploadCloud className="text-5xl text-blue-600" />
              <span className="mt-4 text-xl font-bold text-slate-900">Upload document photos</span>
              <span className="mt-2 text-slate-600">JPG, PNG or WEBP · up to 20 pages · 10 MB each</span>
            </button>

            {warnings.length > 0 && (
              <div className="mt-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                <FiAlertTriangle className="mt-1 shrink-0" />
                <p><strong>Quality check:</strong> {warnings.length} page{warnings.length > 1 ? "s look" : " looks"} blank or blurry. Review it before downloading.</p>
              </div>
            )}

            {pages.length > 0 && (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {pages.map((page, index) => (
                  <article key={page.id} className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <button type="button" onClick={() => setSelectedPage(page)} className="block w-full bg-white p-3 text-left" aria-label={`Open full preview of page ${index + 1}`}>
                      <img src={page.preview} alt={`Full preview of document page ${index + 1}`} className="h-64 w-full object-contain" />
                    </button>
                    <div className="flex items-center justify-between gap-2 p-3 text-sm font-medium text-slate-700">
                      <button type="button" onClick={() => setSelectedPage(page)} className="hover:text-blue-600">Page {index + 1} · View full preview</button>
                      {(page.blank || page.blurry) && <FiAlertTriangle className="text-amber-600" aria-label="Review page quality" />}
                      <button type="button" onClick={() => removePage(page.id)} className="rounded p-1 text-slate-500 hover:bg-slate-200 hover:text-red-600" aria-label={`Remove page ${index + 1}`}><FiX /></button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">Scan settings</h2>
            <div className="mt-6 space-y-5">
              <label className="flex cursor-pointer items-start gap-3"><input type="checkbox" checked={settings.autoCrop} onChange={(event) => setSettings((current) => ({ ...current, autoCrop: event.target.checked }))} className="mt-1 h-4 w-4 accent-blue-600" /><span><strong className="text-slate-900">Auto-crop white edges</strong><small className="mt-1 block leading-5 text-slate-600">Removes extra blank margins around the document.</small></span></label>
              <label className="block text-sm font-semibold text-slate-800">Document mode<select value={settings.enhance} onChange={(event) => setSettings((current) => ({ ...current, enhance: event.target.value }))} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal text-slate-700"><option value="color">Color</option><option value="grayscale">Grayscale and enhanced</option><option value="bw">Black and white</option></select></label>
              <label className="block text-sm font-semibold text-slate-800">PDF size goal<select value={settings.targetKb} onChange={(event) => setSettings((current) => ({ ...current, targetKb: Number(event.target.value) }))} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal text-slate-700">{targets.map((target) => <option key={target.value} value={target.value}>{target.label}</option>)}</select><small className="mt-1 block font-normal leading-5 text-slate-500">We optimize image quality toward this size; the final PDF can vary by page count and content.</small></label>
              <div><span className="text-sm font-semibold text-slate-800">Rotate all pages</span><div className="mt-2 flex gap-2">{[0, 90, 180, 270].map((rotation) => <button key={rotation} type="button" onClick={() => setSettings((current) => ({ ...current, rotation }))} className={`rounded-lg px-3 py-2 text-sm font-medium ${settings.rotation === rotation ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>{rotation === 0 ? "Original" : `${rotation}°`}</button>)}</div></div>
              <label className="flex cursor-pointer items-start gap-3"><input type="checkbox" checked={settings.pageNumbers} onChange={(event) => setSettings((current) => ({ ...current, pageNumbers: event.target.checked }))} className="mt-1 h-4 w-4 accent-blue-600" /><span><strong className="text-slate-900">Add page numbers</strong><small className="mt-1 block leading-5 text-slate-600">Places a page number at the bottom of each PDF page.</small></span></label>
            </div>
            <button type="button" disabled={!pages.length || isCreating} onClick={createPdf} className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"><FiFileText />{isCreating ? "Creating PDF..." : "Create scanned PDF"}</button>
            <p className="mt-4 flex gap-2 text-xs leading-5 text-slate-500"><FiCheckCircle className="mt-0.5 shrink-0 text-emerald-600" />Files are processed only to generate your PDF and are not stored permanently.</p>
          </aside>
        </div>
      </div>
      {selectedPage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/75 p-4" role="dialog" aria-modal="true" aria-label="Full document preview" onClick={() => setSelectedPage(null)}>
          <div className="relative max-h-[90vh] max-w-5xl rounded-2xl bg-white p-4 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setSelectedPage(null)} className="absolute right-6 top-6 rounded-full bg-slate-900/80 p-2 text-white hover:bg-slate-900" aria-label="Close preview"><FiX /></button>
            <img src={selectedPage.preview} alt="Full-size uploaded document preview" className="max-h-[82vh] max-w-full object-contain" />
          </div>
        </div>
      )}
    </section>
  );
};

export default ScannerWorkspace;
