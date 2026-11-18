// Usage:
//   npm run seed             -> insert missing projects only; existing documents are NOT touched
//   npm run seed -- --update -> also overwrite existing projects with the values in projects.seed.js
import { assertEnv } from '../config/env.js';
import { connectDB, disconnectDB } from '../config/db.js';
import Project from '../models/Project.js';
import { projectSeed } from '../data/projects.seed.js';

const update = process.argv.includes('--update');

async function run() {
  assertEnv();
  await connectDB();

  // Upserting by slug makes this safe to run repeatedly. By default $setOnInsert means any
  // edits made later in Atlas are never overwritten.
  const ops = projectSeed.map((p) => ({
    updateOne: {
      filter: { slug: p.slug },
      update: update ? { $set: p } : { $setOnInsert: p },
      upsert: true,
    },
  }));

  const result = await Project.bulkWrite(ops);
  await Project.syncIndexes();

  console.log(
    `Seed complete (${update ? 'update mode' : 'insert-only mode'}): ` +
      `${result.upsertedCount} inserted, ${result.modifiedCount} updated, ${result.matchedCount} already present.`
  );
  console.log(`Projects in database: ${await Project.countDocuments()}`);
}

run()
  .catch((err) => {
    console.error('Seed failed:', err.message);
    process.exitCode = 1;
  })
  .finally(disconnectDB);
