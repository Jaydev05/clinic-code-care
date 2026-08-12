import "dotenv/config";

import bcrypt from "bcryptjs";

import { pool, query } from "../src/db.js";

const [username, password] = process.argv.slice(2);

if (!username || !password || password.length < 8) {
  console.error("Usage: npm run create-admin -- <username> <password (min 8 chars)>");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);

await query(
  `INSERT INTO admin_users (username, password_hash) VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)`,
  [username, hash],
);

console.log(`Admin user "${username}" created/updated.`);
await pool.end();
