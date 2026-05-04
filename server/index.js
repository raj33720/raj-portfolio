import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = Number(process.env.SERVER_PORT || 5000);

app.use(cors());
app.use(express.json());

const requiredEnv = [
  'SMTP_HOST',
  'SMTP_PORT',
  'SMTP_USER',
  'SMTP_PASS',
  'ENQUIRY_TO_EMAIL'
];

const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.warn(`Missing env vars: ${missingEnv.join(', ')}`);
}

const smtpFamily = Number(process.env.SMTP_FAMILY || 4);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE || 'false') === 'true',
  family: smtpFamily === 4 || smtpFamily === 6 ? smtpFamily : 4,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/api/enquiry', async (req, res) => {
  const {
    fullName = '',
    email = '',
    mobile = '',
    purpose = '',
    description = ''
  } = req.body || {};

  if (!fullName || !email || !mobile || !purpose || !description) {
    return res.status(400).json({ message: 'All enquiry fields are required.' });
  }

  try {
    const submittedAt = new Date().toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata'
    });

    const mailSubject = `New Enquiry - ${fullName}`;

    const html = `
      <div style="font-family: Arial, sans-serif; color: #0f172a; background: #f8fafc; padding: 24px;">
        <div style="max-width: 700px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="padding: 18px 24px; background: linear-gradient(90deg, #0ea5e9, #8b5cf6); color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px;">New Enquiry Received</h2>
            <p style="margin: 8px 0 0; font-size: 13px; opacity: 0.92;">Submitted on ${escapeHtml(submittedAt)}</p>
          </div>
          <div style="padding: 20px 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; width: 180px; font-weight: 700; border-bottom: 1px solid #e2e8f0;">Full Name</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(fullName)}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: 700; border-bottom: 1px solid #e2e8f0;">Email</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(email)}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: 700; border-bottom: 1px solid #e2e8f0;">Mobile Number</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(mobile)}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: 700; border-bottom: 1px solid #e2e8f0;">Purpose</td>
                <td style="padding: 10px; border-bottom: 1px solid #e2e8f0;">${escapeHtml(purpose)}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: 700; vertical-align: top;">Description</td>
                <td style="padding: 10px; white-space: pre-wrap;">${escapeHtml(description)}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    `;

    const text = [
      'New Enquiry',
      `Submitted on: ${submittedAt}`,
      '',
      `Full Name: ${fullName}`,
      `Email: ${email}`,
      `Mobile Number: ${mobile}`,
      `Purpose: ${purpose}`,
      '',
      'Description:',
      description
    ].join('\n');

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.ENQUIRY_TO_EMAIL,
      replyTo: email,
      subject: mailSubject,
      text,
      html
    });

    return res.status(200).json({ message: 'Enquiry sent successfully.' });
  } catch (error) {
    console.error('Failed to send enquiry:', error);
    return res.status(500).json({ message: 'Failed to send enquiry email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Enquiry server running at http://localhost:${PORT}`);
});
