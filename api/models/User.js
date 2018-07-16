const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: Number,
    username: String,
    password: String
});

module.exports = mongoose.model('user', userSchema);
