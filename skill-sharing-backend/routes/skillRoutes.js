const express = require('express');
const authMiddleware = require('../authMiddleware');
const Skills = require('../../models/Skills');

const router = express.Router();

// Fetch skills with filters
router.get('/', async (req, res) => {
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

    try {
        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching skills:', error);
        res.status(500).json({ error: 'Error fetching skills' });
    }
});


// Add more routes here as needed, for example:
// Create a new skill (POST /api/skills)
// Update a skill (PUT /api/skills/:id)
// Delete a skill (DELETE /api/skills/:id)

module.exports = router;
