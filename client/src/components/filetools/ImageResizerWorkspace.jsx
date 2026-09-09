import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle, FiFolderPlus, FiLock, FiUnlock, FiUploadCloud, FiX } from "react-icons/fi";
import { resizeImageFiles } from "../../services/file-tools.service";
import useResultFocus from "../common/useResultFocus";

const presets = [[1920, 1080], [1280, 720], [1200, 630], [1080, 1080], [1080, 1350], [1080, 1920], [800, 600], [640, 480]];
const supportedTypes = ["image/jpeg", "image/png", "image/webp"];
const MAX_FILES = 20;
const MAX_SIZE = 10 * 1024 * 1024;
const MAX_DIMENSION = 8000;
const formatBytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(bytes > 10 * 1024 * 1024 ? 1 : 2)} MB`;

const clampDimension = (value) => Math.max(1, Math.min(MAX_DIMENSION, Math.round(Number(value) || 0)));

const outputSizeFor = (image, { mode, width, height, percentage, locked, anchor }) => {
  if (mode === "percentage") {
    return {
      width: clampDimension(image.width * percentage / 100),
      height: clampDimension(image.height * percentage / 100),
    };
  }
  if (locked) {
    if (anchor === "height") {
      const nextHeight = clampDimension(height);
      return { width: clampDimension(image.width * (nextHeight / image.height)), height: nextHeight };
    }
    const nextWidth = clampDimension(width);
    return { width: nextWidth, height: clampDimension(image.height * (nextWidth / image.width)) };
  }
  return { width: clampDimension(width), height: clampDimension(height) };
};

const readImage = (file) => new Promise((resolve) => {
  const preview = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    const result = image.width <= MAX_DIMENSION && image.height <= MAX_DIMENSION
      ? { file, width: image.width, height: image.height, preview }
      : null;
    if (!result) URL.revokeObjectURL(preview);
    resolve(result);
  };
  image.onerror = () => {
    URL.revokeObjectURL(preview);
    resolve(null);
  };
  image.src = preview;
});

const ImageResizerWorkspace = () => {
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [mode, setMode] = useState("pixels");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [percentage, setPercentage] = useState(100);
  const [locked, setLocked] = useState(true);
  const [anchor, setAnchor] = useState("width");
  const [format, setFormat] = useState("jpeg");
  const [quality, setQuality] = useState(85);
  const [isResizing, setIsResizing] = useState(false);
  const [result, setResult] = useState(null);
  const resultRef = useResultFocus(result);
  const imagesRef = useRef([]);

  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  useEffect(() => () => {
    if (result?.url) URL.revokeObjectURL(result.url);
  }, [result]);

  useEffect(() => () => {
    imagesRef.current.forEach((image) => URL.revokeObjectURL(image.preview));
  }, []);

  const first = images[0];
  const previewSize = useMemo(
    () => (first ? outputSizeFor(first, { mode, width, height, percentage, locked, anchor }) : { width: 0, height: 0 }),
    [first, mode, width, height, percentage, locked, anchor],
  );

  const addFiles = async (fileList) => {
    const selected = Array.from(fileList || []);
    const availableSlots = MAX_FILES - images.length;
    const candidates = selected.slice(0, availableSlots).filter((file) => supportedTypes.includes(file.type) && file.size > 0 && file.size <= MAX_SIZE);
    if (!candidates.length) return toast.error("Choose JPG, PNG, or WEBP images up to 10 MB each.");
    const valid = (await Promise.all(candidates.map(readImage))).filter(Boolean);
    if (!valid.length) return toast.error("The selected images could not be read or are larger than 8000 px.");
    setImages((current) => {
      const next = [...current, ...valid].slice(0, MAX_FILES);
      if (!current.length) {
        setWidth(next[0].width);
        setHeight(next[0].height);
        setAnchor("width");
        setFormat(next[0].file.type.split("/")[1] === "jpeg" ? "jpeg" : next[0].file.type.split("/")[1]);
      }
      return next;
    });
    setResult(null);
    if (valid.length !== selected.length) toast.error(`Some files were skipped. You can add up to ${MAX_FILES} valid images, 10 MB each.`);
  };

  const changeWidth = (value) => {
    const next = clampDimension(value);
    setWidth(next);
    setAnchor("width");
    if (locked && first) setHeight(clampDimension(next / (first.width / first.height)));
  };

  const changeHeight = (value) => {
    const next = clampDimension(value);
    setHeight(next);
    setAnchor("height");
    if (locked && first) setWidth(clampDimension(next * (first.width / first.height)));
  };

  const toggleLock = () => {
    setLocked((current) => {
      const next = !current;
      if (next && first) {
        setAnchor("width");
        setHeight(clampDimension(width / (first.width / first.height)));
      }
      return next;
    });
  };

  const applyPreset = (presetWidth, presetHeight) => {
    if (locked && first) {
      setAnchor("width");
      setWidth(presetWidth);
      setHeight(clampDimension(presetWidth / (first.width / first.height)));
      return;
    }
    setWidth(presetWidth);
    setHeight(presetHeight);
  };

  const resize = async () => {
    if (!images.length) return toast.error("Select at least one image.");
    if (previewSize.width < 1 || previewSize.height < 1 || previewSize.width > MAX_DIMENSION || previewSize.height > MAX_DIMENSION) {
      return toast.error("Enter dimensions between 1 and 8000 px.");
    }
    try {
      setIsResizing(true);
      const blob = await resizeImageFiles(images.map(({ file }) => file), {
        mode,
        width,
        height,
        percentage,
        lock: locked,
        anchor,
        format,
        quality,
      });
      setResult({ url: URL.createObjectURL(blob), size: blob.size, preview: { ...previewSize } });
      toast.success("Your resized images ZIP is ready.");
    } catch (error) {
      toast.error(error.message || "Could not resize the images. Please try again.");
    } finally {
      setIsResizing(false);
    }
  };

  const removeImage = (index) => {
    setImages((current) => {
      const next = current.filter((_, imageIndex) => imageIndex !== index);
      current[index] && URL.revokeObjectURL(current[index].preview);
      return next;
    });
    setResult(null);
  };

  const reset = () => {
    images.forEach((image) => URL.revokeObjectURL(image.preview));
    setImages([]);
    setResult(null);
    setWidth(0);
    setHeight(0);
    setPercentage(100);
    setLocked(true);
    setAnchor("width");
  };

  const previewBox = first ? Math.min(320, Math.max(previewSize.width, previewSize.height, 1)) : 0;
  const previewScale = first ? previewBox / Math.max(previewSize.width, previewSize.height, 1) : 1;

  if (result) {
    return (
      <section ref={resultRef} tabIndex="-1" aria-live="polite" className="scroll-mt-24 bg-slate-50 pb-16 outline-none sm:pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm">
            <FiCheckCircle className="mx-auto text-5xl text-emerald-600" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-slate-900">Your resized images are ready</h2>
            <p className="mt-3 text-slate-600">
              {images.length} image{images.length > 1 ? "s" : ""} resized
              {first ? ` · first image ${result.preview.width} × ${result.preview.height} px` : ""} · {formatBytes(result.size)}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={result.url} download="QuickPDFHD-resized-images.zip" className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white hover:bg-teal-700">Download ZIP</a>
              <button type="button" onClick={reset} className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50">Resize more images</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="upload" className="scroll-mt-24 bg-slate-50 pb-16 sm:pb-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={(event) => { addFiles(event.target.files); event.target.value = ""; }} />
          <button type="button" onClick={() => inputRef.current?.click()} onDrop={(event) => { event.preventDefault(); addFiles(event.dataTransfer.files); }} onDragOver={(event) => event.preventDefault()} className="flex w-full flex-col items-center rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50 px-6 py-10 text-center transition hover:border-teal-500 hover:bg-teal-100">
            <FiUploadCloud className="text-5xl text-teal-800" aria-hidden="true" />
            <span className="mt-4 text-xl font-bold text-slate-900">Upload images</span>
            <span className="mt-2 text-slate-600">Drop images here or choose files · up to 20 images · JPG, PNG, WEBP · 10 MB each</span>
          </button>

          {images.length > 0 && (
            <>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Selected images ({images.length}/{MAX_FILES})</h2>
                  <p className="mt-1 text-sm text-slate-500">Remove any incorrect image with the × button before resizing.</p>
                </div>
                <button type="button" onClick={() => inputRef.current?.click()} disabled={images.length >= MAX_FILES} className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">
                  <FiFolderPlus aria-hidden="true" /> Add more
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {images.map(({ file }, index) => (
                  <span key={`${file.name}-${file.lastModified}-${index}`} className="inline-flex max-w-full items-center gap-2 rounded-full border border-teal-200 bg-teal-50 py-1.5 pl-3 pr-1.5 text-sm font-medium text-slate-700">
                    <span className="max-w-52 truncate" title={file.name}>{file.name}</span>
                    <button type="button" onClick={() => removeImage(index)} className="rounded-full p-1 text-slate-500 hover:bg-red-100 hover:text-red-600" aria-label={`Remove ${file.name}`}><FiX /></button>
                  </span>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-slate-200 p-5">
                <div className="flex rounded-xl bg-slate-100 p-1">
                  <button type="button" onClick={() => setMode("pixels")} className={`flex-1 rounded-lg py-2 text-sm font-semibold ${mode === "pixels" ? "bg-white text-teal-800 shadow-sm" : "text-slate-600"}`}>Pixels</button>
                  <button type="button" onClick={() => setMode("percentage")} className={`flex-1 rounded-lg py-2 text-sm font-semibold ${mode === "percentage" ? "bg-white text-teal-800 shadow-sm" : "text-slate-600"}`}>Percentage</button>
                </div>

                {mode === "pixels" ? (
                  <>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <label className="text-sm font-semibold text-slate-700">Width (px)
                        <input type="number" min="1" max={MAX_DIMENSION} value={width} onChange={(event) => changeWidth(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal" />
                      </label>
                      <label className="text-sm font-semibold text-slate-700">Height (px)
                        <input type="number" min="1" max={MAX_DIMENSION} value={height} onChange={(event) => changeHeight(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal" />
                      </label>
                    </div>
                    <button type="button" onClick={toggleLock} className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-teal-800">
                      {locked ? <FiLock aria-hidden="true" /> : <FiUnlock aria-hidden="true" />}
                      {locked ? "Lock aspect ratio on" : "Lock aspect ratio off"}
                    </button>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {locked
                        ? "Lock aspect ratio to resize your image proportionally without cropping or distortion."
                        : "Unlocking the ratio lets you set exact width and height independently, which may stretch or distort the image."}
                    </p>
                    {locked && (
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        The paired dimension updates automatically. The downloaded image keeps the full original picture; it will not be cropped or padded with a white canvas.
                      </p>
                    )}
                    <div className="mt-5 flex flex-wrap gap-2">
                      {presets.map(([presetWidth, presetHeight]) => (
                        <button key={`${presetWidth}-${presetHeight}`} type="button" onClick={() => applyPreset(presetWidth, presetHeight)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:border-teal-400 hover:text-teal-800">
                          {presetWidth} × {presetHeight}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="mt-5">
                    <label className="text-sm font-semibold text-slate-700">Resize percentage
                      <select value={percentage} onChange={(event) => setPercentage(Number(event.target.value))} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal">
                        {[25, 50, 75, 100, 150, 200].map((value) => <option key={value} value={value}>{value}%</option>)}
                      </select>
                    </label>
                    <p className="mt-3 text-sm text-slate-600">Each image is scaled by this percentage while keeping its own proportions. No cropping or extra background is added.</p>
                  </div>
                )}

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">Output format
                    <select value={format} onChange={(event) => setFormat(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 font-normal">
                      <option value="jpeg">JPG</option>
                      <option value="png">PNG</option>
                      <option value="webp">WebP</option>
                    </select>
                  </label>
                  <label className="text-sm font-semibold text-slate-700">Quality ({quality})
                    <input type="range" min="20" max="95" value={quality} disabled={format === "png"} onChange={(event) => setQuality(Number(event.target.value))} className="mt-3 w-full accent-teal-600 disabled:opacity-50" />
                    <span className="mt-1 block text-xs font-normal text-slate-500">{format === "png" ? "PNG uses lossless compression; quality does not apply." : "Applies to JPG and WebP output."}</span>
                  </label>
                </div>

                {first && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">Original: {first.width} × {first.height} px</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">Output preview: {previewSize.width} × {previewSize.height} px</p>
                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {locked || mode === "percentage"
                          ? images.length > 1
                            ? "Each file keeps its own aspect ratio. Sizes may differ from the first image."
                            : "The whole image stays visible. Nothing is cropped and no white bars are added."
                          : "Exact width and height will be used, which can stretch this image."}
                      </p>
                    </div>
                    <div className="flex justify-center rounded-2xl border border-slate-200 bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%,transparent_75%,#e2e8f0_75%),linear-gradient(45deg,#e2e8f0_25%,transparent_25%,transparent_75%,#e2e8f0_75%)] bg-[length:16px_16px] bg-[position:0_0,8px_8px] p-3">
                      <img
                        src={first.preview}
                        alt={`Resize preview for ${first.file.name}`}
                        width={Math.round(previewSize.width * previewScale)}
                        height={Math.round(previewSize.height * previewScale)}
                        className="max-h-80 bg-transparent"
                        style={{
                          width: Math.round(previewSize.width * previewScale),
                          height: Math.round(previewSize.height * previewScale),
                          objectFit: "fill",
                        }}
                      />
                    </div>
                  </div>
                )}

                <p className="mt-5 text-sm text-slate-500">
                  {mode === "percentage"
                    ? `All selected images will be scaled to ${percentage}% and packaged in one ZIP file.`
                    : locked
                      ? `Images will be resized from the ${anchor} you last changed, without cropping, and packaged in one ZIP file.`
                      : `All selected images will be stretched to ${width} × ${height} px and packaged in one ZIP file.`}
                </p>
                <button type="button" onClick={resize} disabled={isResizing} className="mt-5 w-full rounded-xl bg-teal-600 px-5 py-3.5 font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-400">
                  {isResizing ? "Resizing images..." : `Resize ${images.length} image${images.length > 1 ? "s" : ""} & create ZIP`}
                </button>
                <button type="button" onClick={reset} className="mt-3 w-full rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50">Start over</button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageResizerWorkspace;
