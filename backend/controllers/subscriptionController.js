const Subscription = require("../models/subscription");
const School = require("../models/school");
const SubscriptionPlan = require("../models/subscriptionPlan");

const createSubscription = async (req, res) => {
    try {
        const { school_id, subscriptionPlan_id, startDate, endDate } = req.body;

        const schoolExists = await School.findById(school_id);
        if (!schoolExists) return res.status(404).json({ message: "School not found" });

        const planExists = await SubscriptionPlan.findById(subscriptionPlan_id);
        if (!planExists) return res.status(404).json({ message: "Subscription plan not found" });

        const newSubscription = new Subscription({
            school_id,
            subscriptionPlan_id,
            startDate,
            endDate
        });

        await newSubscription.save();
        res.status(201).json(newSubscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find().populate('school_id').populate('subscriptionPlan_id');
        res.json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const subscription = await Subscription.findById(id).populate('school').populate('plan');
        if (!subscription) return res.status(404).json({ message: "Subscription not found" });
        res.json(subscription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Subscription.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Subscription not found" });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Subscription.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Subscription not found" });
        res.json({ message: "Subscription deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createSubscription, getAllSubscriptions, getSubscription, updateSubscription, deleteSubscription };