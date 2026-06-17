import { db } from "../config/db.js";

export function addFavorite(userId, listingId) {
  db.prepare("INSERT OR IGNORE INTO favorites (user_id, listing_id) VALUES (?, ?)").run(
    userId,
    listingId
  );
  return getFavorites(userId);
}

export function getFavorites(userId) {
  return db
    .prepare(
      `SELECT
        favorites.id AS favorite_id,
        listings.*,
        users.name AS seller_name,
        users.email AS seller_email,
        users.phone AS seller_phone
       FROM favorites
       JOIN listings ON listings.id = favorites.listing_id
       JOIN users ON users.id = listings.user_id
       WHERE favorites.user_id = ?
       ORDER BY favorites.id DESC`
    )
    .all(userId);
}

export function removeFavoriteByListing(userId, listingId) {
  const result = db
    .prepare("DELETE FROM favorites WHERE user_id = ? AND listing_id = ?")
    .run(userId, listingId);
  return result.changes > 0;
}
