import Layout from "../../components/layout/Layout";
import HowToSection from "../../components/seo/HowToSection";
import RelatedTools from "../../components/seo/RelatedTools";

import HeroSection from "../../components/home/HeroSection";
import ImageToPdfTools from "../../components/home/ImageToPdfTools";
import FeaturesSection from "../../components/home/FeaturesSection";
import HowItWorks from "../../components/home/HowItWorks";
import FAQSection from "../../components/home/FAQSection";

import SEO from "../../components/seo/SEO";

const Home = () => {
  return (
    <Layout>
      <SEO
        title="QuickPDFHD - Free Online PDF Tools"
        description="QuickPDFHD provides free online PDF tools to convert images to PDF, create PDFs, and manage your documents quickly and easily."
        canonical="https://quickpdfhd.com/"
        structuredData={{ "@context": "https://schema.org", "@graph": [{ "@type": "WebSite", name: "QuickPDFHD", url: "https://quickpdfhd.com/" }, { "@type": "WebApplication", name: "QuickPDFHD", url: "https://quickpdfhd.com/", applicationCategory: "UtilitiesApplication", operatingSystem: "Web", description: "Online tools for converting image files and document photos into PDF documents." }] }}
      />

      <main>
        <HeroSection />

        <ImageToPdfTools />

        <FeaturesSection />

        <HowItWorks />

        <HowToSection />

        <RelatedTools />

        <FAQSection />
      </main>
    </Layout>
  );
};

export default Home;
