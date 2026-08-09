import UploadBox from "../upload/UploadBox";
import ImagePreview from "../upload/ImagePreview";
import ConvertButton from "../upload/ConvertButton";

const UploadSection = () => {
  return (
    <div aria-label="Image to PDF converter" className="w-full">
      <UploadBox />

      <ImagePreview />

      <ConvertButton />
    </div>
  );
};

export default UploadSection;
