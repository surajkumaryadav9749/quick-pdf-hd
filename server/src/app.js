const express = require("express");
const cors = require("cors");

const convertRoute = require("./routes/convert.route");
const contactRoute = require("./routes/contact.route");

const app = express();

// Middlewares
app.use(cors());

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
app.use("/api/contact", contactRoute);

module.exports = app;
