import Layout from "../../components/layout/Layout";
import Hero from "../../components/notFound/Hero";
import SEO from "../../components/seo/SEO";

const NotFound = () => {
  return (
    <Layout>
      <SEO title="Page Not Found | QuickPDFHD" description="The requested QuickPDFHD page could not be found." canonical="https://quickpdfhd.com/" robots="noindex,follow" />
      <Hero />
    </Layout>
  );
};

export default NotFound;
