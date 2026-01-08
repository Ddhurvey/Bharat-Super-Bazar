import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
if (!process.env.JWT_SECRET) {
    process.env.JWT_SECRET = 'fallback_secret_key_for_dev_only';
    console.warn('⚠️  JWT_SECRET not found in environment. Using fallback secret.');
}

// CORS Configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    process.env.FRONTEND_URL, // Add your Vercel URL in production
].filter(Boolean); // Remove undefined values

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn(`⚠️  CORS blocked request from origin: ${origin}`);
            callback(null, true); // Allow for now, restrict in production
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Bharat Super Bazar API is Running');
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('🔥 Global Error Handler:', err);
    res.status(500).json({ 
        message: 'Internal Server Error', 
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}`);
    console.log(`⚠️  Running in standalone mode (no MongoDB required)`);
    console.log(`🔑 Auth Mock: Login available with any email/password (registers automatically if new in memory)`);
});
