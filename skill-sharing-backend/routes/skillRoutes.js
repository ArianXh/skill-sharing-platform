const express = require('express');
const authMiddleware = require('../authMiddleware/authMiddleware');
const Skills = require('..//models/Skills');
const User = require('..//models/User');
const Review = require('..//models/Review');
const Categories = require('..//models/Categories');
const Availability = require('..//models/Availability');
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
            attributes: ['id', 'user_id', 'title', 'description', 'created_at', 'updated_at', 'category_id', 'skill_level', 'popularity_score', 'ratings_average', 'hourly_rate'],
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
            attributes: ['id', 'user_id', 'title', 'description', 'created_at', 'updated_at', 'category_id', 'skill_level', 'popularity_score', 'ratings_average', 'hourly_rate'],
            include: [
                {
                    model: User,
                    as: 'user', 
                    attributes: ['id', 'name', 'email']
                },
                {
                    model: Review,
                    as: 'reviews', 
                    include: [{ model: User, as: 'user', attributes: ['name'] }],
                },
                {
                  model: Availability,
                  as: 'availabilities', 
                  attributes: ['skill_id', 'day_of_week', 'start_time', 'end_time']
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


// Create a new skill (POST /api/skills)
router.post('/create', authMiddleware, async (req, res) => {
    const userId = req.user.id; // Using this to add a skill to THIS user (the one logged in)
    const { title, description, skill_level, popularity_score, category_id, hourly_rate } = req.body;
    try {

        // Ensure category_id exists
        const category = await Categories.findByPk(category_id, {});
        if (!category){
            return res.status(400).json({ error: 'Invalid category' });
        }

        // Creating the skill with the associated category
        const newSkill = await Skills.create({
            title,
            description,
            skill_level,
            popularity_score,
            user_id: userId,
            category_id,
            hourly_rate,
        });
        res.status(201).json(newSkill);
    } catch (error) {
        console.error('Error creating skill:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update a skill (PUT /api/skills/:id)
router.put('/skills/:id', authMiddleware, async (req, res) => {
  const skillId = req.params.id;
  const { title, description, price, category_id, skill_level } = req.body;

  try {
      const skill = await Skills.findByPk(skillId);

      if (!skill) return res.status(404).json({ error: 'Skill not found' });

      await skill.update({ title, description, price, category_id, skill_level });

      res.status(200).json({ message: 'Skill updated successfully', skill });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the skill.' });
  }
});

// Delete a skill (DELETE /api/skills/:id)
router.delete('/skills/:id', authMiddleware, async (req, res) => {
  const skillId = req.params.id;

  try {
      const skill = await Skills.findByPk(skillId);

      if (!skill) return res.status(404).json({ error: 'Skill not found' });

      await skill.destroy();

      res.status(200).json({ message: 'Skill deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the skill.' });
  }
});



// GET /api/skills/:id/availability
router.get('/skills/:id/availability', async (req, res) => {
  const { id } = req.params;

  try {
      const availability = await Availability.findAll({
          where: { skill_id: id },
          attributes: ['day_of_week', 'start_time', 'end_time'],
      });

      if (!availability || availability.length === 0) {
          return res.status(404).json({ message: 'No availability found for the specified skill.' });
      }

      res.status(200).json(availability);
  } catch (error) {
      console.error('Error fetching availability:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// GET All availabilities
router.get('/skills/availability', async (req, res) => {
  try {
      // Fetch availability for the given skill ID
      const availability = await Availability.findAll({
        attributes: ['skill_id','day_of_week', 'start_time', 'end_time'],
      });

      // Return availability
      res.status(200).json(availability);
  } catch (error) {
      console.error('Error fetching availability:', error);
      res.status(500).json({ message: 'Internal server error' });
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
      
      // Prevent owner of the skill reviewing or rating their own skill
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
  
      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error adding review:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

// Fetch all reviews for a specific skill (GET /api/skills/:id/reviews)

module.exports = router;
