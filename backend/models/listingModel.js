import { db } from "../config/db.js";

const listingSelect = `
  SELECT
    listings.*,
    users.name AS seller_name,
    users.email AS seller_email,
    users.phone AS seller_phone
  FROM listings
  JOIN users ON users.id = listings.user_id
`;

export async function listListings({ search, category, userId, onlyMine = false }) {
  const filters = [];
  const params = [];

  if (search) {
    filters.push(
      "(listings.title LIKE ? OR listings.description LIKE ? OR listings.category LIKE ?)"
    );
    const searchValue = `%${search}%`;
    params.push(searchValue, searchValue, searchValue);
  }

  if (category) {
    filters.push("LOWER(listings.category) = LOWER(?)");
    params.push(category);
  }

  if (onlyMine) {
    filters.push("listings.user_id = ?");
    params.push(userId);
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  const [rows] = await db.execute(
    `${listingSelect} ${where} ORDER BY listings.created_at DESC`,
    params
  );
  return rows;
}

export async function findListingById(id) {
  const [rows] = await db.execute(`${listingSelect} WHERE listings.id = ?`, [id]);
  return rows[0] || null;
}

export async function createListing({ title, description, price, category, imageUrl, userId }) {
  const [result] = await db.execute(
    `INSERT INTO listings (title, description, price, category, image_url, user_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [title.trim(), description.trim(), Number(price), category, imageUrl, userId]
  );
  return findListingById(result.insertId);
}

export async function updateListing(id, userId, fields) {
  const [rows] = await db.execute("SELECT * FROM listings WHERE id = ?", [id]);
  const existing = rows[0];
  if (!existing) return null;
  if (existing.user_id !== userId) return false;

  const next = {
    title: fields.title ?? existing.title,
    description: fields.description ?? existing.description,
    price: fields.price ?? existing.price,
    category: fields.category ?? existing.category,
    image_url: fields.imageUrl ?? existing.image_url,
    status: fields.status ?? existing.status
  };

  await db.execute(
    `UPDATE listings
     SET title = ?, description = ?, price = ?, category = ?, image_url = ?, status = ?
     WHERE id = ?`,
    [
      next.title.trim(),
      next.description.trim(),
      Number(next.price),
      next.category,
      next.image_url,
      next.status,
      id
    ]
  );

  return findListingById(id);
}

export async function deleteListing(id, userId) {
  const [rows] = await db.execute("SELECT * FROM listings WHERE id = ?", [id]);
  const existing = rows[0];
  if (!existing) return null;
  if (existing.user_id !== userId) return false;
  await db.execute("DELETE FROM listings WHERE id = ?", [id]);
  return true;
}
