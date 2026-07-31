import { db } from "../config/db.js";

export async function addFavorite(userId, listingId) {
  await db.execute("INSERT IGNORE INTO favorites (user_id, listing_id) VALUES (?, ?)", [
    userId,
    listingId
  ]);
  return getFavorites(userId);
}

export async function getFavorites(userId) {
  const [rows] = await db.execute(
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
     ORDER BY favorites.id DESC`,
    [userId]
  );
  return rows;
}

export async function removeFavoriteByListing(userId, listingId) {
  const [result] = await db.execute(
    "DELETE FROM favorites WHERE user_id = ? AND listing_id = ?",
    [userId, listingId]
  );
  return result.affectedRows > 0;
}
