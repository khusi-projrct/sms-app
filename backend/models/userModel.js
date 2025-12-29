const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    contactNumber: { type: String, required: true }, // updated
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    avatarUrl: { type: String }
});

module.exports = mongoose.model("user", userSchema);
