const mongoose = require('mongoose');
const { create } = require('./rolePermission');

const subscriptionPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    durationInMonths: {
        type: Number,
        required: true
    },
    features: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

subscriptionPlanSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);