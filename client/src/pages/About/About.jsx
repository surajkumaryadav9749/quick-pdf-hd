import Layout from "../../components/layout/Layout";

import Hero from "../../components/about/Hero";
import AboutQuickPDFHD from "../../components/about/AboutQuickPDFHD";
import WhyChooseUs from "../../components/about/WhyChooseUs";
import Features from "../../components/about/Features";
import Mission from "../../components/about/Mission";
import CTA from "../../components/about/CTA";

const About = () => {
  return (
    <Layout>
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
