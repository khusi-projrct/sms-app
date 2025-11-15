const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    school_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});


schoolSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const School = mongoose.model("School", schoolSchema);

module.exports = School;