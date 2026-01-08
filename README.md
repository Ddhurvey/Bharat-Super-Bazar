# 🛍️ Bharat Super Bazar - E-Commerce Platform

A full-stack e-commerce web application for Bharat Super Bazar, featuring a modern React frontend and Node.js/Express backend.

## 🌟 Features

- **Modern Authentication**: ChatGPT-style login with Google OAuth and email/password
- **Google Sign-In**: One-click authentication with Google accounts
- **Product Catalog**: Browse products across multiple categories (Garments, Uniforms, Footwear, Accessories, Hosiery, Gifts)
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Search & Filter**: Find products easily with search and category filters
- **Shopping Cart**: Add products to cart and manage quantities
- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Admin Panel**: Manage products, orders, and users (admin access required)
- **Order Management**: Place and track orders
- **Production Ready**: Configured for deployment on Vercel and Render
- **In-Memory Storage**: Works without MongoDB for quick setup

## 🚀 Tech Stack

### Frontend

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Google OAuth** - @react-oauth/google for authentication
- **Lucide React** - Icon library
- **CSS3** - Styling

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** (optional) - Database
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Google Auth Library** - OAuth token verification

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

   **Frontend** - Create `.env` in root directory:

   ```env
   VITE_API_URL=http://localhost:5001
   VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   ```

   **Backend** - Create `.env` in the `server` directory:

   ```env
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/bharat-bazar
   JWT_SECRET=your_secret_key_here
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   ```

   **Important**: See `GOOGLE_OAUTH_SETUP.md` for detailed Google OAuth setup instructions.

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

The app features modern, ChatGPT-style authentication:

- **Google OAuth**: One-click sign-in with Google accounts
- **Email/Password**: Traditional registration and login
- **JWT Tokens**: Secure, stateless authentication
- **Password Hashing**: Bcrypt for secure password storage
- **Role-Based Access**: Customer, Admin, and Owner roles
- **Protected Routes**: Middleware-based route protection

See `QUICK_START.md` for setup instructions.

## 📚 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get up and running in 5 minutes
- **[Google OAuth Setup](GOOGLE_OAUTH_SETUP.md)** - Detailed Google OAuth configuration
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Deploy to production (Vercel + Render)
- **[Login Guide](LOGIN_GUIDE.md)** - User authentication documentation

## 📱 API Endpoints

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Add new product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth login
- `POST /api/auth/social` - Social login (Facebook, etc.)
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
