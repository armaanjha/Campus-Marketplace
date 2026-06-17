import { db } from "../config/db.js";

const publicUserColumns = "id, name, email, phone, created_at";

export function createUser({ name, email, password, phone }) {
  const stmt = db.prepare(
    "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)"
  );
  const result = stmt.run(name.trim(), email.trim().toLowerCase(), password, phone?.trim() || null);
  return findUserById(result.lastInsertRowid);
}

export function findUserByEmail(email) {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email.trim().toLowerCase());
}

export function findUserById(id) {
  return db.prepare(`SELECT ${publicUserColumns} FROM users WHERE id = ?`).get(id);
}
