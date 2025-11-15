const express = require("express");
const Subject = require("../models/subject");
const { createSubject, getSubjects, getSubjectById, updateSubject, deleteSubject } = require("../controllers/subjectController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, createSubject);
router.get("/", authMiddleware, getSubjects);
router.get("/:id", authMiddleware, getSubjectById);
router.put("/:id", authMiddleware, updateSubject);
router.delete("/:id", authMiddleware, deleteSubject);

module.exports = router;