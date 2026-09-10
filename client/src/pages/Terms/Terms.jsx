import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Hero from "../../components/legal/Hero";
import LegalSection from "../../components/legal/LegalSection";
import SEO from "../../components/seo/SEO";

const Terms = () => {
  return (
    <Layout>
      <SEO title="Terms and Conditions | QuickPDFHD" description="Read the terms for using QuickPDFHD's online PDF, Word, Excel, and image tools." canonical="https://quickpdfhd.com/terms" />
      <main>
        <Hero
          badge="Terms & Conditions"
          title="Terms and Conditions"
          description="Please read these Terms and Conditions before using QuickPDFHD and its online PDF and image tools."
        />

        <LegalSection title="Acceptance of Terms">
          <p>
            By accessing and using QuickPDFHD, you agree to be bound by these
            Terms and Conditions. If you do not agree with any part of these
            terms, please do not use our website.
          </p>
        </LegalSection>

        <LegalSection title="Use of Our Service">
          <ul className="list-disc space-y-3 pl-6">
            <li>Use the service only for lawful purposes.</li>
            <li>Do not upload harmful, illegal or malicious files.</li>
            <li>Do not attempt to misuse or disrupt our services.</li>
            <li>Respect all applicable laws while using QuickPDFHD.</li>
            <li>Follow the file-type, size, and page limits shown on each tool page. The service is not unlimited.</li>
          </ul>
        </LegalSection>

        <LegalSection title="Intellectual Property">
          <p>
            All website content, branding, logos and design elements belong to
            QuickPDFHD unless otherwise stated. Unauthorized reproduction or
            distribution is prohibited.
          </p>
        </LegalSection>

        <LegalSection title="File Processing">
          <p>
            Uploaded files are processed to generate the requested PDF, Word,
            Excel, image, or ZIP download. The application uses memory storage
            for conversion requests and does not include a feature that writes
            uploaded files to its own disk or database. You remain responsible
            for the files you choose to upload and for checking the output
            before you rely on it.
          </p>
        </LegalSection>

        <LegalSection title="Limitation of Liability">
          <p>
            QuickPDFHD is provided "as is" without warranties of any kind. We
            are not responsible for any loss, damage or interruption resulting
            from the use of our services.
          </p>
        </LegalSection>

        <LegalSection title="Service Availability">
          <p>
            QuickPDFHD is provided on an as-available basis. Tool availability,
            processing time, and output may vary with file size, file content,
            browser, network, and service conditions.
          </p>
        </LegalSection>

        <LegalSection title="Third-Party Services">
          <p>
            Our website may integrate third-party services such as Google
            Analytics and Google AdSense. Their use is governed by their
            respective policies.
          </p>
        </LegalSection>

        <LegalSection title="Changes to the Terms">
          <p>
            We reserve the right to update these Terms and Conditions at any
            time. Continued use of QuickPDFHD after changes are posted
            constitutes acceptance of the updated terms.
          </p>
        </LegalSection>

        <LegalSection title="Contact">
          <p>
            If you have any questions regarding these Terms and Conditions,
            please use the form on the{" "}
            <Link to="/contact" className="font-semibold text-teal-800 hover:underline">Contact</Link> page.
          </p>
        </LegalSection>
      </main>
    </Layout>
  );
};

export default Terms;
