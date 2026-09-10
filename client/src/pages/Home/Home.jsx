import Layout from "../../components/layout/Layout";
import HowToSection from "../../components/seo/HowToSection";
import HomeGuides from "../../components/home/HomeGuides";
import FAQSection from "../../components/home/FAQSection";
import { homeFaqs } from "../../config/homeFaqs";

import HeroSection from "../../components/home/HeroSection";
import ImageToPdfTools from "../../components/home/ImageToPdfTools";
import FeaturesSection from "../../components/home/FeaturesSection";
import HowItWorks from "../../components/home/HowItWorks";
import HomeCta from "../../components/home/HomeCta";

import SEO from "../../components/seo/SEO";

const Home = () => {
  return (
    <Layout>
      <SEO
        title="QuickPDFHD – Online PDF, Word, Excel, and Image Tools"
        description="Convert Word and Excel to PDF, extract PDF text, split or merge PDFs, create PDFs from images, scan document photos, and resize images in your browser."
        canonical="https://quickpdfhd.com/"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", name: "QuickPDFHD", url: "https://quickpdfhd.com/" },
            {
              "@type": "WebApplication",
              name: "QuickPDFHD",
              url: "https://quickpdfhd.com/",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Web",
              description: "Browser-based tools for converting and organizing PDF, Word, Excel, and image files.",
            },
            {
              "@type": "FAQPage",
              mainEntity: homeFaqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ],
        }}
      />

      <main>
        <HeroSection />
        <ImageToPdfTools />
        <FeaturesSection />
        <HowItWorks />
        <HowToSection />
        <HomeGuides />
        <FAQSection />
        <HomeCta />
      </main>
    </Layout>
  );
};

export default Home;
