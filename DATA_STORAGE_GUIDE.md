# 📊 Bharat Super Bazar - Data Storage Guide

## Current Data Storage Architecture

### 1. 🛒 Shopping Cart Data

**Storage Location:** Browser's `localStorage`

- **File:** `src/context/CartContext.jsx`
- **Key:** `bharatBazarCart`
- **Format:** JSON array of cart items
- **Persistence:** Survives page refresh and browser restart
- **Scope:** Per browser/device (not synced across devices)

**Example Data:**

```json
[
  {
    "_id": "1",
    "name": "Designer Kurta Set",
    "price": 899,
    "quantity": 2,
    "image": "https://...",
    "category": "garments"
  }
]
```

**Code:**

```javascript
// Save to localStorage
localStorage.setItem("bharatBazarCart", JSON.stringify(cart));

// Load from localStorage
const savedCart = localStorage.getItem("bharatBazarCart");
if (savedCart) {
  setCart(JSON.parse(savedCart));
}
```

---

### 2. 👤 User Authentication Data

**Current Status:** ⚠️ **NOT IMPLEMENTED** (Placeholder only)

**Storage Location (when enabled):** MongoDB Database

- **Database:** `bharat-bazar`
- **Collection:** `users`
- **Model:** `server/models/User.js`

**User Schema:**

```javascript
{
    name: String,        // User's full name
    email: String,       // Unique email (used for login)
    password: String,    // Hashed password (bcrypt)
    role: String,        // 'user', 'admin', or 'owner'
    createdAt: Date      // Registration timestamp
}
```

**Current Implementation:**

- File: `src/context/AuthContext.jsx`
- Status: Hardcoded dummy values
- Login/Register: Disabled for development

**To Enable:**

1. Install MongoDB
2. Uncomment database connection in `server/index.js`
3. Update `AuthContext.jsx` to use real API calls

---

### 3. 📦 Product Data

**Storage Location:** Server Memory (In-Memory Array)

- **File:** `server/routes/products.js`
- **Persistence:** ⚠️ Lost on server restart
- **Count:** 16 products

**Product Schema:**

```javascript
{
    _id: String,
    name: String,
    price: Number,
    originalPrice: Number,
    category: String,
    subcategory: String,
    description: String,
    image: String,           // URL to product image
    inStock: Boolean,
    rating: Number,          // 1-5 stars
    createdAt: Date
}
```

**Current Products:**

1. Designer Kurta Set - ₹899
2. Men's Cotton Shirt - ₹599
3. Kids Party Dress - ₹699
4. Traditional Saree - ₹1499
5. School Uniform Shirt - ₹350
6. School Uniform Pants - ₹450
7. Formal Leather Shoes - ₹1299
8. Casual Chappals - ₹299
9. Women's Bellies - ₹499
10. Fashion Earrings - ₹199
11. Necklace Set - ₹799
12. Makeup Kit - ₹599
13. Cotton Socks Pack - ₹249
14. Innerwear Set - ₹399
15. Decorative Gift Set - ₹899
16. Kids Toy Set - ₹699

**To Enable Persistent Storage:**

1. Install MongoDB
2. Uncomment database connection
3. Products will auto-save to `products` collection

---

## 🔐 Security & Privacy

### Current Security Measures:

✅ **Cart Data:** Stored locally (private to user's browser)
✅ **Passwords:** Would be hashed with bcrypt (when MongoDB enabled)
✅ **JWT Tokens:** Would be used for authentication (when enabled)
✅ **CORS:** Enabled for API security

### Data Privacy:

- **Cart data** never leaves the user's browser
- **No tracking** or analytics implemented
- **No third-party** data sharing

---

## 📁 File Structure

```
paid project/
├── src/
│   ├── context/
│   │   ├── AuthContext.jsx      ← User auth (placeholder)
│   │   └── CartContext.jsx      ← Cart data (localStorage)
│   └── pages/
│       └── Products.jsx         ← Product display
│
└── server/
    ├── models/
    │   ├── User.js              ← User schema (ready for MongoDB)
    │   └── Product.js           ← Product schema (ready for MongoDB)
    ├── routes/
    │   ├── auth.js              ← Login/register routes
    │   └── products.js          ← Product CRUD (in-memory)
    └── index.js                 ← Server entry (MongoDB commented out)
```

---

## 🚀 How to Enable MongoDB (Persistent Storage)

### Step 1: Install MongoDB

Download from: https://www.mongodb.com/try/download/community

### Step 2: Start MongoDB Service

```bash
# Windows
net start MongoDB

# Or use MongoDB Compass GUI
```

### Step 3: Uncomment Database Connection

File: `server/index.js`

```javascript
// Uncomment these lines:
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/bharat-bazar")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));
```

### Step 4: Update Product Routes

File: `server/routes/products.js`

- Replace in-memory array with MongoDB queries
- Use `Product.find()`, `Product.create()`, etc.

### Step 5: Enable Real Authentication

File: `src/context/AuthContext.jsx`

- Replace dummy values with real API calls
- Implement login/register functionality

---

## 📊 Data Flow Diagram

```
User Browser
    │
    ├─► localStorage (Cart Data)
    │   └─► Persists across sessions
    │
    └─► API Calls
        │
        ├─► /api/products (GET)
        │   └─► Server Memory → Returns product list
        │
        ├─► /api/products (POST) [Admin only]
        │   └─► Server Memory → Adds new product
        │
        └─► /api/auth/login (POST) [When enabled]
            └─► MongoDB → Validates user & returns JWT
```

---

## 💡 Summary

### What's Saved NOW:

✅ **Cart items** → Browser localStorage (per device)
✅ **Products** → Server memory (temporary)

### What's NOT Saved (Yet):

❌ **User accounts** → Need MongoDB
❌ **Order history** → Need MongoDB
❌ **Persistent products** → Need MongoDB

### Quick Answer:

**Cart data** is saved in your browser's localStorage and persists across page refreshes.
**User data** is currently NOT saved anywhere (placeholder only).
**Product data** is in server memory and resets when server restarts.

To enable full database storage, you need to install and configure MongoDB!
