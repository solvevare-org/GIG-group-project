import nodemailer from 'nodemailer';

export function createTransport() {
  if (!process.env.SMTP_HOST) {
    console.warn('SMTP not configured (missing SMTP_HOST)');
    return null;
  }
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: /true/i.test(process.env.SMTP_SECURE || 'false'),
    auth: process.env.SMTP_USER ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    } : undefined,
    tls: { ciphers: 'TLSv1.2' }
  });
  return transporter;
}

export async function sendMail({ to, subject, text, html }) {
  const transporter = createTransport();
  if (!transporter) return;
  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to,
    subject,
    text,
    html
  });
}
