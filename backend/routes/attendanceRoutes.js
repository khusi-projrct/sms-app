const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");
const {
  markAttendance,
  getAttendance
} = require("../controllers/attendanceController");

router.post(
  "/",
  authMiddleware,
  checkPermission("attendance", "create"),
  markAttendance
);

router.get(
  "/:classId?",
  authMiddleware,
  checkPermission("attendance", "read"),
  getAttendance
);

module.exports = router;
