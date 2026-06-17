import express from "express";
import cors from "cors";
import session from "express-session";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import "./config/db.js";
import { authRoutes } from "./routes/authRoutes.js";
import { favoriteRoutes } from "./routes/favoriteRoutes.js";
import { listingRoutes } from "./routes/listingRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
mkdirSync(join(__dirname, "uploads"), { recursive: true });

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
const allowedOrigins = new Set([
  CLIENT_ORIGIN,
  "http://localhost:4173",
  "http://127.0.0.1:4173",
  "http://127.0.0.1:5173"
]);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error("Origin is not allowed by CORS."));
    },
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(join(__dirname, "uploads")));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "campus-marketplace-dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
);

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.use("/api", authRoutes);
app.use("/api", listingRoutes);
app.use("/api", favoriteRoutes);

app.use((err, _req, res, _next) => {
  res.status(400).json({ message: err.message || "Something went wrong." });
});

app.listen(PORT, () => {
  console.log(`Campus marketplace API running on http://localhost:${PORT}`);
});
