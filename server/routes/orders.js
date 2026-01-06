import express from 'express';
import Order from '../models/Order.js';
import { verifyToken, canEdit } from '../middleware/authMiddleware.js';

const router = express.Router();

// In-memory order storage (fallback when MongoDB is not available)
let inMemoryOrders = [];
let nextOrderId = 1;

// Helper to check if MongoDB is connected
const isMongoConnected = () => {
    return global.mongoose?.connection?.readyState === 1;
};

// Helper to generate order number
const generateOrderNumber = (count) => {
    return `BSB${String(count + 1).padStart(5, '0')}`;
};

// Get all orders (Admin only)
router.get('/', verifyToken, canEdit, async (req, res) => {
    try {
        if (isMongoConnected()) {
            const orders = await Order.find().sort({ createdAt: -1 });
            res.json(orders);
        } else {
            const orders = [...inMemoryOrders].sort((a, b) => b.createdAt - a.createdAt);
            res.json(orders);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single order by ID
router.get('/:id', async (req, res) => {
    try {
        if (isMongoConnected()) {
            const order = await Order.findById(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        } else {
            const order = inMemoryOrders.find(o => o._id === req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json(order);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new order
router.post('/', async (req, res) => {
    try {
        const { customerName, customerEmail, customerPhone, items, totalAmount, notes } = req.body;

        if (isMongoConnected()) {
            const order = new Order({
                customerName,
                customerEmail,
                customerPhone,
                items,
                totalAmount,
                notes
            });

            const savedOrder = await order.save();
            res.status(201).json(savedOrder);
        } else {
            const orderNumber = generateOrderNumber(inMemoryOrders.length);
            const newOrder = {
                _id: String(nextOrderId++),
                orderNumber,
                customerName,
                customerEmail,
                customerPhone,
                items,
                totalAmount,
                status: 'pending',
                paymentMethod: 'pending',
                notes: notes || '',
                createdAt: new Date(),
                updatedAt: new Date()
            };

            inMemoryOrders.push(newOrder);
            res.status(201).json(newOrder);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update order status (Admin only)
router.patch('/:id/status', verifyToken, canEdit, async (req, res) => {
    try {
        const { status } = req.body;

        if (isMongoConnected()) {
            const order = await Order.findByIdAndUpdate(
                req.params.id,
                { status, updatedAt: new Date() },
                { new: true }
            );
            
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            
            res.json(order);
        } else {
            const order = inMemoryOrders.find(o => o._id === req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            order.status = status;
            order.updatedAt = new Date();
            res.json(order);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update payment method (Admin only)
router.patch('/:id/payment', verifyToken, canEdit, async (req, res) => {
    try {
        const { paymentMethod } = req.body;

        if (isMongoConnected()) {
            const order = await Order.findByIdAndUpdate(
                req.params.id,
                { paymentMethod, updatedAt: new Date() },
                { new: true }
            );
            
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            
            res.json(order);
        } else {
            const order = inMemoryOrders.find(o => o._id === req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            order.paymentMethod = paymentMethod;
            order.updatedAt = new Date();
            res.json(order);
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete order (Admin only)
router.delete('/:id', verifyToken, canEdit, async (req, res) => {
    try {
        if (isMongoConnected()) {
            const order = await Order.findByIdAndDelete(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.json({ message: 'Order deleted successfully' });
        } else {
            const index = inMemoryOrders.findIndex(o => o._id === req.params.id);
            if (index === -1) {
                return res.status(404).json({ message: 'Order not found' });
            }
            inMemoryOrders.splice(index, 1);
            res.json({ message: 'Order deleted successfully' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get order statistics (Admin only)
router.get('/stats/summary', verifyToken, canEdit, async (req, res) => {
    try {
        if (isMongoConnected()) {
            const totalOrders = await Order.countDocuments();
            const pendingOrders = await Order.countDocuments({ status: 'pending' });
            const completedOrders = await Order.countDocuments({ status: 'completed' });
            
            const revenueResult = await Order.aggregate([
                { $match: { status: { $in: ['completed', 'processing'] } } },
                { $group: { _id: null, total: { $sum: '$totalAmount' } } }
            ]);
            
            const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

            res.json({
                totalOrders,
                pendingOrders,
                completedOrders,
                totalRevenue
            });
        } else {
            const totalOrders = inMemoryOrders.length;
            const pendingOrders = inMemoryOrders.filter(o => o.status === 'pending').length;
            const completedOrders = inMemoryOrders.filter(o => o.status === 'completed').length;
            
            const totalRevenue = inMemoryOrders
                .filter(o => o.status === 'completed' || o.status === 'processing')
                .reduce((sum, o) => sum + o.totalAmount, 0);

            res.json({
                totalOrders,
                pendingOrders,
                completedOrders,
                totalRevenue
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
