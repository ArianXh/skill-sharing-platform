const express = require('express');
const authMiddleware = require('../authMiddleware');
const Skills = require('../../models/Skills');

const router = express.Router();

// Fetch ALL skills with filters
router.get('/skills', async (req, res) => {
    /*
    const { category, skill_level, search } = req.query;

    // Create an array for the values to pass to the query
    const values = [];

    // Construct the query dynamically based on provided filters
    let query = `SELECT * FROM skills WHERE 1=1`; // Start with a true condition

    if (category) {
        query += ` AND category_id = $${values.length + 1}`;
        values.push(category);
    }

    if (skill_level) {
        query += ` AND skill_level = $${values.length + 1}`;
        values.push(skill_level);
    }

    if (search) {
        query += ` AND title ILIKE '%' || $${values.length + 1} || '%'`;
        values.push(search);
    }

    query += ` ORDER BY popularity_score DESC`;
    */
    try {
        //const result = await pool.query(query, values);
        const skills = await Skills.findAll();
        console.log(`ARIAN ${skills}`)
        //res.json(result.rows);
        res.status(200).json(skills)
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ error: 'Error fetching skills' });
    }
});


// Get skills for a specific user (GET /api/skills/user/:userId)
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        // Fetch skills where `user_id` matches the provided userId
        const userSkills = await Skills.findAll({
            where: { user_id: userId },
            order: [['createdAt', 'DESC']], // Optional: Order by creation date, or any other field
        });

        if (userSkills.length === 0) {
            return res.status(404).json({ message: 'No skills found for this user' });
        }

        res.status(200).json(userSkills);
    } catch (error) {
        console.error('Error fetching user skills:', error);
        res.status(500).json({ error: 'Error fetching skills for the user' });
    }
});


// Add more routes here as needed, for example:
// Create a new skill (POST /api/skills)
router.post('/create', authMiddleware, async (req, res) => {
    const { title, description, price, category_id } = req.body;

    try {
        const newSkill = await Skills.create({
            title,
            description,
            price,
            category_id,
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
