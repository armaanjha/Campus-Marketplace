import express from "express";
import cors from "cors";
import session from "express-session";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { initializeDatabase } from "./config/db.js";
import { authRoutes } from "./routes/authRoutes.js";
import { favoriteRoutes } from "./routes/favoriteRoutes.js";
import { listingRoutes } from "./routes/listingRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
mkdirSync(join(__dirname, "uploads"), { recursive: true });


const app = express();
const PORT = process.env.PORT || 5000;

const CLIENT_ORIGIN =
  process.env.CLIENT_ORIGIN || "https://campus-marketplace-ten-chi.vercel.app";

app.use(cors({
  origin: CLIENT_ORIGIN,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(join(__dirname, "uploads")));
app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_SECRET || "campus-marketplace-dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "none",
      secure: true,
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

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Campus marketplace API running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize MySQL database:", err);
    process.exit(1);
  });
