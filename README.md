# 🛒 Campus Marketplace

> A campus-focused marketplace where students can **buy and sell items within their campus community**.

---

## 📌 About the Project

**Campus Marketplace** is a full-stack web application designed specifically for students to **buy and sell items within their campus community**.

Students can list items such as 📚 books, 🚲 bicycles, 🖥️ monitors, 🧮 calculators, electronics, and other useful campus-related products.

Instead of relying on scattered WhatsApp, Telegram, or social-media posts, the platform provides a **centralized marketplace** where students can:

* 🔐 Create an account and securely log in
* 🛍️ Browse items listed by other students
* 🔎 Search and filter listings
* ➕ Create and manage their own listings
* ❤️ Save listings to favorites
* 📷 Upload product images
* ✏️ Edit or delete their own listings
* ✅ Mark items as sold
* 👤 View seller/listing information

---

## ✨ Features

### 🔐 Authentication & Authorization

* 📝 User registration
* 🔑 User login and logout
* 🔒 Session-based authentication
* 🔐 Password hashing using `bcrypt`
* 🛡️ Protected routes for authenticated users
* 👤 Ownership checks for listings

### 🛒 Marketplace

* 📋 Browse all available listings
* 🔍 Search products by keywords
* 🏷️ Filter listings by category
* 💰 Display item prices
* 📸 Upload product images
* 📦 Track listing availability
* 👤 Display seller information

### ❤️ Favorites

* ❤️ Add listings to favorites
* 💔 Remove listings from favorites
* 📑 View saved listings
* ⚡ Update favorite state without refreshing the page

### ✏️ Listing Management

Users can:

* ➕ Create a listing
* 👀 View a listing
* ✏️ Update their listing
* 🗑️ Delete their listing
* ✅ Mark an item as sold

### 📷 Image Uploads

Product images are uploaded from the frontend using `FormData` and handled by the backend using **Multer**.

---

## 🏗️ Tech Stack

### 🎨 Frontend

* ⚛️ **React**
* ⚡ **Vite**
* 🎨 CSS
* 🌐 REST API integration

### ⚙️ Backend

* 🟢 **Node.js**
* 🚂 **Express.js**
* 🔐 Session-based authentication
* 🔒 **bcrypt** for password hashing
* 📤 **Multer** for image uploads

### 🗄️ Database

* 🐬 **MySQL**

Main database tables:

* `users`
* `listings`
* `favorites`

---

## 🧩 Project Architecture

The application follows a **separated frontend-backend architecture**:

```text
                ┌─────────────────────┐
                │     React + Vite    │
                │      Frontend       │
                └──────────┬──────────┘
                           │
                     HTTP / REST API
                           │
                           ▼
                ┌─────────────────────┐
                │   Node.js + Express  │
                │       Backend        │
                └──────────┬──────────┘
                           │
                    Route → Controller
                           │
                           ▼
                ┌─────────────────────┐
                │        MySQL        │
                │      Database       │
                └─────────────────────┘
```

### 🔄 Request Flow

```text
User
  ↓
React UI
  ↓
HTTP Request
  ↓
Express Server
  ↓
Route
  ↓
Controller
  ↓
MySQL
  ↓
JSON Response
  ↓
React UI
```

---

## 📁 Project Structure

```text
Campus-Marketplace/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
├── package.json
└── README.md
```

---

## 🔌 REST API

### 🔐 Authentication

| Method | Endpoint             | Description                          |
| ------ | -------------------- | ------------------------------------ |
| `POST` | `/api/auth/register` | Register a new user                  |
| `POST` | `/api/auth/login`    | Log in a user                        |
| `POST` | `/api/auth/logout`   | Log out the current user             |
| `GET`  | `/api/auth/me`       | Get the currently authenticated user |

### 🛍️ Listings

| Method   | Endpoint            | Description            |
| -------- | ------------------- | ---------------------- |
| `GET`    | `/api/listings`     | Get all listings       |
| `GET`    | `/api/listings/:id` | Get a specific listing |
| `POST`   | `/api/listings`     | Create a listing       |
| `PUT`    | `/api/listings/:id` | Update a listing       |
| `DELETE` | `/api/listings/:id` | Delete a listing       |

### ❤️ Favorites

The application also provides functionality for adding, removing, and retrieving a user's favorite listings.

---

## 🗃️ Database Design

### 👤 Users

Stores user authentication and account information.

```text
users
├── id
├── name
├── email
├── password
└── created_at
```

### 🛍️ Listings

Stores products posted by users.

```text
listings
├── id
├── title
├── description
├── price
├── category
├── image_url
├── status
├── user_id
└── created_at
```

### ❤️ Favorites

Connects users with listings they have saved.

```text
favorites
├── id
├── user_id
└── listing_id
```

The database uses relationships and constraints to maintain data integrity between users, listings, and favorites.

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone <your-repository-url>
cd Campus-Marketplace
```

### 2️⃣ Install Dependencies

Install the root dependencies:

```bash
npm install
```

Then install dependencies for both the frontend and backend:

```bash
cd frontend
npm install

cd ../backend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=campus_marketplace

SESSION_SECRET=your_session_secret
```

> ⚠️ Never commit your `.env` file or database credentials to GitHub.

---

## 🗄️ Database Setup

1. Install and run **MySQL**.
2. Create a database named:

```sql
CREATE DATABASE campus_marketplace;
```

3. Configure your database credentials in `.env`.
4. Run the project's database/table setup scripts.

---

## ▶️ Running the Application

### Backend

```bash
cd backend
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

The Vite development server runs on:

```text
http://localhost:5173
```

---

## 🖥️ Application Flow

### 👤 New User


Register
   ↓
Login
   ↓
Browse Marketplace
   ↓
Search / Filter Items
   ↓
View Listing
   ↓
Contact Seller


### 🏷️ Seller


Login
   ↓
Sell an Item
   ↓
Add Details + Image
   ↓
Create Listing
   ↓
Manage Listing
   ↓
Mark as Sold


---

## 🔒 Security

The application implements several security-related practices:

* 🔐 Passwords are hashed using `bcrypt`
* 🍪 Authentication is handled through sessions
* 🛡️ Protected routes prevent unauthorized actions
* 👤 Users can modify/delete only their own listings
* 🔑 Sensitive configuration is stored using environment variables
* 🚫 Database credentials are not stored directly in source code

---

## 🎯 Future Improvements

Some potential improvements include:

* 💬 Real-time buyer-seller messaging
* 🔔 Notifications for new messages and listing activity
* ⭐ Seller ratings and reviews
* 🧭 Location-based campus filtering
* 📱 Improved mobile responsiveness
* 🔍 Advanced search and sorting
* 📊 Seller dashboard and analytics
* 🖼️ Multiple images per listing
* 🚨 Report listing functionality
* 🧹 Automatic cleanup of unused uploaded images

---

## 📚 What I Learned

Building this project provided hands-on experience with:

* ⚛️ Building a frontend using React and Vite
* 🌐 Designing and consuming REST APIs
* 🚂 Building backend services with Node.js and Express
* 🗄️ Working with relational databases and MySQL
* 🔐 Implementing authentication and authorization
* 🔒 Password hashing and session management
* 📤 Handling multipart form data and image uploads
* 🏗️ Structuring a backend using Routes → Controllers → Models
* 🔄 Connecting frontend components with backend APIs
* 🐛 Debugging full-stack applications

---

## 🤝 Contributing

Contributions are welcome! 🎉

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Commit your changes
5. Push the branch
6. Open a Pull Request

---

## ⭐ Support

If you found this project interesting, consider giving it a ⭐ on GitHub!

---

## 👨‍💻 Author

**Arman Jha**

Built as a full-stack project to create a dedicated marketplace for students to conveniently buy and sell items within their campus community. 🎓🛒

---

### 📜 License

This project is intended for educational and portfolio purposes.
