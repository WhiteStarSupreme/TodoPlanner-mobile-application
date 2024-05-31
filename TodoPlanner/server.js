const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Task = require('./models/Task');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
const SECRET_KEY = 'your_secret_key';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todoapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Token is required');

    jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
        if (err) return res.status(500).send('Failed to authenticate token');
        req.userId = decoded.id;
        next();
    });
};

// Register user
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        const user = new User({ username, password: hashedPassword });
        await user.save();
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '24h' });
        res.status(200).send({ token });
    } catch (err) {
        res.status(500).send('There was a problem registering the user');
    }
});

// Login user
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).send('No user found');

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).send('Invalid password');

        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '24h' });
        res.status(200).send({ token });
    } catch (err) {
        res.status(500).send('There was a problem logging in the user');
    }
});

// Get tasks for user
app.get('/api/tasks', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.userId });
        res.status(200).send(tasks);
    } catch (err) {
        res.status(500).send('There was a problem finding the tasks');
    }
});

// Add task for user
app.post('/api/tasks', verifyToken, async (req, res) => {
    const { name, date, hour, minute, priority, done } = req.body;

    try {
        const task = new Task({ userId: req.userId, name, date, hour, minute, priority, done });
        await task.save();
        res.status(200).send(task);
    } catch (err) {
        res.status(500).send('There was a problem adding the task');
    }
});

// Update task for user
app.put('/api/tasks/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
        if (!task) return res.status(404).send('Task not found');
        res.status(200).send(task);
    } catch (err) {
        res.status(500).send('There was a problem updating the task');
    }
});

// Delete task for user
app.delete('/api/tasks/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!task) return res.status(404).send('Task not found');
        res.status(200).send('Task deleted');
    } catch (err) {
        res.status(500).send('There was a problem deleting the task');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
