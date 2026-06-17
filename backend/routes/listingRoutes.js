import { Router } from "express";
import {
  getListing,
  getListings,
  postListing,
  putListing,
  removeListing
} from "../controllers/listingController.js";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

export const listingRoutes = Router();

listingRoutes.get("/listings", getListings);
listingRoutes.get("/listings/:id", getListing);
listingRoutes.post("/listings", requireAuth, upload.single("image"), postListing);
listingRoutes.put("/listings/:id", requireAuth, upload.single("image"), putListing);
listingRoutes.delete("/listings/:id", requireAuth, removeListing);
