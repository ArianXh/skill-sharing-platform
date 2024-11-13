const { DataTypes } = require('sequelize');
const sequelize = require('../skill-sharing-backend/config/database');
const Skills = require('./Skills'); // Ensure Skills is imported here
const Review = require('./Review');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bio: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  profile_image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  experience: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  ratings_average: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  credits: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'users',  // Match the table name in your schema
  modelName: 'User',
  timestamps: false,    // Disable automatic timestamp fields (createdAt, updatedAt)
});




module.exports = User;
