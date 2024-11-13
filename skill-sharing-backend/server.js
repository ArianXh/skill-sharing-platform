const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const { User, Skills, Review } = require('..//models/associations'); // Assuming the path is correct
const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');
const adminRoutes = require('./routes/adminRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware
app.use(express.json());

// Mount User Routes
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/admin', adminRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Skill-Sharing Backend API');
});

// Sync Sequelize with the database
sequelize.sync()
    .then(() => {
        console.log('PostgreSQL connected and synced');
        console.log('Database and tables created');
    })
    .catch(err => {
        console.error('PostgreSQL connection error:', err);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
