const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');
const router = express.Router();

const User = require('..//..//models/User')



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


/*
// Login Route
router.post('/login', async (req, res) => {
    //const { email, password } = req.body;
    const { email, password } = req.body;

    try {
        // Check if the user exists
        console.log(`${[email]}`)
        console.log('Email:', email);  // Debugging log
        console.log('Password:', password);  // Debugging
        console.log(req.body.email)
        
        //const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        //const user = await pool.query('SELECT $1::text as name', [email]);
        const user = await User.findOne({ where: { email } });
        //const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        //const user = await pool.query('SELECT * FROM users WHERE email = $1', ['fjoshe@gmail.com']);
        
        console.log('User:', user.email);
        
        console.log('Hyre ktu?')

        if (user.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.rows[0].password);

        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT Payload
        const payload = {
            user: {
                id: user.rows[0].id,
                name: user.rows[0].name,
                email: user.rows[0].email,
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
        console.error(error.message);
        res.status(500).json({ message: 'Server erroreeeee' });
    }
})
*/


// Register a new user
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


module.exports = router