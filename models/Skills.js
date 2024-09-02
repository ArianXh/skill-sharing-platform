const { DataTypes } = require('sequelize');
const sequelize = require('../skill-sharing-backend/config/database');
const User = require('./User');

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
        model: User,
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
}, {
  tableName: 'skills',  // Match the table name in your schema
  modelName: 'Skills',
  timestamps: false,    // Disable automatic timestamp fields (createdAt, updatedAt)
});

module.exports = Skills;
