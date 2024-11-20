const { DataTypes } = require('sequelize');
const sequelize = require('../skill-sharing-backend/config/database');

const Categories = sequelize.define('Categories', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'categories',  // Match the table name in your schema
  modelName: 'Categories',
  timestamps: false,  // Automatically add createdAt and updatedAt
});

module.exports = Categories;
