const express = require('express');
const router = express.Router();
const adminAuth = require('../authMiddleware/adminAuth');
const User = require('..//models/User');
const Skills = require('..//models/Skills');
const Review = require('..//models/Review');
const Categories = require('..//models/Categories');
const Transactions = require('..//models/Transactions');
const Post = require('..//models/Post');
const Comment = require('..//models/Comment');
const Sequelize = require('sequelize');
const Availability = require('../models/Availability');


// 1. Get all users (View users in the admin dashboard)
router.get('/users', adminAuth, async (req, res) => {
    try {
        const users = await User.findAll(); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users.' });
    }
});

// 2. Get a Single User by ID (GET /users/:id)
router.get('/users/:id', async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'bio', 'profile_image_url', 'experience', 'ratings_average', 'credits'],
            include: [{
                model: Skills,
                as: 'skills',
                attributes: ['id', 'user_id', 'title', 'description', 'skill_level', 'popularity_score', 'hourly_rate'],
            }],
        });
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
            user.role = role || user.role;  
            user.status = status || user.status; 
            await user.save(); 
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


// 5. Analytics
router.get('/basic-analytics', adminAuth, async (req, res) => {
    try {
      const numberOfUsers = await User.count();
      const numberOfSkills = await Skills.count();
      const numberOfCategories = await Categories.count();
      const numberOfReviews = await Review.count();
      const numberOfPosts = await Post.count();
      const numberOfComments = await Comment.count();
      const numberOfTransactions = await Transactions.count();
      
      res.json({
        numberOfUsers,
        numberOfSkills,
        numberOfCategories,
        numberOfReviews,
        numberOfPosts,
        numberOfComments,
        numberOfTransactions
      });
    } catch (error) {
      console.error("Error in analytics route: ", error);
      res.status(500).json({ error: 'Failed to fetch analytics data.' });
    }
});

// 5.1 Get skills count by category
router.get('/analytics/skills-by-category', adminAuth, async (req, res) => {
  try {
      const skillsByCategory = await Skills.findAll({
          attributes: [
              'category_id',
              [Sequelize.fn('COUNT', Sequelize.col('Skills.id')), 'count'], 
          ],
          include: [
              {
                  model: Categories,
                  as: 'categories', 
                  attributes: ['id', 'name'], 
              },
          ],
          group: ['Skills.category_id', 'categories.id', 'categories.name'], 
      });

      res.json(skillsByCategory);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve skills by category.' });
  }
});


// 5.2 Get skills added per day
router.get('/analytics/skills-added-per-day', adminAuth, async (req, res) => {
  try {
    const skillsAddedPerDay = await Skills.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('created_at')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
      ],
      group: [Sequelize.fn('DATE', Sequelize.col('created_at'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('created_at')), 'DESC']],
    });

    res.json(skillsAddedPerDay);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve skills added per day.' });
  }
});


// 5.3 Get reviews added per day
router.get('/analytics/reviews-added-per-day', adminAuth, async (req, res) => {
  try {
    const reviewsAddedPerDay = await Review.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('created_at')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
      ],
      group: [Sequelize.fn('DATE', Sequelize.col('created_at'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('created_at')), 'DESC']],
    });

    res.json(reviewsAddedPerDay);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews added per day.' });
  }
});

// 5.4. Get transactions made per day
router.get('/analytics/transactions-made-per-day', adminAuth, async (req, res) => {
  try {
    const transactionsMadePerDay = await Transactions.findAll({
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('created_at')), 'date'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
      ],
      group: [Sequelize.fn('DATE', Sequelize.col('created_at'))],
      order: [[Sequelize.fn('DATE', Sequelize.col('created_at')), 'DESC']],
    });

    res.json(transactionsMadePerDay);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews added per day.' });
  }
});

// 9. Get Top Skill Categories
router.get('/analytics/top-skill-categories', adminAuth, async (req, res) => {
  try {
      const topSkillCategories = await Skills.findAll({
          attributes: [
              'category_id',
              [Sequelize.fn('COUNT', Sequelize.col('Skills.id')), 'skill_count']
          ],
          include: [
              { model: Categories, as: 'categories', attributes: ['id', 'name'] }
          ],
          group: ['Skills.category_id', 'categories.id', 'categories.name'],
          order: [[Sequelize.fn('COUNT', Sequelize.col('Skills.id')), 'DESC']],
      });
      res.json(topSkillCategories);
  } catch (error) {
      console.error('Error in /analytics/top-skill-categories:', error); 
      res.status(500).json({ error: 'Failed to retrieve top skill categories.', details: error.message });
  }
});


// 10. Get Skills Growth Over Time
router.get('/analytics/skills-growth', adminAuth, async (req, res) => {
  try {
      const skillsGrowth = await Skills.findAll({
          attributes: [
              [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('Skills.created_at')), 'month'],
              [Sequelize.fn('COUNT', Sequelize.col('Skills.id')), 'skill_count'],
          ],
          group: [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('Skills.created_at'))],
          order: [[Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('Skills.created_at')), 'ASC']],
          raw: true,
      });
      res.json(skillsGrowth);
  } catch (error) {
      console.error('Error in /analytics/skills-growth:', error); 
      res.status(500).json({ error: error.message || 'Failed to retrieve skills growth.' });
  }
});


// 11. Get Skill Pricing Trends
router.get('/analytics/skill-pricing-trends', adminAuth, async (req, res) => {
  try {
    const pricingTrends = await Skills.findAll({
      attributes: [
          'category_id',
          [Sequelize.fn('AVG', Sequelize.col('Skills.hourly_rate')), 'average_price']
      ],
      include: [
          { model: Categories, as: 'categories', attributes: ['id', 'name'] }
      ],
      group: ['Skills.category_id', 'categories.id', 'categories.name'], 
    });
      res.json(pricingTrends);
  } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve skill pricing trends.' });
  }
});


// 12. Get Skills with the Highest Demand
router.get('/analytics/top-demand-skills', adminAuth, async (req, res) => {
  try {
    const topDemandSkills = await Transactions.findAll({
      attributes: [
        'skill_id', 
        [Sequelize.fn('COUNT', Sequelize.col('Transactions.id')), 'skill_count'] 
      ],
      include: [
        {
          model: Skills,
          as: 'skill',
          attributes: ['id', 'title'] 
        }
      ],
      group: ['skill_id', 'skill.id', 'skill.title'], 
      order: [
        [Sequelize.col('skill.title'), 'DESC'], 
        [Sequelize.fn('COUNT', Sequelize.col('Transactions.id')), 'ASC'] 
      ],
      limit: 10 
    });

    res.json(topDemandSkills); 
  } catch (error) {
    console.error('Error fetching top-demand skills:', error);
    res.status(500).json({ error: 'Failed to retrieve top-demand skills.' });
  }
});



// 3. Get all TRANSACTIONS on the platform
router.get('/transactions', adminAuth, async (req, res) => {
  try {
    const transactions = await Transactions.findAll({
      include: [
          { model: User, as: 'buyer', attributes: ['id', 'name', 'email'] },
          { model: User, as: 'seller', attributes: ['id', 'name', 'email'] },
          { model: Skills, as: 'skill', attributes: ['id', 'title', 'hourly_rate'] },
      ],
      order: [['created_at', 'DESC']], // Sort by most recent transactions
  });
      res.status(200).json(transactions);
  } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;