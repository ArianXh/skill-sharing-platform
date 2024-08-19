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
}, {
  tableName: 'users',  // Match the table name in your schema
  timestamps: false,    // Disable automatic timestamp fields (createdAt, updatedAt)
});

module.exports = User;
