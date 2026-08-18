import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

const AppRoutes = () => {
  return (
    <BrowserRouter>
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

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
