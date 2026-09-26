const site = "https://quickpdfhd.com";

const privacyNote =
  "Files are uploaded to the conversion server only for the current request and processed in memory. QuickPDFHD does not maintain a user file library or long-term file database. Converted images are returned directly to your browser session. See our Privacy Policy for details.";

export const imageConversionTools = {
  "webp-to-jpg": {
    id: "webp-to-jpg",
    name: "WebP to JPG",
    path: "/webp-to-jpg",
    canonical: `${site}/webp-to-jpg`,
    title: "WebP to JPG Converter Online – Convert WEBP to JPG Free | QuickPDFHD",
    description:
      "Convert WebP images to JPG online. Convert single or multiple WEBP files to high-quality JPG format with white background for transparent areas. Free in-browser tool.",
    heading: "Convert WebP Images to JPG Online",
    intro:
      "Turn WebP images into standard JPG files for universal compatibility with photo viewers, design applications, office software, and printing services. Upload up to 20 WebP files and download them individually or in a batch.",
    badge: "WebP to JPG Converter",
    targetFormat: "jpg",
    accept: ".webp,image/webp",
    extensions: [".webp"],
    mimeTypes: ["image/webp"],
    maxFiles: 20,
    maxSize: 10 * 1024 * 1024,
    maxSizeLabel: "10 MB per file",
    formatsLabel: "WebP (.webp)",
    outputFormatLabel: "JPG (.jpg)",
    uploadTitle: "Upload WebP images",
    uploadHint: "Drop .webp files here or choose from your device · Up to 20 images · 10 MB maximum each",
    actionLabel: "Convert WebP to JPG",
    processingLabel: "Converting WebP images to JPG...",
    successTitle: "Your JPG files are ready",
    downloadLabel: "Download JPG",
    downloadAllLabel: "Save All JPG Files",
    downloadName: "converted.jpg",
    howTitle: "How to convert WebP to JPG",
    howIntro:
      "WebP is heavily compressed for modern browsers, but older editors, email clients, and printing kiosks often fail to recognize it. This tool converts WebP pixel streams into standard baseline JPEG files with preserved EXIF orientation and white background for any transparent regions.",
    steps: [
      {
        title: "Select your WebP files",
        description: "Upload up to 20 .webp images from your phone, tablet, or desktop computer.",
      },
      {
        title: "Process the conversion",
        description: "Click Convert WebP to JPG. Images are processed in server memory using Sharp.",
      },
      {
        title: "Download your JPGs",
        description: "Save individual JPG files or download the full set directly to your storage.",
      },
    ],
    features: [
      {
        title: "Universal Compatibility",
        description:
          "JPG is supported by virtually every operating system, photo editor, hardware printer, and web portal worldwide.",
      },
      {
        title: "Clean Transparency Handling",
        description:
          "JPEG does not support alpha transparency. Transparent areas in your WebP are blended onto a clean white background rather than rendering as black boxes.",
      },
      {
        title: "Orientation Preserved",
        description:
          "Camera and device rotation tags are automatically normalized so your converted pictures remain upright.",
      },
    ],
    transparencyNote:
      "Because JPEG does not have an alpha transparency channel, any transparent pixels in the original WebP image will be filled with clean white background.",
    privacy: privacyNote,
    related: ["/webp-to-png", "/png-to-jpg", "/jpg-to-png", "/webp-to-pdf", "/resize-image"],
    faqs: [
      {
        question: "Why should I convert WebP to JPG?",
        answer:
          "WebP is optimized for browser transfer, but many desktop programs, legacy image viewers, older Microsoft Office versions, and photo printing services still do not open .webp files. JPG is universally accepted across all devices and software.",
      },
      {
        question: "What happens to transparent areas in the WebP image?",
        answer:
          "JPEG does not support transparency. When you convert a transparent WebP to JPG, the transparent parts are automatically rendered against a crisp white background so there are no black boxes or artifacts.",
      },
      {
        question: "Can I convert multiple WebP images at once?",
        answer:
          "Yes. You can upload up to 20 WebP files at a time (up to 10 MB each) and convert them together in a single batch.",
      },
      {
        question: "Will image quality decrease during conversion?",
        answer:
          "We encode JPG files using high-quality settings with mozjpeg optimization to keep your photographs sharp while minimizing unnecessary file size.",
      },
      {
        question: "Does converting WebP to JPG preserve image dimensions?",
        answer:
          "Yes. The pixel width and height of each image remain identical. Only the compression format is changed.",
      },
      {
        question: "Are my uploaded WebP files stored on the server?",
        answer:
          "No. Uploaded images are processed entirely in memory and never saved into a persistent user file library. Once the conversion finishes, memory is cleared.",
      },
    ],
  },

  "webp-to-png": {
    id: "webp-to-png",
    name: "WebP to PNG",
    path: "/webp-to-png",
    canonical: `${site}/webp-to-png`,
    title: "WebP to PNG Converter Online – Convert WEBP to PNG with Alpha | QuickPDFHD",
    description:
      "Convert WebP to PNG online while preserving full alpha transparency and sharp details. Fast, free, browser-based conversion with no account required.",
    heading: "Convert WebP Images to PNG Online",
    intro:
      "Convert WebP images into lossless PNG format while keeping full transparency intact. Ideal for icons, logos, illustrations, and transparent UI assets that need editing in desktop graphics tools.",
    badge: "WebP to PNG Converter",
    targetFormat: "png",
    accept: ".webp,image/webp",
    extensions: [".webp"],
    mimeTypes: ["image/webp"],
    maxFiles: 20,
    maxSize: 10 * 1024 * 1024,
    maxSizeLabel: "10 MB per file",
    formatsLabel: "WebP (.webp)",
    outputFormatLabel: "PNG (.png)",
    uploadTitle: "Upload WebP images",
    uploadHint: "Drop .webp files here or choose from your device · Up to 20 images · 10 MB maximum each",
    actionLabel: "Convert WebP to PNG",
    processingLabel: "Converting WebP images to PNG...",
    successTitle: "Your PNG files are ready",
    downloadLabel: "Download PNG",
    downloadAllLabel: "Save All PNG Files",
    downloadName: "converted.png",
    howTitle: "How to convert WebP to PNG",
    howIntro:
      "Both WebP and PNG support transparency, but PNG has universal support in image editing suites like Photoshop, Illustrator, GIMP, and Figma. This tool extracts the pixel data and alpha channel from WebP and saves it as an uncompressed, standard 24-bit/32-bit PNG file.",
    steps: [
      {
        title: "Upload WebP files",
        description: "Choose or drag up to 20 .webp images into the converter box.",
      },
      {
        title: "Run the conversion",
        description: "Click Convert WebP to PNG. The conversion engine translates the WebP frames to PNG.",
      },
      {
        title: "Download PNG results",
        description: "Download each PNG file with full transparency preserved for your creative projects.",
      },
    ],
    features: [
      {
        title: "Alpha Transparency Preserved",
        description:
          "Transparent backgrounds in logos, badges, and cutout graphics remain 100% transparent in the resulting PNG.",
      },
      {
        title: "Lossless Quality",
        description:
          "PNG output uses lossless compression, ensuring no additional compression artifacts or color degrading are introduced.",
      },
      {
        title: "Graphic Design Ready",
        description:
          "PNG files can be dragged directly into graphic design software, slide presentations, and video editors without format errors.",
      },
    ],
    transparencyNote:
      "Alpha transparency is fully preserved. If your original WebP had a transparent background, the resulting PNG will maintain that transparent background.",
    privacy: privacyNote,
    related: ["/webp-to-jpg", "/jpg-to-png", "/png-to-jpg", "/png-to-pdf", "/resize-image"],
    faqs: [
      {
        question: "Does WebP to PNG keep transparency?",
        answer:
          "Yes. Full alpha channel transparency is preserved. If your WebP image has a transparent background, the resulting PNG will also have a transparent background.",
      },
      {
        question: "Why does the PNG file size look larger than the original WebP?",
        answer:
          "WebP uses modern predictive compression algorithms designed for lightweight web delivery. PNG uses lossless DEFLATE compression, which is heavier but provides pixel-exact data compatibility with creative software.",
      },
      {
        question: "Can I convert animated WebP to PNG?",
        answer:
          "Still WebP images convert cleanly to standard PNG. For multi-frame animations, the primary keyframe is rendered into a high-resolution still PNG.",
      },
      {
        question: "What is the upload size limit?",
        answer:
          "You can convert up to 20 WebP files per batch, with each file up to 10 MB in size.",
      },
      {
        question: "Do I need to install any software or plugins?",
        answer:
          "No. All conversions happen through the web interface in your browser without requiring extensions, software installations, or account registration.",
      },
    ],
  },

  "jpg-to-png": {
    id: "jpg-to-png",
    name: "JPG to PNG",
    path: "/jpg-to-png",
    canonical: `${site}/jpg-to-png`,
    title: "JPG to PNG Converter Online – Convert JPG to PNG Free | QuickPDFHD",
    description:
      "Convert JPG and JPEG images to PNG format online. Protect your pictures from generational compression loss. Free, fast, and secure in-memory processing.",
    heading: "Convert JPG Images to PNG Online",
    intro:
      "Convert JPG or JPEG photos, diagrams, and digital graphics into lossless PNG files. Prevent further compression artifacts during repeated edits and prepare your files for design workflows.",
    badge: "JPG to PNG Converter",
    targetFormat: "png",
    accept: ".jpg,.jpeg,image/jpeg",
    extensions: [".jpg", ".jpeg"],
    mimeTypes: ["image/jpeg"],
    maxFiles: 20,
    maxSize: 10 * 1024 * 1024,
    maxSizeLabel: "10 MB per file",
    formatsLabel: "JPG and JPEG (.jpg, .jpeg)",
    outputFormatLabel: "PNG (.png)",
    uploadTitle: "Upload JPG images",
    uploadHint: "Drop .jpg or .jpeg files here or choose from your device · Up to 20 images · 10 MB maximum each",
    actionLabel: "Convert JPG to PNG",
    processingLabel: "Converting JPG images to PNG...",
    successTitle: "Your PNG files are ready",
    downloadLabel: "Download PNG",
    downloadAllLabel: "Save All PNG Files",
    downloadName: "converted.png",
    howTitle: "How to convert JPG to PNG",
    howIntro:
      "Every time a JPG is re-saved in an editor, lossy compression is reapplied. Converting JPG to PNG halts generational degradation because PNG is a lossless format. While converting does not remove existing JPG compression artifacts, it guarantees that subsequent saves won't degrade the image further.",
    steps: [
      {
        title: "Select your JPG files",
        description: "Upload up to 20 .jpg or .jpeg images from your computer or phone.",
      },
      {
        title: "Initiate conversion",
        description: "Click Convert JPG to PNG. Each file is decoded and encoded into lossless PNG format.",
      },
      {
        title: "Download PNG files",
        description: "Save the converted PNGs to your device for continued editing or archiving.",
      },
    ],
    features: [
      {
        title: "Stop Compression Artifacts",
        description:
          "Subsequent edits and saves in PNG format will not introduce new lossy JPEG compression blockiness.",
      },
      {
        title: "Wide Application Support",
        description:
          "PNG is the standard bitmap format for digital illustrations, web graphics, and document embeds.",
      },
      {
        title: "Batch Processing",
        description:
          "Convert multiple JPG files simultaneously to speed up photography and document prep workflows.",
      },
    ],
    transparencyNote:
      "Please note: Original JPG files do not contain transparency channels. Converting a JPG to PNG will not automatically remove solid backgrounds or make them transparent.",
    privacy: privacyNote,
    related: ["/png-to-jpg", "/webp-to-png", "/webp-to-jpg", "/jpg-to-pdf", "/resize-image"],
    faqs: [
      {
        question: "Does converting JPG to PNG make the background transparent?",
        answer:
          "No. Original JPG files have no alpha transparency channel (backgrounds are solid white, black, or color). Converting to PNG wraps the existing pixels into the PNG container. It does not cut out subjects or remove backgrounds.",
      },
      {
        question: "Why should I convert a JPG to PNG?",
        answer:
          "When you plan to edit an image multiple times, each JPEG save degrades image quality through re-compression. Converting to PNG freezes the quality so future edits in PNG remain completely lossless.",
      },
      {
        question: "Will the converted PNG file have higher visual resolution?",
        answer:
          "No converter can recreate image detail that was already lost during original JPEG encoding. The PNG will look visually identical to the source JPG, but won't lose further quality when saved.",
      },
      {
        question: "Can I convert both .jpg and .jpeg files?",
        answer:
          "Yes. JPG and JPEG refer to the same underlying file format and are both accepted interchangeably up to 20 files.",
      },
      {
        question: "What is the maximum file size?",
        answer:
          "Each uploaded JPG file can be up to 10 MB in size.",
      },
    ],
  },

  "png-to-jpg": {
    id: "png-to-jpg",
    name: "PNG to JPG",
    path: "/png-to-jpg",
    canonical: `${site}/png-to-jpg`,
    title: "PNG to JPG Converter Online – Reduce Image File Size | QuickPDFHD",
    description:
      "Convert PNG to JPG online to significantly reduce file size for sharing, emailing, and web upload. Fast, free in-browser converter with smart white background fill.",
    heading: "Convert PNG Images to JPG Online",
    intro:
      "Convert heavy PNG screenshots, photos, and graphics into compact JPG files. Drastically reduce file size for email attachments, online forms, job portals, and website uploads.",
    badge: "PNG to JPG Converter",
    targetFormat: "jpg",
    accept: ".png,image/png",
    extensions: [".png"],
    mimeTypes: ["image/png"],
    maxFiles: 20,
    maxSize: 10 * 1024 * 1024,
    maxSizeLabel: "10 MB per file",
    formatsLabel: "PNG (.png)",
    outputFormatLabel: "JPG (.jpg)",
    uploadTitle: "Upload PNG images",
    uploadHint: "Drop .png files here or choose from your device · Up to 20 images · 10 MB maximum each",
    actionLabel: "Convert PNG to JPG",
    processingLabel: "Converting PNG images to JPG...",
    successTitle: "Your JPG files are ready",
    downloadLabel: "Download JPG",
    downloadAllLabel: "Save All JPG Files",
    downloadName: "converted.jpg",
    howTitle: "How to convert PNG to JPG",
    howIntro:
      "PNG images—especially screenshots and camera photos—can be 5 to 10 times larger than necessary for sharing. This converter transforms PNG files into optimized JPG images. If your PNG contains transparent pixels, they are cleanly filled with a solid white background to eliminate dark borders or black box glitches.",
    steps: [
      {
        title: "Select PNG images",
        description: "Upload up to 20 PNG files from your computer, smartphone, or tablet.",
      },
      {
        title: "Convert to JPG",
        description: "Click Convert PNG to JPG. Transparent areas are automatically filled with clean white.",
      },
      {
        title: "Download smaller files",
        description: "Download your compressed, lightweight JPGs ready for emailing or uploading.",
      },
    ],
    features: [
      {
        title: "Dramatic Size Reduction",
        description:
          "Convert heavy multi-megabyte PNG screenshots and images into lightweight JPGs that are quick to transfer.",
      },
      {
        title: "Smart White Background",
        description:
          "Transparent areas are smoothly flattened onto white so your images look professional and clean.",
      },
      {
        title: "Universal Portal Acceptance",
        description:
          "Satisfy submission guidelines for government, university, and employment portals that exclusively accept JPG files.",
      },
    ],
    transparencyNote:
      "JPEG format does not support transparency. Any transparent or semi-transparent areas in the source PNG will be filled with a solid white background in the converted JPG.",
    privacy: privacyNote,
    related: ["/jpg-to-png", "/webp-to-jpg", "/webp-to-png", "/png-to-pdf", "/resize-image"],
    faqs: [
      {
        question: "Why should I convert PNG to JPG?",
        answer:
          "PNG files are uncompressed or losslessly compressed, often making them huge (5 MB to 15 MB). Converting to JPG can reduce file size by 70% to 90% while maintaining excellent visual fidelity, making them much easier to email or upload.",
      },
      {
        question: "What happens to transparent areas in my PNG?",
        answer:
          "Because JPEG does not support transparency, our converter blends transparent regions onto a solid white background. This ensures that icons and logos do not render with black boxes or visual corruption.",
      },
      {
        question: "Can I convert multiple PNG files at once?",
        answer:
          "Yes. You can upload and convert up to 20 PNG files at a time, up to 10 MB per image.",
      },
      {
        question: "Is there any quality loss when converting to JPG?",
        answer:
          "JPG is a lossy compression format, but we use high-quality encoding (quality level 88 with mozjpeg optimization) which is virtually indistinguishable to the human eye for photographs and illustrations.",
      },
      {
        question: "Does this tool work on mobile phones?",
        answer:
          "Yes. QuickPDFHD works directly in mobile browsers on iOS and Android devices without installing third-party apps.",
      },
    ],
  },
};

export const imageConversionToolList = Object.values(imageConversionTools);

export default imageConversionTools;
