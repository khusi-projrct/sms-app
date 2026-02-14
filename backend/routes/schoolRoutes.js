const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");
const { createSchool, getSchools, updateSchool, deleteSchool } = require("../controllers/schoolController");

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

router.put(
  "/:id",
  authMiddleware,
  checkPermission("school", "update"),
  updateSchool
)

router.delete(
  "/:id",
  authMiddleware,
  checkPermission("school", "delete"),
  deleteSchool
)

module.exports = router;
