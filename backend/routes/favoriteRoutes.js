import { Router } from "express";
import {
  deleteFavorite,
  listFavorites,
  postFavorite
} from "../controllers/favoriteController.js";
import { requireAuth } from "../middleware/auth.js";

export const favoriteRoutes = Router();

favoriteRoutes.post("/favorites", requireAuth, postFavorite);
favoriteRoutes.get("/favorites", requireAuth, listFavorites);
favoriteRoutes.delete("/favorites/:id", requireAuth, deleteFavorite);
