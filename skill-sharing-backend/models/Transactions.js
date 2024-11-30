const { DataTypes } = require('sequelize');
const sequelize = require('..//config/database');

const Transactions = sequelize.define('Transactions', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  buyer_id: { // Foreign key referencing 'users' table
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'users', // Referencing 'users' table by its name, Sequelize will handle this
        key: 'id'
    },
    onDelete: 'CASCADE',
  },
  seller_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'users', // Referencing 'users' table by its name, Sequelize will handle this
        key: 'id'
  }},
  skill_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
        model: 'skills', // Referencing 'skills' table by its name, Sequelize will handle this
        key: 'id'
  }},
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
}, {
  sequelize,
  tableName: 'transactions',  // Match the table name in your schema
  modelName: 'Transactions',
  timestamps: true,    // Disable automatic timestamp fields (createdAt, updatedAt)
  createdAt: 'created_at', // Map createdAt to created_at
  updatedAt: 'updated_at', // Map updatedAt to updated_at
});



module.exports = Transactions;
