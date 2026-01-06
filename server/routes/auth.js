import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verifyToken, isOwner } from '../middleware/authMiddleware.js';

const router = express.Router();

// In-memory user storage (fallback when MongoDB is not available)
let inMemoryUsers = [];
let nextUserId = 1;

// Helper to check if MongoDB is connected
const isMongoConnected = () => {
    return global.mongoose?.connection?.readyState === 1;
};

// Register
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (isMongoConnected()) {
            // Use MongoDB
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(400).json({ message: 'User already exists' });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const userCount = await User.countDocuments();
            const role = userCount === 0 ? 'owner' : 'user';

            const newUser = new User({ name, email, password: hashedPassword, role });
            await newUser.save();

            const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.status(201).json({
                token,
                user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
                message: 'User registered successfully'
            });
        } else {
            // Use in-memory storage
            const existingUser = inMemoryUsers.find(u => u.email === email);
            if (existingUser) return res.status(400).json({ message: 'User already exists' });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const role = inMemoryUsers.length === 0 ? 'owner' : 'user';
            const newUser = {
                _id: String(nextUserId++),
                name,
                email,
                password: hashedPassword,
                role,
                createdAt: new Date()
            };

            inMemoryUsers.push(newUser);

            const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.status(201).json({
                token,
                user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
                message: 'User registered successfully (in-memory mode)'
            });
        }
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (isMongoConnected()) {
            // Use MongoDB
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Invalid credentials' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.json({
                token,
                user: { id: user._id, name: user.name, email: user.email, role: user.role }
            });
        } else {
            // Use in-memory storage
            const user = inMemoryUsers.find(u => u.email === email);
            if (!user) return res.status(400).json({ message: 'Invalid credentials' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.json({
                token,
                user: { id: user._id, name: user.name, email: user.email, role: user.role }
            });
        }
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Get All Users (Owner Only)
router.get('/users', verifyToken, isOwner, async (req, res) => {
    try {
        if (isMongoConnected()) {
            const users = await User.find().select('-password');
            res.json(users);
        } else {
            const users = inMemoryUsers.map(({ password, ...user }) => user);
            res.json(users);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Promote User (Owner Only)
router.patch('/promote/:id', verifyToken, isOwner, async (req, res) => {
    try {
        const { role } = req.body;

        if (isMongoConnected()) {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            if (user.role === 'owner') return res.status(400).json({ message: 'Cannot change owner role' });

            user.role = role;
            await user.save();

            res.json({ message: `User role updated to ${role}`, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
        } else {
            const user = inMemoryUsers.find(u => u._id === req.params.id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            if (user.role === 'owner') return res.status(400).json({ message: 'Cannot change owner role' });

            user.role = role;

            res.json({ message: `User role updated to ${role}`, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
