const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/database');
const router = express.Router();

// Register a new user
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        
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
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router