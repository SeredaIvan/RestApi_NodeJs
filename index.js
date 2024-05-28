require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./src/models/user');
const Task = require('./src/models/task');
const userRouter = require('./src/routers/userRouter');
const taskRouter = require('./src/routers/taskRouter');

const app = express();
const port = process.env.PORT
const url = process.env.MONGODB_URI ;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'src', 'client')));
app.use(userRouter);
app.use(taskRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'client', 'html','index.html'));
});

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
