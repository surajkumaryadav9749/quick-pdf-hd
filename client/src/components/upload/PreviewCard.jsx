import { useEffect, useMemo, useState } from "react";
import { FiImage, FiTrash2, FiMove } from "react-icons/fi";
import useImageUpload from "../../hooks/useImageUpload";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const PreviewCard = ({ image }) => {
  const [previewUrl, setPreviewUrl] = useState("");

  const { removeImage } = useImageUpload();

  // dnd-kit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: image.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
    opacity: isDragging ? 0.8 : 1,
  };

  useEffect(() => {
    const objectUrl = URL.createObjectURL(image.file);

    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [image]);

  const fileName = useMemo(() => {
    if (image.file.name.length <= 22) return image.file.name;

    return image.file.name.slice(0, 22) + "...";
  }, [image]);

  const fileType = image.file.type.split("/")[1].toUpperCase();

  const fileSize = (image.file.size / 1024 / 1024).toFixed(2);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl

        ${isDragging ? "rotate-2 shadow-2xl ring-2 ring-blue-500" : ""}
      `}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={previewUrl}
          alt={`Preview of ${image.file.name}`}
          className="h-full w-full object-cover"
        />

        {/* Drag Handle */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          title="Drag to reorder"
          className="absolute left-3 top-3 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-blue-600 hover:text-white cursor-grab active:cursor-grabbing"
        >
          <FiMove size={18} />
        </button>

        {/* Delete Button */}
        <button
          type="button"
          onClick={() => removeImage(image.id)}
          title="Remove Image"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-md transition hover:bg-red-500 hover:text-white"
        >
          <FiTrash2 size={18} />
        </button>
      </div>

      {/* Info */}
      <div className="space-y-3 p-5">
        <div className="flex items-center gap-2">
          <FiImage className="text-slate-500" />

          <h3
            title={image.file.name}
            className="truncate font-semibold text-slate-800"
          >
            {fileName}
          </h3>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">
            {fileType}
          </span>

          <span className="text-slate-500">{fileSize} MB</span>
        </div>

        <div className="flex justify-end">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            ✓ Ready
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
