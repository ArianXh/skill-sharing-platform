const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_name, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
        max: 30,
        min: 0,
    },
    logging: false, // Disable logging SQL queries in the console
});

module.exports = sequelize;