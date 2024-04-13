const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Schema for both registration and login
const userSchema = new mongoose.Schema({
    UserName: String,
    email: String,
    password: String,
}, { timestamps: true });


// Model for both registration and login
const UserModel = mongoose.model("Dukaniuser", userSchema);

module.exports = UserModel;