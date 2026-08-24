import Layout from "../../components/layout/Layout";

import Hero from "../../components/contact/Hero";
import ContactInfo from "../../components/contact/ContactInfo";
import ContactForm from "../../components/contact/ContactForm";
import FAQ from "../../components/contact/FAQ";
import CTA from "../../components/contact/CTA";
import SEO from "../../components/seo/SEO";

const Contact = () => {
  return (
    <Layout>
      <SEO title="Contact QuickPDFHD | Help and Feedback" description="Contact QuickPDFHD with questions, feedback, or issues related to its online PDF tools." canonical="https://quickpdfhd.com/contact" />
      <main>
        <Hero />
        <ContactInfo />
        <ContactForm />
        <FAQ />
        <CTA />
      </main>
    </Layout>
  );
};

export default Contact;
