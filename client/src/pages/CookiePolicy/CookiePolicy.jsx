import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Hero from "../../components/legal/Hero";
import LegalSection from "../../components/legal/LegalSection";
import SEO from "../../components/seo/SEO";

const CookiePolicy = () => {
  return (
    <Layout>
      <SEO
        title="Cookie Policy | QuickPDFHD"
        description="Learn how QuickPDFHD uses cookies and similar technologies for analytics, advertising measurement, and site operations."
        canonical="https://quickpdfhd.com/cookie-policy"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://quickpdfhd.com/" },
            { "@type": "ListItem", position: 2, name: "Cookie Policy", item: "https://quickpdfhd.com/cookie-policy" },
          ],
        }}
      />
      <main>
        <Hero
          badge="Cookie Policy"
          title="Cookie Policy"
          description="How QuickPDFHD uses cookies, analytics identifiers, and third-party advertising technologies."
        />

        <LegalSection title="What Are Cookies?">
          <p>
            Cookies are small text files placed on your computer or mobile device when you visit a website.
            They are widely used by website operators to make websites work properly, improve operational
            efficiency, and provide reporting information.
          </p>
          <p>
            Cookies can be &ldquo;first-party&rdquo; (set directly by QuickPDFHD) or &ldquo;third-party&rdquo; (set by
            external service providers such as Google).
          </p>
        </LegalSection>

        <LegalSection title="How QuickPDFHD Uses Cookies">
          <p>
            QuickPDFHD prioritizes in-memory file processing and does not require an account or login credentials.
            We use cookies and similar technologies exclusively for operational functionality, traffic measurement,
            and authorized advertising:
          </p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong>Essential Technical Functions:</strong> Managing user interface state, drag-and-drop
              interactions, and responsive layout preferences in your browser.
            </li>
            <li>
              <strong>Performance and Analytics:</strong> We use Google Analytics to understand aggregate visitor
              counts, popular tools, bounce rates, and device types so we can maintain reliable server capacity.
            </li>
            <li>
              <strong>Advertising Measurement:</strong> QuickPDFHD integrates Google AdSense. Google and its
              partners may set cookies to serve relevant ads, prevent the same ad from showing repeatedly, and
              detect fraudulent ad clicks.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Third-Party Cookies on QuickPDFHD">
          <p>
            The following third-party services may place cookies during your browsing session:
          </p>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-bold text-slate-900">Google Analytics</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Helps us measure site traffic and tool usage patterns. Cookies such as <code>_ga</code> and{" "}
                <code>_gid</code> store client identifiers without directly identifying you personally. Analytics
                scripts are loaded asynchronously to protect page loading performance.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="font-bold text-slate-900">Google AdSense</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Google uses cookies (such as DoubleClick cookies) to serve ads based on your visits to this and
                other websites across the internet. These cookies enable Google and its advertising partners to
                display relevant promotions, enforce ad delivery frequency capping, and detect bot traffic.
              </p>
            </div>
          </div>
        </LegalSection>

        <LegalSection title="How to Control and Disable Cookies">
          <p>
            You have the right to accept or decline cookies at any time. You can exercise your preferences through
            several methods:
          </p>
          <ul className="list-disc space-y-3 pl-6">
            <li>
              <strong>Browser Settings:</strong> Most web browsers (Chrome, Edge, Firefox, Safari) allow you to block
              or delete cookies through their privacy settings. Blocking all cookies may affect your browsing experience,
              though our conversion tools will remain functional.
            </li>
            <li>
              <strong>Google Ad Settings:</strong> You can manage personalized ad preferences or opt out of
              interest-based ads by visiting{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal-800 hover:underline"
              >
                Google Ad Settings
              </a>
              .
            </li>
            <li>
              <strong>Industry Opt-Out Platforms:</strong> You can opt out of interest-based advertising from
              participating providers through the{" "}
              <a
                href="https://optout.networkadvertising.org"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal-800 hover:underline"
              >
                Network Advertising Initiative (NAI)
              </a>{" "}
              or the{" "}
              <a
                href="https://www.youronlinechoices.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-teal-800 hover:underline"
              >
                Your Online Choices
              </a>{" "}
              consumer choice portal.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Updates to This Policy">
          <p>
            We may periodically revise this Cookie Policy to reflect technical updates, changes in provider
            practices, or legal guidelines. The date of the most recent revision will be noted on this page.
          </p>
        </LegalSection>

        <LegalSection title="Questions & Contact">
          <p>
            If you have questions about our use of cookies or privacy practices, please contact us through the{" "}
            <Link to="/contact" className="font-semibold text-teal-800 hover:underline">
              Contact
            </Link>{" "}
            page.
          </p>
        </LegalSection>
      </main>
    </Layout>
  );
};

export default CookiePolicy;
