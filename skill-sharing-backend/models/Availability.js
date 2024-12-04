const { DataTypes } = require('sequelize');
const sequelize = require('..//config/database');
const User = require('./User'); 
const Skills = require('./Skills'); 

const Availability = sequelize.define('Availability', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  skill_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Skills,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  day_of_week: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  tableName: 'availability',
  timestamps: false, // Enables created_at and updated_at
});

module.exports = Availability;
