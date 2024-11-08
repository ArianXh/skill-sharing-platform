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
