const express = require('express');
const authMiddleware = require('../authMiddleware/authMiddleware');
const Skills = require('../../models/Skills');
const User = require('../../models/User');
const Review = require('../../models/Review');
const Categories = require('../../models/Categories');
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
            attributes: ['id', 'user_id', 'title', 'description', 'price', 'created_at', 'updated_at', 'category_id', 'skill_level', 'popularity_score', 'ratings_average'],
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
            attributes: ['id', 'user_id', 'title', 'description', 'price', 'created_at', 'updated_at', 'category_id', 'skill_level', 'popularity_score', 'ratings_average'],
            include: [
                {
                    model: User,
                    as: 'user',  // Alias should match the model association
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Review,
                    as: 'reviews',  // Alias should match the model association
                    include: [{ model: User, as: 'user', attributes: ['name'] }],
                }
            ]
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
    const { title, description, price, skill_level, popularity_score, category_id } = req.body;
    try {

        // Ensure category_id exists
        const category = await Categories.findByPk(category_id);
        if (!category){
            return res.status(400).json({ error: 'Invalid category' });
        }

        // Creating the skill with the associated category
        const newSkill = await Skills.create({
            title,
            description,
            price,
            skill_level,
            popularity_score,
            user_id: userId,
            category_id,
        });
        console.log(`NEW SKILL: ${newSkill}`);
        res.status(201).json(newSkill);
    } catch (error) {
        console.error('Error creating skill:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add a review to a skill (POST /api/skills/:id/review)
router.post('/skills/:id/review', authMiddleware, async (req, res) => {
    const skillId = req.params.id;
    const userId = req.user.id;
    const { rating, review_text } = req.body;
    console.log(`USER ID of review: ${userId}`);
    
    try {
      // Check if the skill exists
      const skill = await Skills.findByPk(skillId, {
        include: [
          {
            model: Review,
            as: 'reviews',
            include: [{ model: User, as: 'user', attributes: ['name'] }], // Include the name of the user who left the review
          },
        ],
      });
      if (!skill) {
        return res.status(404).json({ error: 'Skill not found' });
      }
      
      // Prevent buyer from purchasing their own skill
      if (userId === skill.user_id) {
        return res.status(400).json({ error: 'You cannot rate or review your own skill.' });
    }

      
      // Create the review
      const newReview = await Review.create({
        rating: req.body.rating,
        review_text: req.body.review_text,
        skill_id: skillId,
        user_id: userId,
      });

      // Call the updateRatingsAverage function

  
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

// Fetch all reviews for a specific skill (GET /api/skills/:id/reviews)
// Update a skill (PUT /api/skills/:id)
// Delete a skill (DELETE /api/skills/:id)

module.exports = router;
