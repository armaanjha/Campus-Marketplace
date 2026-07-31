import { db } from "../config/db.js";

const publicUserColumns = "id, name, email, phone, created_at";

export async function createUser({ name, email, password, phone }) {
  const [result] = await db.execute(
    "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)",
    [name.trim(), email.trim().toLowerCase(), password, phone?.trim() || null]
  );
  return findUserById(result.insertId);
}

export async function findUserByEmail(email) {
  const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email.trim().toLowerCase()
  ]);
  return rows[0] || null;
}

export async function findUserById(id) {
  const [rows] = await db.execute(`SELECT ${publicUserColumns} FROM users WHERE id = ?`, [id]);
  return rows[0] || null;
}
