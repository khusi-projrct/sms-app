const express = require('express');
const { createPayment, getAllPayments, getPayment, updatePayment, deletePayment } = require('../controllers/paymentController');
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post('/', authMiddleware, createPayment);
router.get('/', authMiddleware, getAllPayments);
router.get('/:id', authMiddleware, getPayment);
router.put('/:id', authMiddleware, updatePayment);
router.delete('/:id', authMiddleware, deletePayment);

module.exports = router;