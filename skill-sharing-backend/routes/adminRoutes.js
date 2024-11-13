const express = require('express');
const router = express.Router();
const adminAuth = require('../authMiddleware/adminAuth');
const User = require('../../models/User');

// Get all users (View users in the admin dashboard)
router.get('/users', adminAuth, async (req, res) => {
    try {
        const users = await User.findAll(); // Fetch all users from the database
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users.' });
    }
});

// Update user details (Admin updates user role or status)
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

// Delete a user (Admin deletes a user)
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