import { FiFileText, FiGlobe, FiMessageSquare } from "react-icons/fi";
import Container from "../common/Container";

const contactInfo = [
  { icon: <FiMessageSquare aria-hidden="true" />, title: "Contact form", value: "Send a message", description: "Use the form below for questions, feedback, or technical issues." },
  { icon: <FiFileText aria-hidden="true" />, title: "Tool help", value: "Image-to-PDF support", description: "Include the tool name and a clear description of the issue in your message." },
  { icon: <FiGlobe aria-hidden="true" />, title: "Online service", value: "Browser-based tools", description: "QuickPDFHD can be used from a modern browser on supported devices." },
];

const ContactInfo = () => (
  <section aria-labelledby="contact-info-heading" className="bg-white py-16 sm:py-20 lg:py-24">
    <Container>
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <p className="inline-flex rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-800">Contact information</p>
        <h2 id="contact-info-heading" className="mt-5 text-4xl font-bold text-slate-900">How to get in touch</h2>
        <p className="mt-5 text-lg leading-8 text-slate-600">Use the contact form to share a question, feedback, or a problem with a QuickPDFHD tool.</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {contactInfo.map((item) => (
          <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-teal-200 hover:shadow-xl">
            <div aria-hidden="true" className="mb-6 inline-flex rounded-2xl bg-teal-100 p-4 text-teal-800">{item.icon}</div>
            <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
            <p className="mt-3 break-words text-lg font-semibold text-teal-800">{item.value}</p>
            <p className="mt-4 leading-7 text-slate-600">{item.description}</p>
          </article>
        ))}
      </div>
    </Container>
  </section>
);

export default ContactInfo;
