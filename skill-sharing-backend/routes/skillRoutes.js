const express = require('express');
const authMiddleware = require('../authMiddleware');
const Skills = require('../../models/Skills');
const User = require('../../models/User');
const router = express.Router();
const Sequelize = require('sequelize');


// Fetch ALL skills with filters
router.get('/skills', async (req, res) => {
    const { category, skill_level, search } = req.query;
    const filters = {};

    // Apply filters only if they exist in the request
    if (category) filters.category_id = category;
    if (skill_level) filters.skill_level = skill_level;
    if (search) filters.title = { [Sequelize.Op.iLike]: `%${search}%` };

    try {
        const skills = await Skills.findAll({
            where: filters,
            order: [['popularity_score', 'DESC']]
        });
        res.status(200).json(skills);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ error: 'Error fetching skills' });
    }
});


// Fetch a SINGLE skill by ID (GET /api/skills/:id)
router.get('/skills/:id', async (req, res) => {
    const skillId = req.params.id;
    try {
        const skill = await Skills.findByPk(skillId, {
            include: {
                model: User,
                as: 'user',  // Match the alias used in the relationship
                attributes: ['id', 'name', 'email'] // Specify the fields you need
            }
        });
        if (!skill) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        res.status(200).json(skill);
    } catch (error) {
        console.error('Error fetching skill:', error);
        res.status(500).json({ error: 'Error fetching skill' });
    }
});


// Add more routes here as needed, for example:
// Create a new skill (POST /api/skills)
router.post('/create', authMiddleware, async (req, res) => {
    const userId = req.user.id; // Using this to add a skill to THIS user (the one logged in)
    const { title, description, price, skill_level, popularity_score} = req.body;
    try {
        const newSkill = await Skills.create({
            title,
            description,
            price,
            skill_level,
            popularity_score,
            user_id: userId,
        });
        res.status(201).json(newSkill);
    } catch (error) {
        console.error('Error creating skill:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a skill (PUT /api/skills/:id)
// Delete a skill (DELETE /api/skills/:id)

module.exports = router;
