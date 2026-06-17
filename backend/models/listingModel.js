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

export function listListings({ search, category, userId, onlyMine = false }) {
  const filters = [];
  const params = {};

  if (search) {
    filters.push(
      "(listings.title LIKE @search OR listings.description LIKE @search OR listings.category LIKE @search)"
    );
    params.search = `%${search}%`;
  }

  if (category) {
    filters.push("LOWER(listings.category) = LOWER(@category)");
    params.category = category;
  }

  if (onlyMine) {
    filters.push("listings.user_id = @userId");
    params.userId = userId;
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  return db.prepare(`${listingSelect} ${where} ORDER BY listings.created_at DESC`).all(params);
}

export function findListingById(id) {
  return db.prepare(`${listingSelect} WHERE listings.id = ?`).get(id);
}

export function createListing({ title, description, price, category, imageUrl, userId }) {
  const result = db
    .prepare(
      `INSERT INTO listings (title, description, price, category, image_url, user_id)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(title.trim(), description.trim(), Number(price), category, imageUrl, userId);
  return findListingById(result.lastInsertRowid);
}

export function updateListing(id, userId, fields) {
  const existing = db.prepare("SELECT * FROM listings WHERE id = ?").get(id);
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

  db.prepare(
    `UPDATE listings
     SET title = ?, description = ?, price = ?, category = ?, image_url = ?, status = ?
     WHERE id = ?`
  ).run(
    next.title.trim(),
    next.description.trim(),
    Number(next.price),
    next.category,
    next.image_url,
    next.status,
    id
  );

  return findListingById(id);
}

export function deleteListing(id, userId) {
  const existing = db.prepare("SELECT * FROM listings WHERE id = ?").get(id);
  if (!existing) return null;
  if (existing.user_id !== userId) return false;
  db.prepare("DELETE FROM listings WHERE id = ?").run(id);
  return true;
}
