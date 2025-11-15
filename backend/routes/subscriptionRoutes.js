const express = require('express');
const { createSubscription, getAllSubscriptions, getSubscription, updateSubscription, deleteSubscription } = require('../controllers/subscriptionController');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/', authMiddleware, createSubscription);
router.get('/', authMiddleware, getAllSubscriptions);
router.get('/:id', authMiddleware, getSubscription);
router.put('/:id', authMiddleware, updateSubscription);
router.delete('/:id', authMiddleware, deleteSubscription);

module.exports = router;