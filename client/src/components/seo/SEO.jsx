import { useEffect } from "react";

const SEO = ({
  title = "QuickPDFHD – Online PDF, Word, Excel, and Image Tools",
  description = "Convert Word and Excel to PDF, extract PDF text, split or merge PDFs, create PDFs from images, scan document photos, and resize images in your browser.",
  canonical = "https://quickpdfhd.com/",
  ogImage = "https://quickpdfhd.com/quickPDFHD_logo.png",
  structuredData,
  robots = "index,follow",
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
    setMetaTag("name", "robots", robots);

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

    const schemaId = "quickpdfhd-structured-data";
    const existingSchema = document.getElementById(schemaId);

    if (structuredData) {
      const schemaScript = existingSchema || document.createElement("script");
      schemaScript.id = schemaId;
      schemaScript.type = "application/ld+json";
      schemaScript.textContent = JSON.stringify(structuredData);

      if (!existingSchema) document.head.appendChild(schemaScript);
    } else {
      existingSchema?.remove();
    }
  }, [title, description, canonical, ogImage, structuredData, robots]);

  return null;
};

export default SEO;
