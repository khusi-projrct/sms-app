const express = require('express');
const { createSchool, getAllSchools, getSchool, updateSchool, deleteSchool } = require('../controllers/schoolController');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/create', authMiddleware, createSchool);
router.get('/', authMiddleware, getAllSchools);
router.get('/:schoolId', authMiddleware, getSchool);
router.put('/:schoolId', authMiddleware, updateSchool);
router.delete('/:schoolId', authMiddleware, deleteSchool)

module.exports = router;