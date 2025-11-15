const express = require('express');
const { createClass, getClasses, getClass, updateClass, deleteClass } = require('../controllers/classController');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/', authMiddleware, createClass);
router.get('/', authMiddleware, getClasses);
router.get('/:id', authMiddleware, getClass);
router.put('/:id', authMiddleware, updateClass);
router.delete('/:id', authMiddleware, deleteClass);

module.exports = router;