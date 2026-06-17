import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, findUserById } from "../models/userModel.js";

function setSessionUser(req, user) {
  req.session.user = user;
}

export async function register(req, res) {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters." });
  }

  if (findUserByEmail(email)) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = createUser({ name, email, password: hashedPassword, phone });
  setSessionUser(req, user);
  res.status(201).json({ user });
}

export async function login(req, res) {
  const { email, password } = req.body;
  const userRecord = email ? findUserByEmail(email) : null;

  if (!userRecord || !(await bcrypt.compare(password || "", userRecord.password))) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const user = findUserById(userRecord.id);
  setSessionUser(req, user);
  res.json({ user });
}

export function logout(req, res) {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out." });
  });
}

export function me(req, res) {
  res.json({ user: req.session.user || null });
}
