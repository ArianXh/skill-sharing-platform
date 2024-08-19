const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('.//../models/User');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Skill-Sharing Backend API');
});


// Sync Sequelize with the database
sequelize.sync()
.then(() => {
  console.log('PostgreSQL connected and synced');
})
.catch(err => {
  console.error('PostgreSQL connection error:', err);
});


// Route to create a new user (for verification)
app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})