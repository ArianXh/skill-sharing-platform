const express = require('express');
const router = express.Router();
const adminAuth = require('../authMiddleware/adminAuth');
const User = require('../../models/User');
const Skills = require('../../models/Skills');
const Review = require('../../models/Review');
const Sequelize = require('sequelize');
const Categories = require('../../models/Categories');

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
        const userId = req.params.id;
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'bio', 'profile_image_url', 'experience', 'ratings_average', 'credits'],
            include: [{
                model: Skills,
                as: 'skills',
                attributes: ['id', 'user_id', 'title', 'description', 'price', 'skill_level', 'popularity_score'],
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


// 5. Analytics
router.get('/analytics', adminAuth, async (req, res) => {
    try {
      const numberOfUsers = await User.count();
      console.log(`Number of users: ${numberOfUsers}`);
      const numberOfSkills = await Skills.count();
      console.log(`Number of skills: ${numberOfSkills}`);
      /*const transactionsPerDay = await Transaction.count({
        where: {
          createdAt: {
            [Op.gte]: new Date().setHours(0, 0, 0, 0), // Today's transactions
          },
        },
      });
      const reviewsPerDay = await Review.count({
        where: {
          created_at: {
            //[Sequelize.Op.gte]: new Date().setHours(0, 0, 0, 0), // Today's reviews
          },
        },
      });
      const skillsAddedPerDay = await Skills.count({
        where: {
          created_at: {
            //[Sequelize.Op.gte]: new Date().setHours(0, 0, 0, 0), // Today's skills
          },
        },
      });
        */
      res.json({
        numberOfUsers,
        numberOfSkills,
        //transactionsPerDay,
        //reviewsPerDay,
        //skillsAddedPerDay,
      });
    } catch (error) {
      console.error("Error in analytics route: ", error);
      res.status(500).json({ error: 'Failed to fetch analytics data.' });
    }
});

// 6. Get skills count by category
router.get('/analytics/skills-by-category', adminAuth, async (req, res) => {
  try {
      const skillsByCategory = await Skills.findAll({
          attributes: [
              'category_id',
              [Sequelize.fn('COUNT', Sequelize.col('Skills.id')), 'count'], // Count the number of skills
          ],
          include: [
              {
                  model: Categories,
                  as: 'categories', // Alias matches association
                  attributes: ['id', 'name'], // Fetch category id & name
              },
          ],
          group: ['Skills.category_id', 'categories.id', 'categories.name'], // Group by category_id and category name
      });

      res.json(skillsByCategory);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve skills by category.' });
  }
});



module.exports = router;