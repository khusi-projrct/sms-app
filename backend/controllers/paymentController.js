const Payment = require('../models/payment');
const Subscription = require('../models/subscription');

const createPayment = async (req, res) => {
    try {
        const { subscription, amount, paymentDate } = req.body;

        const subscriptionExists = await Subscription.findById(subscription);
        if (!subscriptionExists) return res.status(404).json({ message: "Subscription not found" });

        const newPayment = new Payment({
            subscription,
            amount,
            paymentDate
        });
        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate('subscription');
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findById(id).populate('subscription');
        if (!payment) return res.status(404).json({ message: "Payment not found" });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const paymentData = req.body;

        const payment = await Payment.findByIdAndUpdate(id, paymentData, { new: true });
        if (!payment) return res.status(404).json({ message: "Payment not found" });
        res.json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByIdAndDelete(id);
        if (!payment) return res.status(404).json({ message: "Payment not found" });
        res.json({ message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPayment, getAllPayments, getPayment, updatePayment, deletePayment };