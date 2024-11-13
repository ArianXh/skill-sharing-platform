const { DataTypes } = require('sequelize');
const sequelize = require('../skill-sharing-backend/config/database');
const User = require('./User');
const Review = require('./Review');

const Skills = sequelize.define('Skills', {
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  skill_level: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
        isIn: [['Beginner', 'Intermediate', 'Advanced']], // Example values
    },
  },
  popularity_score: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  ratings_average: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
}, {
  sequelize,
  tableName: 'skills',  // Match the table name in your schema
  modelName: 'Skills',
  timestamps: false,    // Disable automatic timestamp fields (createdAt, updatedAt)
});



module.exports = Skills;
