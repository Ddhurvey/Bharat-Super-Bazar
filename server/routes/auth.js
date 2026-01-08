import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import { verifyToken, isOwner } from '../middleware/authMiddleware.js';

const router = express.Router();

// Initialize Google OAuth Client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// In-memory user storage (fallback when MongoDB is not available)
let inMemoryUsers = [];
let nextUserId = 1;

// Initialize default admin
(async () => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('Dev@750', salt);
        inMemoryUsers.push({
            _id: 'owner_1',
            name: 'Devendra Dhurve',
            email: 'devendradhur85@gmail.com',
            password: hashedPassword,
            role: 'owner',
            createdAt: new Date()
        });
        console.log('👑 Default Owner initialized: devendradhur85@gmail.com / Dev@750');
    } catch (err) {
        console.error('Failed to initialize owner:', err);
    }
})();

// Helper to check if MongoDB is connected
const isMongoConnected = () => {
    return global.mongoose?.connection?.readyState === 1;
};

// Register
router.post('/register', async (req, res) => {
    console.log('📝 Register attempt:', req.body);
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            console.log('❌ Missing fields');
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (isMongoConnected()) {
            console.log('💽 Using MongoDB for register');
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
            console.log('💾 Using in-memory storage for register');
            const existingUser = inMemoryUsers.find(u => u.email === email);
            if (existingUser) {
                console.log('❌ User already exists:', email);
                return res.status(400).json({ message: 'User already exists' });
            }

            console.log('🔒 Hashing password...');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            console.log('✅ Password hashed');

            // If inMemoryUsers only has the default admin, the next user should be 'user'
            // Logic: if there is NO owner, make this one owner. But we just added an owner. 
            // So any new registration will effectively be a 'user' unless we change logic.
            // Let's keep the logic: if list is empty -> owner. But list is not empty now.
            // So new registrations will be 'user'. Correct.
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
            console.log('✅ User added to memory:', newUser);

            console.log('🔑 Signing token...');
            if (!process.env.JWT_SECRET) {
                 console.warn('⚠️ JWT_SECRET missing in auth.js, using fallback');
                 process.env.JWT_SECRET = 'fallback_secret';
            }
            const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
            console.log('✅ Token signed');

            res.status(201).json({
                token,
                user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
                message: 'User registered successfully (in-memory mode)'
            });
        }
    } catch (err) {
        console.error('🔥 Registration error:', err);
        res.status(500).json({ error: err.message, stack: err.stack });
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
// Social Login (Mock)
router.post('/social', async (req, res) => {
    console.log('🌐 Social login attempt:', req.body);
    try {
        const { provider, name, email } = req.body;
        
        let user;
        if (isMongoConnected()) {
            console.log('💽 Using MongoDB for social login');
            user = await User.findOne({ email });
            if (!user) {
                console.log('🆕 Creating new social user in Mongo');
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(Math.random().toString(36), salt);
                
                const userCount = await User.countDocuments();
                const role = userCount === 0 ? 'owner' : 'user';
                
                user = new User({ name, email, password: hashedPassword, role });
                await user.save();
            }
        } else {
             console.log('💾 Using in-memory storage for social login');
             user = inMemoryUsers.find(u => u.email === email);
             if (!user) {
                 console.log('🆕 Creating new social user in memory');
                 const salt = await bcrypt.genSalt(10);
                 const hashedPassword = await bcrypt.hash(Math.random().toString(36), salt);
                 
                 const role = inMemoryUsers.length === 0 ? 'owner' : 'user';
                 
                 user = {
                     _id: String(nextUserId++),
                     name,
                     email,
                     password: hashedPassword,
                     role,
                     createdAt: new Date()
                 };
                 inMemoryUsers.push(user);
             } else {
                 console.log('✅ Found existing social user in memory:', user.name);
             }
        }

        console.log('🔑 Signing token for social user:', user._id);
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email, role: user.role }
        });

    } catch (err) {
        console.error('🔥 Social Login error:', err);
        res.status(500).json({ error: err.message });
    }
});

// Google OAuth Login
router.post('/google', async (req, res) => {
    console.log('🔐 Google OAuth attempt');
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: 'Google token is required' });
        }

        // Verify the Google token
        let ticket;
        try {
            ticket = await googleClient.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
        } catch (verifyError) {
            console.error('❌ Google token verification failed:', verifyError);
            return res.status(401).json({ message: 'Invalid Google token' });
        }

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        console.log('✅ Google token verified:', email);

        let user;
        if (isMongoConnected()) {
            console.log('💽 Using MongoDB for Google login');
            user = await User.findOne({ email });
            if (!user) {
                console.log('🆕 Creating new Google user in Mongo');
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(Math.random().toString(36), salt);
                
                const userCount = await User.countDocuments();
                const role = userCount === 0 ? 'owner' : 'user';
                
                user = new User({ 
                    name, 
                    email, 
                    password: hashedPassword, 
                    role,
                    profilePicture: picture 
                });
                await user.save();
            }
        } else {
            console.log('💾 Using in-memory storage for Google login');
            user = inMemoryUsers.find(u => u.email === email);
            if (!user) {
                console.log('🆕 Creating new Google user in memory');
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(Math.random().toString(36), salt);
                
                const role = inMemoryUsers.length === 0 ? 'owner' : 'user';
                
                user = {
                    _id: String(nextUserId++),
                    name,
                    email,
                    password: hashedPassword,
                    role,
                    profilePicture: picture,
                    createdAt: new Date()
                };
                inMemoryUsers.push(user);
            } else {
                console.log('✅ Found existing Google user in memory:', user.name);
            }
        }

        console.log('🔑 Signing JWT token for Google user:', user._id);
        if (!process.env.JWT_SECRET) {
            console.warn('⚠️ JWT_SECRET missing, using fallback');
            process.env.JWT_SECRET = 'fallback_secret';
        }
        const jwtToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({
            token: jwtToken,
            user: { 
                id: user._id, 
                name: user.name, 
                email: user.email, 
                role: user.role,
                profilePicture: user.profilePicture 
            }
        });

    } catch (err) {
        console.error('🔥 Google OAuth error:', err);
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
