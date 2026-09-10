import Layout from "../../components/layout/Layout";

import Hero from "../../components/about/Hero";
import AboutQuickPDFHD from "../../components/about/AboutQuickPDFHD";
import WhyChooseUs from "../../components/about/WhyChooseUs";
import Features from "../../components/about/Features";
import Mission from "../../components/about/Mission";
import CTA from "../../components/about/CTA";
import SEO from "../../components/seo/SEO";

const About = () => {
  return (
    <Layout>
      <SEO title="About QuickPDFHD | Online PDF and Image Tools" description="Learn what QuickPDFHD offers: browser-based tools for PDF, Word, Excel, and image files, including conversion, split, merge, scanning, and resizing." canonical="https://quickpdfhd.com/about" />
      <main>
        <Hero />
        <AboutQuickPDFHD />
        <WhyChooseUs />
        <Features />
        <Mission />
        <CTA />
      </main>
    </Layout>
  );
};

export default About;
