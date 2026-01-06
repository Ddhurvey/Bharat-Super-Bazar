import express from 'express';
import { verifyToken, canEdit } from '../middleware/authMiddleware.js';

const router = express.Router();

// In-memory storage (works without MongoDB)
let products = [
    // Garments
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
    
    // School Uniforms
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
    
    // Footwear
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
    
    // Accessories
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
    },
    {
        _id: '11',
        name: 'Necklace Set',
        price: 799,
        originalPrice: 1199,
        category: 'accessories',
        subcategory: 'jewellery',
        description: 'Beautiful necklace set with matching earrings.',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500',
        inStock: true,
        rating: 4.7,
        createdAt: new Date('2024-01-05')
    },
    {
        _id: '12',
        name: 'Makeup Kit',
        price: 599,
        originalPrice: 899,
        category: 'accessories',
        subcategory: 'cosmetics',
        description: 'Complete makeup kit with essential items.',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500',
        inStock: true,
        rating: 4.5,
        createdAt: new Date('2024-01-04')
    },
    
    // Hosiery
    {
        _id: '13',
        name: 'Cotton Socks Pack',
        price: 249,
        originalPrice: 349,
        category: 'hosiery',
        subcategory: 'socks',
        description: 'Pack of 3 premium cotton socks. Comfortable and durable.',
        image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=500',
        inStock: true,
        rating: 4.4,
        createdAt: new Date('2024-01-03')
    },
    {
        _id: '14',
        name: 'Innerwear Set',
        price: 399,
        originalPrice: 549,
        category: 'hosiery',
        subcategory: 'innerwear',
        description: 'Premium quality innerwear set. Soft and comfortable.',
        image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500',
        inStock: true,
        rating: 4.6,
        createdAt: new Date('2024-01-02')
    },
    
    // Gift Items
    {
        _id: '15',
        name: 'Decorative Gift Set',
        price: 899,
        originalPrice: 1299,
        category: 'gifts',
        subcategory: 'decorative',
        description: 'Beautiful decorative gift set. Perfect for all occasions.',
        image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=500',
        inStock: true,
        rating: 4.5,
        createdAt: new Date('2024-01-01')
    },
    {
        _id: '16',
        name: 'Kids Toy Set',
        price: 699,
        originalPrice: 999,
        category: 'gifts',
        subcategory: 'toys',
        description: 'Educational toy set for kids. Safe and fun.',
        image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500',
        inStock: true,
        rating: 4.8,
        createdAt: new Date('2023-12-31')
    }
];

let nextId = 17;

// GET All Products
router.get('/', (req, res) => {
    try {
        // Sort by createdAt descending
        const sortedProducts = [...products].sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );
        res.json(sortedProducts);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: err.message });
    }
});

// ADD Product (Protected)
router.post('/', verifyToken, canEdit, (req, res) => {
    try {
        const { name, price, category, description, image } = req.body;
        
        const newProduct = {
            _id: String(nextId++),
            name,
            price,
            category,
            description,
            image,
            createdAt: new Date()
        };
        
        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE Product (Protected)
router.delete('/:id', verifyToken, canEdit, (req, res) => {
    try {
        const { id } = req.params;
        const initialLength = products.length;
        products = products.filter(p => p._id !== id);
        
        if (products.length === initialLength) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
