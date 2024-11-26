const { DataTypes } = require('sequelize');
const sequelize = require('../skill-sharing-backend/config/database');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'posts', // Referencing 'users' table by its name, Sequelize will handle this
            key: 'id'
        },
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Referencing 'users' table by its name, Sequelize will handle this
            key: 'id'
        },
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    
}, {
    tableName: 'comments',
    timestamps: true,
    createdAt: 'created_at', // Map createdAt to created_at
    updatedAt: 'updated_at', // Map updatedAt to updated_at
});

module.exports = Comment;
