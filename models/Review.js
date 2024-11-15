const { DataTypes } = require('sequelize');
const sequelize = require('../skill-sharing-backend/config/database');
const User = require('./User');
const Skills = require('./Skills');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: { // Foreign key referencing 'users' table
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'users', // Referencing 'users' table by its name, Sequelize will handle this
        key: 'id'
    },
    onDelete: 'CASCADE',
  },
  skill_id: { // Foreign key referencing 'skills' table
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'skills', // Referencing 'skill' table by its name, Sequelize will handle this
        key: 'id'
    },
    onDelete: 'CASCADE',
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  review_text: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'reviews',  // Match the table name in your schema
  modelName: 'Review',
  timestamps: true,  // Automatically add createdAt and updatedAt
});



module.exports = Review;
