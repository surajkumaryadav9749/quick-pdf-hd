import Layout from "../../components/layout/Layout";

import HeroSection from "../../components/home/HeroSection";
import FeaturesSection from "../../components/home/FeaturesSection";
import HowItWorks from "../../components/home/HowItWorks";
import FAQSection from "../../components/home/FAQSection";

const Home = () => {
  return (
    <Layout>
      <main>
        <HeroSection />

        <FeaturesSection />

        <HowItWorks />

        <FAQSection />
      </main>
    </Layout>
  );
};

export default Home;
