const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {type: Number, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
});

module.exports = mongoose.model('user', userSchema);
