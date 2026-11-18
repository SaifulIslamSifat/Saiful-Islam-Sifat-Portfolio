// Usage: npm run check:db
// Verifies the Atlas connection and shows what is stored. Prints no credentials or message contents.
import mongoose from 'mongoose';
import { assertEnv } from '../config/env.js';
import { connectDB, disconnectDB } from '../config/db.js';
import Project from '../models/Project.js';
import ContactMessage from '../models/ContactMessage.js';

async function run() {
  assertEnv();
  await connectDB();

  await mongoose.connection.db.admin().ping();
  console.log('Ping OK. Database:', mongoose.connection.name);

  const [projects, published, messages] = await Promise.all([
    Project.countDocuments(),
    Project.countDocuments({ published: true }),
    ContactMessage.countDocuments(),
  ]);
  console.log(`Projects: ${projects} (${published} published)`);
  console.log(`Contact messages stored: ${messages}`);

  const indexes = await Project.collection.indexes();
  console.log('Project indexes:', indexes.map((i) => i.name).join(', '));
  if (!projects) console.log('No projects yet. Run: npm run seed');
}

run()
  .catch((err) => {
    console.error('DB check failed:', err.message);
    process.exitCode = 1;
  })
  .finally(disconnectDB);
