require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/node_db';
console.log(process.env.MONGODB_URI);
console.log(url)
mongoose.connect(url)
    .then(() => {
        console.log('Connected to MongoDB');

        const user = new User({
            name: 'Alex',
            age: 34,
            email: 'alex@example.com',
            password: 'securePass123'
        });

        user.save()
            .then(() => {
                console.log('User saved:', user);
            })
            .catch((error) => {
                console.error('Error saving user:', error);
            });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
