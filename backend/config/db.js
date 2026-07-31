import mysql from "mysql2/promise";

const dbName = process.env.DB_NAME || "campus_marketplace";
if (!/^[a-zA-Z0-9_]+$/.test(dbName)) {
  throw new Error("DB_NAME can only contain letters, numbers, and underscores.");
}

const baseConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

export const db = mysql.createPool({
  ...baseConfig,
  database: dbName
});

export async function initializeDatabase() {
  const server = mysql.createPool(baseConfig);
  await server.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
  await server.end();

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(180) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(30),
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS listings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(180) NOT NULL,
      description TEXT NOT NULL,
      price DECIMAL(10, 2) NOT NULL,
      category VARCHAR(80) NOT NULL,
      image_url VARCHAR(255),
      status ENUM('available', 'sold') NOT NULL DEFAULT 'available',
      user_id INT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_listings_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
    )
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      listing_id INT NOT NULL,
      UNIQUE KEY unique_user_listing (user_id, listing_id),
      CONSTRAINT fk_favorites_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
      CONSTRAINT fk_favorites_listing
        FOREIGN KEY (listing_id) REFERENCES listings(id)
        ON DELETE CASCADE
    )
  `);
}
