const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");
const {createStudent, getStudents} = require("../controllers/studentController");

router.post(
  "/",
  authMiddleware,
  checkPermission("student", "create"),
  createStudent
);

router.get(
  "/classId/:classId?",
  authMiddleware,
  checkPermission("student", "read"),
  getStudents
);

module.exports = router;