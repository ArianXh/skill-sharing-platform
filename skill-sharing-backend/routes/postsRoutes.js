const express = require('express');
const User = require('..//models/User');
const Skills = require('..//models/Skills');
const Review = require('..//models/Review');
const Categories = require('..//models/Categories');
const Transactions = require('..//models/Transactions');
const Post = require('..//models/Post');
const Comment = require('..//models/Comment');
const Tag = require('..//models/Tag');
const authMiddleware = require('../authMiddleware/authMiddleware');
const router = express.Router();

// Create a new post
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const user_id = req.user.id; // Assuming authentication middleware provides req.user
        console.log(`USER ID: ${user_id}`)
        const newPost = await Post.create({ user_id, title, content, tags });
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create post', details: err.message });
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: { model: User, attributes: ['name'] },
            order: [['created_at', 'DESC']],
        });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts', details: err.message });
    }
});

// Get a specific post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findOne({
            where: { id: req.params.id },
            include: [
                { model: User, attributes: ['name'] },
                { model: Comment, include: { model: User, attributes: ['name'] } },
            ],
        });
        if (!post) return res.status(404).json({ error: 'Post not found' });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch post', details: err.message });
    }
});

module.exports = router;