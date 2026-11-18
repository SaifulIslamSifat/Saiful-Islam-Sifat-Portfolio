import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    subject: { type: String, required: true, trim: true, maxlength: 150 },
    message: { type: String, required: true, trim: true, maxlength: 2000 },
    // Visitor IP is stored only as a salted hash (abuse tracking without keeping raw IPs).
    ipHash: { type: String, default: '' },
    userAgent: { type: String, maxlength: 200, default: '' },
    read: { type: Boolean, default: false },
    notified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

contactMessageSchema.index({ createdAt: -1 });

export default mongoose.model('ContactMessage', contactMessageSchema);
