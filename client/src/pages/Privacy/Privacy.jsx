import Layout from "../../components/layout/Layout";
import Hero from "../../components/legal/Hero";
import LegalSection from "../../components/legal/LegalSection";

const Privacy = () => {
  return (
    <Layout>
      <main>
        <Hero
          badge="Privacy Policy"
          title="Privacy Policy"
          description="Learn how QuickPDFHD handles your information and protects your privacy while using our online Image to PDF conversion service."
        />

        <LegalSection title="Introduction">
          <p>
            Welcome to QuickPDFHD. We are committed to protecting your privacy
            while providing a fast and secure Image to PDF conversion service.
          </p>

          <p>
            By using our website, you agree to the practices described in this
            Privacy Policy.
          </p>
        </LegalSection>

        <LegalSection title="Information We Collect">
          <p>
            QuickPDFHD does not permanently store your uploaded images or PDF
            files.
          </p>

          <ul className="list-disc space-y-3 pl-6">
            <li>Uploaded image files (temporarily for conversion)</li>
            <li>Browser type</li>
            <li>Device information</li>
            <li>IP address</li>
            <li>Anonymous usage statistics</li>
          </ul>
        </LegalSection>

        <LegalSection title="How We Use Your Information">
          <ul className="list-disc space-y-3 pl-6">
            <li>Generate PDF files.</li>
            <li>Improve website performance.</li>
            <li>Fix bugs and technical issues.</li>
            <li>Maintain website security.</li>
          </ul>
        </LegalSection>

        <LegalSection title="Cookies">
          <p>
            We may use cookies to improve your browsing experience, remember
            your preferences, and analyze website traffic.
          </p>
        </LegalSection>

        <LegalSection title="Data Security">
          <p>
            All uploaded files are processed securely and are automatically
            removed after processing. We do not sell or share your files with
            third parties.
          </p>
        </LegalSection>

        <LegalSection title="Third-Party Services">
          <p>
            We may use trusted third-party services such as Google Analytics and
            Google AdSense to improve our website and display relevant content.
          </p>
        </LegalSection>

        <LegalSection title="Children's Privacy">
          <p>
            QuickPDFHD is not intended for children under the age of 13. We do
            not knowingly collect personal information from children.
          </p>
        </LegalSection>

        <LegalSection title="Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page.
          </p>
        </LegalSection>

        <LegalSection title="Contact Us">
          <p>
            If you have any questions regarding this Privacy Policy, please
            visit our Contact page.
          </p>
        </LegalSection>
      </main>
    </Layout>
  );
};

export default Privacy;
