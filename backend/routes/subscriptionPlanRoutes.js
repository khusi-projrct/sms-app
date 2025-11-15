const express = require('express');
const { createPlan, getPlans, getPlan, updatePlan, deletePlan } = require('../controllers/subscriptionPlanController');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/create', authMiddleware, createPlan);
router.get('/', authMiddleware, getPlans);
router.get('/:id', authMiddleware, getPlan);
router.put('/:id', authMiddleware, updatePlan);
router.delete('/:id', authMiddleware, deletePlan);

module.exports = router;