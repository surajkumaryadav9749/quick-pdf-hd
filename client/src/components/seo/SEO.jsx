import { useEffect } from "react";

const SEO = ({
  title = "QuickPDFHD - Free Online PDF Tools",
  description = "QuickPDFHD provides free online PDF tools to convert images to PDF, create PDFs, and manage your documents quickly and easily.",
  canonical = "https://quickpdfhd.com/",
  ogImage = "https://quickpdfhd.com/quickPDFHD_logo.png",
}) => {
  useEffect(() => {
    // Update page title
    document.title = title;

    // Helper function for meta tags
    const setMetaTag = (attribute, value, content) => {
      let element = document.head.querySelector(
        `meta[${attribute}="${value}"]`,
      );

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Basic SEO
    setMetaTag("name", "description", description);

    // Open Graph
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:url", canonical);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:site_name", "QuickPDFHD");

    // Twitter / X
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);

    // Canonical
    let canonicalLink = document.head.querySelector('link[rel="canonical"]');

    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute("href", canonical);
  }, [title, description, canonical, ogImage]);

  return null;
};

export default SEO;
