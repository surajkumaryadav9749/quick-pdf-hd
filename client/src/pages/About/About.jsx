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
      <SEO title="About QuickPDFHD | Online Image to PDF Tools" description="Learn what QuickPDFHD offers: practical browser-based tools for turning image files and document photos into PDF documents." canonical="https://quickpdfhd.com/about" />
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
