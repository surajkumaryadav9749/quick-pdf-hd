import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Privacy from "../pages/Privacy/Privacy";
import Terms from "../pages/Terms/Terms";
import NotFound from "../pages/NotFound/NotFound";

import JpgToPdf from "../pages/ImageToPdf/JpgToPdf";
import PngToPdf from "../pages/ImageToPdf/PngToPdf";
import JpegToPdf from "../pages/ImageToPdf/JpegToPdf";
import WebpToPdf from "../pages/ImageToPdf/WebpToPdf";

const AppRoutes = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default AppRoutes;
