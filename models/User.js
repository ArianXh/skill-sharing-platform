const { DataTypes } = require('sequelize');
const sequelize = require('../skill-sharing-backend/config/database');

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
}, {
  tableName: 'users',  // Match the table name in your schema
  modelName: 'User',
  timestamps: false,    // Disable automatic timestamp fields (createdAt, updatedAt)
});


// Defining the relationship with Skill
User.hasMany(require('./Skills'), { foreignKey: 'user_id', as: 'skills' });

module.exports = User;
