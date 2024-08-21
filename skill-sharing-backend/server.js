const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const User = require('.//../models/User');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Routes
app.use('/api/users', userRoutes);

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

// CRUD Operations for Users

// 1. Create User (POST /users)
app.post('/api/users/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
    }
});

// 2. Get All Users (GET /users)
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch {
        console.error(error);
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// 3. Get a Single User by ID (GET /users/:id)
app.get('/users/:id', async(req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user' });
    }
});

// 4. Update User by ID (PUT /users/:id)
app.put('/users/:id', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findByPk(req.params.id);
        if (user) {
            user.name = name || user.name;
            user.email = email || user.email;
            user.password = password || user.password;
            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating user' });
    }
});


// 5. Delete User by ID (DELETE /users/:id)
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(204).send(); // No Content response
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Error deleting user' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})