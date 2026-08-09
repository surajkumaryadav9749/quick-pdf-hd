const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP connection when server starts
transporter
  .verify()
  .then(() => {
    console.log("SMTP connection/authentication successful");
  })
  .catch((error) => {
    console.error("SMTP verification failed:", error.message);
  });

const sendContactEmail = async ({ name, email, subject, message }) => {
  const mailOptions = {
    // Sender configured in Brevo
    from: `"QuickPDFHD Contact" <${process.env.SENDER_EMAIL}>`,

    // Your receiving email
    to: process.env.CONTACT_RECEIVER,

    // When you click Reply in Gmail,
    // reply will go directly to the user
    replyTo: email,

    subject: `QuickPDFHD Contact: ${subject}`,

    // Plain text version
    text: `
New contact message from QuickPDFHD

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
`,

    // HTML version
    html: `
      <div
        style="
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #1e293b;
          max-width: 600px;
          margin: 0 auto;
        "
      >
        <h2 style="color: #2563eb;">
          New Contact Message - QuickPDFHD
        </h2>

        <p>
          <strong>Name:</strong> ${name}
        </p>

        <p>
          <strong>Email:</strong> ${email}
        </p>

        <p>
          <strong>Subject:</strong> ${subject}
        </p>

        <hr />

        <p>
          <strong>Message:</strong>
        </p>

        <p>
          ${message}
        </p>

        <hr />

        <p style="color: #64748b; font-size: 13px;">
          This message was sent through the QuickPDFHD contact form.
        </p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);

  return info;
};

module.exports = {
  sendContactEmail,
};
