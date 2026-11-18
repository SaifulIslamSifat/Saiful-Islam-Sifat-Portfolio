import crypto from 'node:crypto';
import ContactMessage from '../models/ContactMessage.js';
import { env } from '../config/env.js';
import { notifyNewMessage } from '../utils/mailer.js';

const hashIp = (ip = '') =>
  crypto.createHash('sha256').update(`${env.ipHashSalt}${ip}`).digest('hex').slice(0, 32);

// POST /api/contact
export async function createContactMessage(req, res, next) {
  try {
    const { name, email, subject, message, website } = req.body;

    // Honeypot filled => bot. Pretend success so the bot learns nothing; store nothing.
    if (website) return res.status(201).json({ success: true, message: 'Thank you! Your message has been sent.' });

    const saved = await ContactMessage.create({
      name,
      email,
      subject,
      message,
      ipHash: hashIp(req.ip),
      userAgent: (req.get('user-agent') || '').slice(0, 200),
    });

    // Optional email; failure must not fail the request since the message is safely stored.
    const sent = await notifyNewMessage({ name, email, subject, message });
    if (sent) await ContactMessage.updateOne({ _id: saved._id }, { notified: true });

    return res.status(201).json({ success: true, message: 'Thank you! Your message has been sent.' });
  } catch (err) {
    return next(err);
  }
}
