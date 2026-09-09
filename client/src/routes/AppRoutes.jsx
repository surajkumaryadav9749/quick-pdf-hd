import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HashFocus from "../components/common/HashFocus";

import Home from "../pages/Home/Home";
const About = lazy(() => import("../pages/About/About"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const Privacy = lazy(() => import("../pages/Privacy/Privacy"));
const Terms = lazy(() => import("../pages/Terms/Terms"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const JpgToPdf = lazy(() => import("../pages/ImageToPdf/JpgToPdf"));
const PngToPdf = lazy(() => import("../pages/ImageToPdf/PngToPdf"));
const JpegToPdf = lazy(() => import("../pages/ImageToPdf/JpegToPdf"));
const WebpToPdf = lazy(() => import("../pages/ImageToPdf/WebpToPdf"));
const DocumentScanner = lazy(() => import("../pages/DocumentScanner/DocumentScanner"));
const PdfToZip = lazy(() => import("../pages/PdfToZip/PdfToZip"));
const ResizeImage = lazy(() => import("../pages/ResizeImage/ResizeImage"));
const AllServices = lazy(() => import("../pages/AllServices/AllServices"));
const WordToPdf = lazy(() => import("../pages/PdfTools/WordToPdf"));
const PdfToWord = lazy(() => import("../pages/PdfTools/PdfToWord"));
const ExcelToPdf = lazy(() => import("../pages/PdfTools/ExcelToPdf"));
const PdfToExcel = lazy(() => import("../pages/PdfTools/PdfToExcel"));
const SplitPdf = lazy(() => import("../pages/PdfTools/SplitPdf"));
const MergePdf = lazy(() => import("../pages/PdfTools/MergePdf"));
const PdfToJpg = lazy(() => import("../pages/PdfTools/PdfToJpg"));
const PdfGuides = lazy(() => import("../pages/PdfGuides/PdfGuides").then((module) => ({ default: module.PdfGuides })));
const PdfGuide = lazy(() => import("../pages/PdfGuides/PdfGuides").then((module) => ({ default: module.PdfGuide })));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <HashFocus />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Image to PDF SEO Pages */}
          <Route path="/jpg-to-pdf" element={<JpgToPdf />} />
          <Route path="/png-to-pdf" element={<PngToPdf />} />
          <Route path="/jpeg-to-pdf" element={<JpegToPdf />} />
          <Route path="/webp-to-pdf" element={<WebpToPdf />} />
          <Route path="/word-to-pdf" element={<WordToPdf />} />
          <Route path="/pdf-to-word" element={<PdfToWord />} />
          <Route path="/excel-to-pdf" element={<ExcelToPdf />} />
          <Route path="/pdf-to-excel" element={<PdfToExcel />} />
          <Route path="/split-pdf" element={<SplitPdf />} />
          <Route path="/merge-pdf" element={<MergePdf />} />
          <Route path="/pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="/document-scanner" element={<DocumentScanner />} />
          <Route path="/pdf-to-zip" element={<PdfToZip />} />
          <Route path="/resize-image" element={<ResizeImage />} />
          <Route path="/all-services" element={<AllServices />} />
          <Route path="/pdf-guides" element={<PdfGuides />} />
          <Route path="/pdf-guides/:slug" element={<PdfGuide />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
