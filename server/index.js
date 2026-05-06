import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

/* ---------------- CORS ---------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://raj-portfolio-git-main-raj33720s-projects.vercel.app",
  "https://raj-portfolio-pi-two.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.options(/.*/, cors({
  origin: allowedOrigins
}));

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* ---------------- PORT ---------------- */
// const PORT = process.env.PORT || 5000;

/* ---------------- ENV CHECK ---------------- */
const requiredEnv = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "ENQUIRY_TO_EMAIL"
];

const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.warn(`Missing env vars: ${missingEnv.join(", ")}`);
}

const mailConfigured = missingEnv.length === 0;

/* ---------------- SMTP ---------------- */
const transporter = mailConfigured
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: String(process.env.SMTP_SECURE) === "true",
      family: 4,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000,
      socketTimeout: 10000,
    })
  : null;

/* Verify SMTP */
if (transporter) {
  transporter.verify()
    .then(() => console.log("✅ SMTP connection verified"))
    .catch((err) => {
      console.error("❌ SMTP verification failed:", err.message);
    });
}

/* ---------------- ROUTES ---------------- */

/* Health */
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    mailConfigured,
  });
});

/* Send Email */
app.post("/api/enquiry", async (req, res) => {
  const { fullName, email, mobile, purpose, description } = req.body;

  if (!fullName || !email || !mobile || !purpose || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  if (!transporter) {
    return res.status(500).json({ message: "SMTP not configured" });
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ENQUIRY_TO_EMAIL,
      replyTo: email,
      subject: `New Enquiry - ${fullName}`,
      html: `
        <h2>New Enquiry</h2>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Purpose:</b> ${purpose}</p>
        <p><b>Description:</b> ${description}</p>
      `,
    });

    return res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    console.error("SMTP ERROR:", {
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({ message: "Email sending failed" });
  }
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});