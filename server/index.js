import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory product storage
const products = [
    {
        _id: '1',
        name: 'Designer Kurta Set',
        price: 899,
        originalPrice: 1299,
        category: 'garments',
        subcategory: 'womens-wear',
        description: 'Beautiful designer kurta set with dupatta. Perfect for festive occasions.',
        image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500',
        inStock: true,
        rating: 4.5,
        createdAt: new Date('2024-01-15')
    },
    {
        _id: '2',
        name: 'Men\'s Cotton Shirt',
        price: 599,
        originalPrice: 799,
        category: 'garments',
        subcategory: 'mens-wear',
        description: 'Premium cotton formal shirt. Available in multiple colors.',
        image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
        inStock: true,
        rating: 4.3,
        createdAt: new Date('2024-01-14')
    },
    {
        _id: '3',
        name: 'Kids Party Dress',
        price: 699,
        originalPrice: 999,
        category: 'garments',
        subcategory: 'kids-wear',
        description: 'Adorable party dress for girls. Sizes 2-10 years.',
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500',
        inStock: true,
        rating: 4.7,
        createdAt: new Date('2024-01-13')
    },
    {
        _id: '4',
        name: 'Traditional Saree',
        price: 1499,
        originalPrice: 2199,
        category: 'garments',
        subcategory: 'womens-wear',
        description: 'Elegant silk saree with beautiful embroidery work.',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
        inStock: true,
        rating: 4.8,
        createdAt: new Date('2024-01-12')
    },
    {
        _id: '5',
        name: 'School Uniform Shirt',
        price: 350,
        originalPrice: 450,
        category: 'uniforms',
        subcategory: 'school',
        description: 'Official school uniform shirt. White, premium fabric.',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500',
        inStock: true,
        rating: 4.4,
        createdAt: new Date('2024-01-11')
    },
    {
        _id: '6',
        name: 'School Uniform Pants',
        price: 450,
        originalPrice: 600,
        category: 'uniforms',
        subcategory: 'school',
        description: 'Comfortable school uniform pants. Navy blue.',
        image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
        inStock: true,
        rating: 4.5,
        createdAt: new Date('2024-01-10')
    },
    {
        _id: '7',
        name: 'Formal Leather Shoes',
        price: 1299,
        originalPrice: 1799,
        category: 'footwear',
        subcategory: 'formal',
        description: 'Premium leather formal shoes for men. Perfect for office wear.',
        image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500',
        inStock: true,
        rating: 4.6,
        createdAt: new Date('2024-01-09')
    },
    {
        _id: '8',
        name: 'Casual Chappals',
        price: 299,
        originalPrice: 399,
        category: 'footwear',
        subcategory: 'casual',
        description: 'Comfortable daily wear chappals. Durable and stylish.',
        image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500',
        inStock: true,
        rating: 4.2,
        createdAt: new Date('2024-01-08')
    },
    {
        _id: '9',
        name: 'Women\'s Bellies',
        price: 499,
        originalPrice: 699,
        category: 'footwear',
        subcategory: 'bellies',
        description: 'Trendy flat bellies for women. Multiple colors available.',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500',
        inStock: true,
        rating: 4.4,
        createdAt: new Date('2024-01-07')
    },
    {
        _id: '10',
        name: 'Fashion Earrings',
        price: 199,
        originalPrice: 299,
        category: 'accessories',
        subcategory: 'jewellery',
        description: 'Trendy fashion earrings. Gold-plated design.',
        image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500',
        inStock: true,
        rating: 4.3,
        createdAt: new Date('2024-01-06')
    }
];

// Routes
app.get('/', (req, res) => {
    res.send('Bharat Super Bazar API is Running');
});

app.get('/api/products', (req, res) => {
    const sortedProducts = [...products].sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.json(sortedProducts);
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}`);
    console.log(`⚠️  Running in standalone mode (no MongoDB required)`);
});
