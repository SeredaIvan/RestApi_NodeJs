const express = require('express');
const router = new express.Router();
const Task = require('../models/task');

// Create new task
router.post('/tasks', async (req, res) => {
    const { title, description ,completed } = req.body;
    try {
        const task = new Task({
            title: title,
            description: description,
            completed:completed
        });
        console.log(req.body);
        await task.save();
        res.status(201).send(task);
        console.log("Task saved successfully");
    } catch (error) {
        console.error("Error saving user:", error.message);
        res.status(400).send(error.message);
    }
});


// Get all task
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get task by ID
router.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).send('Task not found');
        res.send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update task by ID
router.patch('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!task) return res.status(404).send('Task not found');
        res.send(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete task by ID
router.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) return res.status(404).send('Task not found');
        res.send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete all task
router.delete('/tasks', async (req, res) => {
    try {
        await Task.deleteMany({});
        res.send('All task deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
