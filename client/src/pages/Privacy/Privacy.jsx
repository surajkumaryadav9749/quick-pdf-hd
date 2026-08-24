import Layout from "../../components/layout/Layout";
import Hero from "../../components/legal/Hero";
import LegalSection from "../../components/legal/LegalSection";
import SEO from "../../components/seo/SEO";

const Privacy = () => {
  return (
    <Layout>
      <SEO
        title="Privacy Policy | QuickPDFHD"
        description="Learn how QuickPDFHD handles uploaded files, contact-form information, analytics, and advertising services."
        canonical="https://quickpdfhd.com/privacy-policy"
      />
      <main>
        <Hero
          badge="Privacy Policy"
          title="Privacy Policy"
          description="Learn how QuickPDFHD handles your information and protects your privacy while using our online Image to PDF conversion service."
        />

        <LegalSection title="Introduction">
          <p>
            This policy explains how QuickPDFHD handles information when you use
            its image-to-PDF and document-scanner tools or send a message through
            the contact form.
          </p>

          <p>
            By using our website, you agree to the practices described in this
            Privacy Policy.
          </p>
        </LegalSection>

        <LegalSection title="Information We Collect">
          <p>
            The conversion tools receive the image files you choose to upload.
            The current application processes those files in server memory to
            create your requested PDF; it does not write uploaded files to its
            own disk or database.
          </p>

          <ul className="list-disc space-y-3 pl-6">
            <li>Uploaded image files while a conversion request is being processed</li>
            <li>Contact-form details you submit, such as your name, email address, subject, and message</li>
            <li>Usage information collected by enabled analytics or advertising providers, subject to their policies</li>
          </ul>
        </LegalSection>

        <LegalSection title="How We Use Your Information">
          <ul className="list-disc space-y-3 pl-6">
            <li>Generate the PDF or scan result you request.</li>
            <li>Respond to messages sent through the contact form.</li>
            <li>Understand site usage and maintain the service.</li>
          </ul>
        </LegalSection>

        <LegalSection title="Cookies">
          <p>
            QuickPDFHD may use cookies or similar technologies through Google
            Analytics and Google AdSense. These services may collect or receive
            information from your browser and use cookies to measure usage,
            provide advertising, and limit ad repetition. You can manage cookies
            through your browser settings.
          </p>
        </LegalSection>

        <LegalSection title="Uploaded Files">
          <p>
            Uploaded files are sent to the conversion server only to process your
            request. The application uses memory storage for these requests and
            does not include a feature that saves uploaded files to its own disk
            or database. Do not upload files you are not authorized to handle.
          </p>
        </LegalSection>

        <LegalSection title="Third-Party Services">
          <p>
            QuickPDFHD currently includes Google Analytics and Google AdSense.
            These providers handle data under their own privacy policies. The
            contact form uses an email delivery service configured by the site
            operator to send your message.
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
            If you have questions about this Privacy Policy, use the contact form
            on our Contact page.
          </p>
        </LegalSection>
      </main>
    </Layout>
  );
};

export default Privacy;
