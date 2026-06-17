import { addFavorite, getFavorites, removeFavoriteByListing } from "../models/favoriteModel.js";
import { findListingById } from "../models/listingModel.js";

export function postFavorite(req, res) {
  const { listingId } = req.body;
  if (!listingId || !findListingById(listingId)) {
    return res.status(404).json({ message: "Listing not found." });
  }
  res.status(201).json({ favorites: addFavorite(req.session.user.id, listingId) });
}

export function listFavorites(req, res) {
  res.json({ favorites: getFavorites(req.session.user.id) });
}

export function deleteFavorite(req, res) {
  removeFavoriteByListing(req.session.user.id, req.params.id);
  res.status(204).send();
}
