const SubscriptionPlan = require('../models/subscriptionPlan');

const createPlan = async (req, res) => {
    try {
        const plan = new SubscriptionPlan(req.body);
        await plan.save();
        res.status(201).json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPlans = async (req, res) => {
    try {
        const plans = await SubscriptionPlan.find();
        res.status(200).json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPlan = async (req, res) => {
    try {
        const plan = await SubscriptionPlan.findById(req.params.id);
        if (!plan) return res.status(404).json({ message: "Not found" });
        res.json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePlan = async (req, res) => {
    try {
        const plan = await SubscriptionPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!plan) return res.status(400).json({ message: "Not found" });
        res.json(plan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePlan = async (req, res) => {
    try {
        const plan = await SubscriptionPlan.findByIdAndDelete(req.params.id);
        if (!plan) return res.status(404).json({ message: "Not found" });;
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPlan, getPlans, getPlan, updatePlan, deletePlan };

