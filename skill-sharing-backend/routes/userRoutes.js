const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../authMiddleware');
const pool = require('../config/database');
const router = express.Router();

const User = require('..//..//models/User');
const Skills = require('../../models/Skills');


// User Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Continue with password verification and other logic
        console.log(user.name)
        console.log(user.email)
        console.log(user.password)
        console.log(password)

        /*
        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        */
        
        // Has the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log(`Is it a match: ${isMatch}`)
        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT Payload
        const payload = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
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


// Register a New User
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if the user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        console.log(userExists.rows)
        
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        // Has the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert the new user into the database
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        );

        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server errorzh' });
    }
});

// Get User Profile
// Retrieves the user's profile information based on their ID (extracted from the JWT token).

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
             attributes: ['id', 'name', 'email'],
             include: [{
                model: Skills,
                as: 'skills',
                attributes: ['id', 'user_id', 'title', 'description', 'price'],
             }] });
        //const skills = await Skills.findAll({where: {userId}})
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
// Allows the user to update their profile information like name or email.

router.put('/profile', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // `req.user` is populated by `authMiddleware`
        const { name, email } = req.body;

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();

        res.json(user);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Server error' });
    }
});




module.exports = router