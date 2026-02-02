const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");
const { createSchool, getSchools } = require("../controllers/schoolController");

router.post(
  "/",
  authMiddleware,
  checkPermission("school", "create"),
  createSchool
);

router.get(
  "/",
  authMiddleware,
  checkPermission("school", "read"),
  getSchools
);

module.exports = router;
