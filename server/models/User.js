const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    userPw: {type: String, required: true}, //(+)사용자 Password 입력
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

