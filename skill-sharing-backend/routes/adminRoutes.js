const express = require('express');
const router = express.Router();
const adminAuth = require('../authMiddleware/adminAuth');
const User = require('../../models/User');

// 1. Get all users (View users in the admin dashboard)
router.get('/users', adminAuth, async (req, res) => {
    try {
        const users = await User.findAll(); // Fetch all users from the database
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users.' });
    }
});

// 2. Get a Single User by ID (GET /users/:id)
router.get('/users/:id', async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user' });
    }
});

// 3. Update user details (Admin updates user role or status)
router.put('/user/:id', adminAuth, async (req, res) => {
    const { id } = req.params;
    const { role, status } = req.body;

    try {
        const user = await User.findByPk(id);
        if (user) {
            user.role = role || user.role;  // Update user role
            user.status = status || user.status; // Update user status
            await user.save(); // Save the updated user
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user.' });
    }
});

// 4. Delete a user (Admin deletes a user)
router.delete('/user/:id', adminAuth, async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (user) {
            await user.destroy(); // Delete the user from the database
            res.json({ message: 'User deleted successfully.' });
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user.' });
    }
});

module.exports = router;