const express = require("express");
const cors = require("cors");

const convertRoute = require("./routes/convert.route");
const contactRoute = require("./routes/contact.route");
const scanRoute = require("./routes/scan.route");
const resizeRoute = require("./routes/resize.route");
const pdfZipRoute = require("./routes/pdf-zip.route");

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://quickpdfhd.com",
  "https://www.quickpdfhd.com",
  "https://quick-pdf-hd.vercel.app",
];

// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "QuickPDF API is running",
  });
});

// Routes
app.use("/api/convert", convertRoute);
app.use("/api/scan", scanRoute);
app.use("/api/resize-image", resizeRoute);
app.use("/api/pdf-to-zip", pdfZipRoute);
app.use("/api/contact", contactRoute);

module.exports = app;
