const express = require('express');
const User = require('../../models/User');
const Comment = require('../../models/Comment');
const Tag = require('../../models/Tag');
const authMiddleware = require('../authMiddleware/authMiddleware');
const router = express.Router();


// Create a new comment
router.post('/:post_id', authMiddleware, async (req, res) => {
    try {
        const { content } = req.body;
        const { post_id } = req.params;
        const user_id = req.user.id; // Assuming authentication middleware provides req.user (GOTTA BE LOGGED IN!)
        console.log(`PostID: ${post_id} UserID: ${user_id}`);
        console.log(`PostID: ${post_id}, UserID: ${user_id}, Content: ${content}`);
        const newComment = await Comment.create({ post_id, user_id, content });
        res.status(201).json(newComment);
    } catch (err) {
        console.error("Error details:", err);
        res.status(500).json({ error: 'Failed to create comment', details: err.message });
    }
});

// Get comments for a specific post
router.get('/:post_id', async (req, res) => {
    try {
        const { post_id } = req.params;
        const comments = await Comment.findAll({
            where: { post_id },
            include: { model: User, attributes: ['name'] },
            order: [['created_at', 'ASC']],
        });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch comments', details: err.message });
    }
});

module.exports = router;