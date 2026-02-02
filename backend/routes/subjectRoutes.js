const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");
const {
  createSubject,
  getSubjects
} = require("../controllers/subjectController");

router.post(
  "/",
  authMiddleware,
  checkPermission("subject", "create"),
  createSubject
);

router.get(
  "/classId/:classId",
  authMiddleware,
  checkPermission("subject", "read"),
  getSubjects
);

module.exports = router;