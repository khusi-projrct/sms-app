const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");
const {
  createTeacher,
  getTeachers
} = require("../controllers/teacherController");

router.post(
  "/",
  authMiddleware,
  checkPermission("teacher", "create"),
  createTeacher
);

router.get(
  "/",
  authMiddleware,
  checkPermission("teacher", "read"),
  getTeachers
);

module.exports = router;