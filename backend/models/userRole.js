const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    roleIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    }]
}, { timestamps: true
});

module.exports = mongoose.model("UserRole", userRoleSchema);