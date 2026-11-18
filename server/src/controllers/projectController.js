import mongoose from 'mongoose';
import Project from '../models/Project.js';

// GET /api/projects
export async function listProjects(req, res, next) {
  try {
    const projects = await Project.find({ published: true }).sort({ order: 1, createdAt: 1 }).select('-__v').lean();
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    next(err);
  }
}

// GET /api/projects/:id  (ObjectId or slug)
export async function getProject(req, res, next) {
  try {
    const { id } = req.params;
    const filter = mongoose.isValidObjectId(id) ? { _id: id } : { slug: id.toLowerCase() };
    const project = await Project.findOne({ ...filter, published: true }).select('-__v').lean();
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
    return res.json({ success: true, data: project });
  } catch (err) {
    return next(err);
  }
}
