const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long'],
        maxlength: [20, 'Name must be at most 20 characters long'],
        match: [/^[a-zA-Z\s]*$/, 'Name must contain only letters'],
        unique: true // Забезпечує унікальність значень у полі name
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [13, 'Age must be at least 13 years old'],
        max: [90, 'Age must be at most 90 years old']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function(v) {
                return !/password/i.test(v);
            },
            message: 'Password cannot contain the word "password".'
        }
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/\S+@\S+\.\S+/, 'Email is not valid'],
        unique: true
    }
});


userSchema.index({ name: 1, email: 1 }, { unique: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
