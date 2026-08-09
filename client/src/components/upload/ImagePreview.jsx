import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import useImageUpload from "../../hooks/useImageUpload";
import PreviewCard from "./PreviewCard";

const ImagePreview = () => {
  const { images, clearImages, reorderImages } = useImageUpload();

  const handleClearAll = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove all selected images?",
    );

    if (confirmDelete) {
      clearImages();
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    if (active.id === over.id) return;

    reorderImages(active.id, over.id);
  };

  if (!images.length) {
    return (
      <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-10 text-center">
        <h3 className="text-lg font-semibold text-slate-700">
          No Images Selected
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Upload one or more JPG, PNG or WEBP images to preview them here.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-10">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Selected Images ({images.length})
        </h2>

        <button
          onClick={handleClearAll}
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
        >
          Clear All
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={images.map((image) => image.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {images.map((image) => (
              <PreviewCard key={image.id} image={image} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </section>
  );
};

export default ImagePreview;
