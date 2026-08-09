import Layout from "../../components/layout/Layout";

import Hero from "../../components/contact/Hero";
import ContactInfo from "../../components/contact/ContactInfo";
import ContactForm from "../../components/contact/ContactForm";
import FAQ from "../../components/contact/FAQ";
import CTA from "../../components/contact/CTA";

const Contact = () => {
  return (
    <Layout>
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
