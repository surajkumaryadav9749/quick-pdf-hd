import { Link } from "react-router-dom";
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
          description="Learn how QuickPDFHD handles uploaded files, contact-form messages, analytics, and advertising."
        />

        <LegalSection title="Introduction">
          <p>
            This policy explains how QuickPDFHD handles information when you use
            its PDF and image tools or send a message through the contact form.
          </p>

          <p>
            By using our website, you agree to the practices described in this
            Privacy Policy.
          </p>
        </LegalSection>

        <LegalSection title="Information We Collect">
          <p>
            The conversion tools receive the files you choose to upload, such as
            images, PDFs, Word documents, and Excel spreadsheets. The current
            application processes those files in server memory to create your
            requested download; it does not write uploaded files to its own disk
            or database.
          </p>

          <ul className="list-disc space-y-3 pl-6">
            <li>Uploaded files while a conversion request is being processed</li>
            <li>Contact-form details you submit, such as your name, email address, subject, and message</li>
            <li>Usage information collected by enabled analytics or advertising providers, subject to their policies</li>
          </ul>
        </LegalSection>

        <LegalSection title="How We Use Your Information">
          <ul className="list-disc space-y-3 pl-6">
            <li>Generate the PDF, image, spreadsheet, Word, or ZIP result you request.</li>
            <li>Respond to messages sent through the contact form.</li>
            <li>Understand site usage and maintain the service.</li>
          </ul>
        </LegalSection>

        <LegalSection title="Cookies and advertising">
          <p>
            QuickPDFHD currently loads Google Analytics and Google AdSense. These
            services may use cookies or similar technologies to measure traffic,
            show ads, and limit how often you see the same ad. Google and other
            advertisers may collect or receive information from your browser
            according to their own policies. You can manage cookies in your
            browser settings.
          </p>
        </LegalSection>

        <LegalSection title="Uploaded Files">
          <p>
            Uploaded files are sent to the conversion server only to process your
            request. The application uses memory storage for these requests and
            does not include a feature that saves uploaded files to its own disk
            or database. That is not a promise that no copy can exist anywhere:
            hosting providers, email delivery, analytics, and advertising
            services can still process other data as described on this page. Do
            not upload files you are not authorized to handle.
          </p>
        </LegalSection>

        <LegalSection title="How long information is kept">
          <p>
            Conversion uploads are handled in memory for the request. This policy
            does not claim a specific deletion timer such as “files are removed
            after X hours,” because the application does not implement a separate
            retention schedule for uploads. Contact-form messages are sent by
            email and may be retained in that inbox or by the email provider.
            Analytics and advertising providers keep data under their own
            retention rules.
          </p>
        </LegalSection>

        <LegalSection title="Third-Party Services">
          <p>
            QuickPDFHD currently includes Google Analytics and Google AdSense.
            These providers handle data under their own privacy policies. The
            contact form uses an email delivery service configured by the site
            operator to send your message. The site is hosted by a third-party
            hosting provider, which may keep standard server or access logs.
          </p>
        </LegalSection>

        <LegalSection title="Your choices">
          <p>
            You can stop using the site, adjust browser cookies, or send a
            question through the Contact page. If you contact us about personal
            information you submitted on the form, include enough detail to
            identify the message.
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
            If you have questions about this Privacy Policy, use the form on the{" "}
            <Link to="/contact" className="font-semibold text-teal-800 hover:underline">Contact</Link> page.
          </p>
        </LegalSection>
      </main>
    </Layout>
  );
};

export default Privacy;
