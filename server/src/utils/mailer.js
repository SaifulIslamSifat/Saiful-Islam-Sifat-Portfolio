import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

let transporter = null;
const { smtp } = env;
const enabled = !!(smtp.host && smtp.user && smtp.pass && smtp.to);

if (enabled) {
  transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: { user: smtp.user, pass: smtp.pass },
  });
}

// Data is stored as typed; it is HTML-escaped here, at the point of output.
const esc = (v = '') =>
  String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Returns true if an email was sent; never throws (the message is already stored in MongoDB).
export async function notifyNewMessage({ name, email, subject, message }) {
  if (!enabled) return false;
  try {
    await transporter.sendMail({
      from: smtp.from,
      to: smtp.to,
      replyTo: email,
      subject: `[Portfolio] ${String(subject).replace(/[\r\n]+/g, ' ')}`,
      html: `<p><strong>From:</strong> ${esc(name)} &lt;${esc(email)}&gt;</p><p><strong>Subject:</strong> ${esc(subject)}</p><p>${esc(message).replace(/\n/g, '<br>')}</p>`,
    });
    return true;
  } catch (err) {
    console.error('Email notification failed:', err.message);
    return false;
  }
}
