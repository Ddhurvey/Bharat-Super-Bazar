# 🛍️ Bharat Super Bazar - E-Commerce Platform

A full-stack e-commerce web application for Bharat Super Bazar, featuring a modern React frontend and Node.js/Express backend.

## 🌟 Features

- **Product Catalog**: Browse products across multiple categories (Garments, Uniforms, Footwear, Accessories, Hosiery, Gifts)
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Search & Filter**: Find products easily with search and category filters
- **Shopping Cart**: Add products to cart and manage quantities
- **User Authentication**: Secure login and registration system
- **Admin Panel**: Manage products, orders, and users (admin access required)
- **Order Management**: Place and track orders
- **In-Memory Storage**: Works without MongoDB for quick setup

## 🚀 Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Lucide React** - Icon library
- **CSS3** - Styling

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** (optional) - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (optional - app works without it)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd Bharat-Super-Bazar
   ```

2. **Install frontend dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Install backend dependencies**

   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure environment variables**

   Create a `.env` file in the `server` directory:

   ```env
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/bharat-bazar
   JWT_SECRET=your_secret_key_here
   ```

5. **Start the development servers**

   **Terminal 1 - Frontend:**

   ```bash
   npm run dev
   ```

   **Terminal 2 - Backend:**

   ```bash
   cd server
   npm start
   ```

6. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## 📁 Project Structure

```
Bharat-Super-Bazar/
├── src/                    # Frontend React application
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components
│   ├── context/           # React context for state management
│   └── assets/            # Static assets
├── server/                # Backend Node.js application
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── middleware/        # Custom middleware
│   └── index.js           # Server entry point
├── public/                # Static files
└── package.json           # Frontend dependencies
```

## 🔧 Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend

- `npm start` - Start server
- `npm run dev` - Start server with auto-reload

## 🎨 Features in Detail

### Product Categories

- **Garments**: Men's wear, Women's wear, Kids wear
- **Uniforms**: School uniforms, Office wear
- **Footwear**: Formal shoes, Casual chappals, Bellies
- **Accessories**: Jewellery, Cosmetics
- **Hosiery**: Socks, Innerwear
- **Gifts**: Decorative items, Toys

### User Roles

- **Customer**: Browse and purchase products
- **Admin**: Manage products and orders
- **Owner**: Full system access including user management

## 🔐 Authentication

The app uses JWT-based authentication:

- Register new users
- Login with email and password
- Protected routes for admin features
- Role-based access control

## 📱 API Endpoints

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Add new product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/users` - Get all users (owner only)

### Orders

- `GET /api/orders` - Get all orders (admin only)
- `POST /api/orders` - Create new order
- `PATCH /api/orders/:id/status` - Update order status (admin only)

## 🐛 Known Issues

- Server requires standalone mode (MongoDB integration in progress)
- Some advanced features are still in development

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Contact

For any queries or support, please contact the development team.

## 🙏 Acknowledgments

- Images from Unsplash
- Icons from Lucide React
- Built with ❤️ for Bharat Super Bazar

---

**Note**: This is a development version. For production deployment, ensure proper environment variables, security measures, and database setup.
