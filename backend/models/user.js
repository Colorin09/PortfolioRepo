const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        trim: true,
        required: true,
        maxlength: 40
    },
    lastName:{
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 50
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength: 8,
        maxlength: 50
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;

/*Model for User -> Names, email, password, and active?*/



