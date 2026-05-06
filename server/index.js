import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const app = express();

/* ---------------- CORS ---------------- */
const allowedOrigins = [
  "http://localhost:5173",
  "https://raj-portfolio-git-main-raj33720s-projects.vercel.app",
  "https://raj-portfolio-pi-two.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.options(
  /.*/,
  cors({
    origin: allowedOrigins,
  })
);

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

/* ---------------- ENV CHECK ---------------- */
const requiredEnv = ["RESEND_API_KEY", "ENQUIRY_TO_EMAIL"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
  console.warn(`Missing env vars: ${missingEnv.join(", ")}`);
}

const mailConfigured = missingEnv.length === 0;

/* ---------------- RESEND ---------------- */
const resend = mailConfigured ? new Resend(process.env.RESEND_API_KEY) : null;
const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

/* ---------------- ROUTES ---------------- */

/* Health */
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    mailConfigured,
    mailProvider: "resend",
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

  if (!resend) {
    return res.status(500).json({ message: "Resend not configured" });
  }

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
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

    if (error) {
      throw new Error(error.message || "Resend email sending failed");
    }

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("RESEND ERROR:", {
      message: error.message,
      stack: error.stack,
    });

    return res.status(500).json({ message: "Email sending failed" });
  }
});

/* ---------------- START SERVER ---------------- */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
