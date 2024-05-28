const express = require('express');
const router = new express.Router();
const User = require('../models/user');

// Create new user
router.post('/users', async (req, res) => {
    const { nameUser, ageUser, passwordUser, emailUser } = req.body;
    try {
        const user = new User({
            name: nameUser,
            age: ageUser,
            password: passwordUser,
            email: emailUser
        });
        console.log(req.body);
        await user.save();
        res.status(201).send(user);
        console.log("User saved successfully");
    } catch (error) {
        console.error("Error saving user:", error.message);
        res.status(400).send(error.message);
    }
});


// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get user by ID
router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update user by ID
router.patch('/users/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete user by ID
router.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).send('User not found');
        res.send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete all users
router.delete('/users', async (req, res) => {
    try {
        await User.deleteMany({});
        res.send('All users deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
