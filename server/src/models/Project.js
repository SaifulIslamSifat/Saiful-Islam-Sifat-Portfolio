import mongoose from 'mongoose';

const httpUrl = {
  type: String,
  trim: true,
  default: '',
  validate: {
    validator: (v) => v === '' || /^https?:\/\/\S+$/i.test(v),
    message: 'Must be an http(s) URL or empty',
  },
};

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[a-z0-9-]+$/ },
    title: { type: String, required: true, trim: true, maxlength: 150 },
    category: { type: String, required: true, trim: true, maxlength: 50 },
    summary: { type: String, required: true, trim: true, maxlength: 300 },
    details: { type: String, trim: true, maxlength: 5000, default: '' },
    // Only verified technologies belong here; empty until confirmed by the owner.
    technologies: { type: [String], default: [] },
    githubUrl: httpUrl,
    liveUrl: httpUrl,
    image: { type: String, trim: true, default: '' },
    accent: { type: String, trim: true, default: 'from-electric to-cyan' },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

projectSchema.index({ published: 1, order: 1 });

export default mongoose.model('Project', projectSchema);
