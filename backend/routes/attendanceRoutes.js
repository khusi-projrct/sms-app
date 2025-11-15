const express = require("express");
const { createAttendance, getAllAttendance, getAttendanceById, updateAttendance, deleteAttendance } = require("../controllers/attendanceController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createAttendance);
router.get("/", authMiddleware, getAllAttendance);
router.get("/class/:classId", authMiddleware, getAttendanceById);
router.put("/:attendanceId", authMiddleware, updateAttendance);
router.delete("/:attendanceId", authMiddleware, deleteAttendance);
module.exports = router;