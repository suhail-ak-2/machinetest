const Joi = require('joi');

const mongoose = require('mongoose');
 
const User = mongoose.model('User', new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    phone:{
        type: Number,
        required: true,
        minlength:10
    }
    
}));
 
function validateUser(user) {
    const schema = {
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        phone: Joi.number().min(10).required()
    };
    return Joi.validate(user, schema);
}
 
exports.User = User;
exports.validate2 = validateUser;
