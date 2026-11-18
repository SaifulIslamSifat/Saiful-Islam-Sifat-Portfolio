# MongoDB Atlas setup

Atlas menu names change from time to time, so wording below may differ slightly from what you see.

## 1. Create the cluster
1. Sign up at mongodb.com/atlas and create a **free (M0)** cluster. Choose a region close to your Render region.
2. Name the project something like `sifat-portfolio`.

## 2. Create a limited database user
1. Go to **Database Access** → **Add New Database User**.
2. Use password authentication with a long random password (not reused anywhere else).
3. Under privileges choose **Specific privileges / Read and write to a specific database** and select `sifat-portfolio`.
   Do not use the Atlas admin role for the app.

## 3. Allow network access
1. Go to **Network Access** → **Add IP Address**.
2. Render's free web services do not have a fixed outbound IP, so you will usually need **Allow access from anywhere (0.0.0.0/0)**.
   That is acceptable only because the database user is limited and the password is strong. Never share the connection string.
3. For local development you can add just your own IP instead.

## 4. Get the connection string
1. **Database** → **Connect** → **Drivers** → copy the `mongodb+srv://...` string.
2. Replace `<password>` with your password and add the database name before the `?`:

```
mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/sifat-portfolio?retryWrites=true&w=majority
```

If the password contains special characters (`@ : / ? #`), URL-encode them.

## 5. Put it in `server/.env` (never commit this file)
```
MONGODB_URI=<your connection string>
CLIENT_ORIGIN=http://localhost:5173
IP_HASH_SALT=<long random string>
```

## 6. Verify and load data
```
cd server
npm install
npm run check:db     # connection test; shows counts and indexes
npm run seed         # inserts your 4 projects (safe to re-run)
npm run dev          # API on http://localhost:5000
```

Test: open `http://localhost:5000/api/health`, then `http://localhost:5000/api/projects`.

## Editing projects later
Until a secured admin dashboard exists, edit documents in Atlas (**Browse Collections** → `projects`):
set `technologies`, `githubUrl`, `liveUrl` or `image` once verified. Plain `npm run seed` never overwrites those edits;
`npm run seed -- --update` does overwrite them with the values in `server/src/data/projects.seed.js`.

Contact messages are stored in the `contactmessages` collection.
