import { addFavorite, getFavorites, removeFavoriteByListing } from "../models/favoriteModel.js";
import { findListingById } from "../models/listingModel.js";

export async function postFavorite(req, res) {
  const { listingId } = req.body;
  if (!listingId || !(await findListingById(listingId))) {
    return res.status(404).json({ message: "Listing not found." });
  }
  res.status(201).json({ favorites: await addFavorite(req.session.user.id, listingId) });
}

export async function listFavorites(req, res) {
  res.json({ favorites: await getFavorites(req.session.user.id) });
}

export async function deleteFavorite(req, res) {
  await removeFavoriteByListing(req.session.user.id, req.params.id);
  res.status(204).send();
}
