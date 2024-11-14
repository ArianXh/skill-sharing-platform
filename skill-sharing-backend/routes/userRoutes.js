const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../authMiddleware/authMiddleware');
const User = require('../../models/User');
const Skills = require('../../models/Skills');

const router = express.Router();

// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT Payload
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };

        // Sign the JWT and send it to the client
        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'mySecretKey', // Replace in PRODUCTION
            { expiresIn: '1h' }, // Token expiration time
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// New User SignUp
router.post('/signup', async (req, res) => {
    const { name, email, password, role, bio, profile_image_url, experience, ratings_average} = req.body;
    try {
        // Check if the user already exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists!' });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Insert the new user into the database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            bio,
            profile_image_url,
            experience,
            ratings_average,
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get User Profile
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'bio', 'profile_image_url', 'experience', 'ratings_average', 'credits'],
            include: [{
                model: Skills,
                as: 'skills',
                attributes: ['id', 'user_id', 'title', 'description', 'price', 'skill_level', 'popularity_score'],
            }],
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update User Profile
router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // `req.user` is populated by `authMiddleware`
        const { name, email, bio, experience } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.experience = experience || user.experience

        await user.save();
        res.json(user);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
