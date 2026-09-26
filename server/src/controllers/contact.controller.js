const { sendContactEmail } = require("../services/mail.service");

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message, website, honeypot } = req.body;

    // Honeypot spam check - silent success for bots
    if (website || honeypot) {
      return res.status(200).json({
        success: true,
        message: "Your message has been sent successfully.",
      });
    }

    if (!name || !String(name).trim()) {
      return res.status(400).json({ success: false, message: "Please provide your name." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(String(email).trim())) {
      return res.status(400).json({ success: false, message: "Please provide a valid email address." });
    }

    if (!subject || !String(subject).trim()) {
      return res.status(400).json({ success: false, message: "Please provide a subject." });
    }

    if (!message || !String(message).trim()) {
      return res.status(400).json({ success: false, message: "Please enter your message." });
    }

    await sendContactEmail({
      name: String(name).trim().slice(0, 100),
      email: String(email).trim().slice(0, 120),
      subject: String(subject).trim().slice(0, 200),
      message: String(message).trim().slice(0, 5000),
    });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};

module.exports = {
  sendContactMessage,
};
