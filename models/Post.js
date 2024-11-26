const { DataTypes } = require('sequelize');
const sequelize = require('../skill-sharing-backend/config/database'); 

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Referencing 'users' table by its name, Sequelize will handle this
            key: 'id'
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
    },
}, {
    tableName: 'posts',
    timestamps: true,
    createdAt: 'created_at', // Map createdAt to created_at
    updatedAt: 'updated_at', // Map updatedAt to updated_at
});

module.exports = Post;
