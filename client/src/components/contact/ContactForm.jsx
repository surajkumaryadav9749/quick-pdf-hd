import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiFileText,
  FiMessageSquare,
  FiSend,
} from "react-icons/fi";

import Container from "../common/Container";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));

    if (status.message) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    setStatus({
      type: "",
      message: "",
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send message.");
      }

      setStatus({
        type: "success",
        message: "Your message has been sent successfully!",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <Container>
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            Contact Form
          </p>

          <h2
            id="contact-form-heading"
            className="mt-5 text-4xl font-bold text-slate-900"
          >
            Send Us a Message
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate={false}
          className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-lg md:p-10"
        >
          {/* Name */}
          <div className="mb-6">
            <label
              htmlFor="contact-name"
              className="mb-2 block font-semibold text-slate-700"
            >
              Full Name
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 px-4 focus-within:border-blue-500">
              <FiUser aria-hidden="true" className="shrink-0 text-slate-500" />

              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                autoComplete="name"
                required
                className="w-full rounded-xl px-3 py-4 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label
              htmlFor="contact-email"
              className="mb-2 block font-semibold text-slate-700"
            >
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 px-4 focus-within:border-blue-500">
              <FiMail aria-hidden="true" className="shrink-0 text-slate-500" />

              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl px-3 py-4 outline-none"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="mb-6">
            <label
              htmlFor="contact-subject"
              className="mb-2 block font-semibold text-slate-700"
            >
              Subject
            </label>

            <div className="flex items-center rounded-xl border border-slate-300 px-4 focus-within:border-blue-500">
              <FiFileText
                aria-hidden="true"
                className="shrink-0 text-slate-500"
              />

              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                required
                className="w-full rounded-xl px-3 py-4 outline-none"
              />
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <label
              htmlFor="contact-message"
              className="mb-2 block font-semibold text-slate-700"
            >
              Message
            </label>

            <div className="flex rounded-xl border border-slate-300 px-4 py-4 focus-within:border-blue-500">
              <FiMessageSquare
                aria-hidden="true"
                className="mt-1 shrink-0 text-slate-500"
              />

              <textarea
                id="contact-message"
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                required
                className="w-full resize-none px-3 outline-none"
              />
            </div>
          </div>

          {/* Status Message */}
          {status.message && (
            <div
              role="alert"
              aria-live="polite"
              className={`mb-6 rounded-xl px-4 py-3 text-center text-sm font-medium ${
                status.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {status.message}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className={`flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-lg font-semibold text-white transition ${
              loading
                ? "cursor-not-allowed bg-blue-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            <FiSend aria-hidden="true" />

            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </Container>
    </section>
  );
};

export default ContactForm;
