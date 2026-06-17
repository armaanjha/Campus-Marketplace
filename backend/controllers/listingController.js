import {
  createListing,
  deleteListing,
  findListingById,
  listListings,
  updateListing
} from "../models/listingModel.js";

function imageUrl(req) {
  return req.file ? `/uploads/${req.file.filename}` : undefined;
}

export function getListings(req, res) {
  const listings = listListings({
    search: req.query.search,
    category: req.query.category,
    userId: req.session.user?.id,
    onlyMine: req.query.mine === "true"
  });
  res.json({ listings });
}

export function getListing(req, res) {
  const listing = findListingById(req.params.id);
  if (!listing) return res.status(404).json({ message: "Listing not found." });
  res.json({ listing });
}

export function postListing(req, res) {
  const { title, description, price, category } = req.body;
  if (!title || !description || !price || !category) {
    return res.status(400).json({ message: "Title, description, price, and category are required." });
  }

  const listing = createListing({
    title,
    description,
    price,
    category,
    imageUrl: imageUrl(req) || null,
    userId: req.session.user.id
  });
  res.status(201).json({ listing });
}

export function putListing(req, res) {
  const listing = updateListing(req.params.id, req.session.user.id, {
    ...req.body,
    imageUrl: imageUrl(req)
  });

  if (listing === null) return res.status(404).json({ message: "Listing not found." });
  if (listing === false) return res.status(403).json({ message: "You can only edit your own listings." });
  res.json({ listing });
}

export function removeListing(req, res) {
  const result = deleteListing(req.params.id, req.session.user.id);
  if (result === null) return res.status(404).json({ message: "Listing not found." });
  if (result === false) return res.status(403).json({ message: "You can only delete your own listings." });
  res.status(204).send();
}
