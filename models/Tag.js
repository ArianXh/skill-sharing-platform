const { DataTypes } = require('sequelize');
const sequelize = require('../skill-sharing-backend/config/database');

const Tag = sequelize.define('Tag', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
}, {
    tableName: 'tags',
    timestamps: false,
});

module.exports = Tag;
