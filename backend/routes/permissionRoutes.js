const express = require("express");
const router = express.Router();
const {createPermission, getPermissions} = require("../controllers/permissionController");
const authMiddleware = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");

// CREATE permission → ONLY ADMIN
router.post(
  "/create",
  authMiddleware,
  checkPermission("permission", "create"),
  createPermission
);



// READ permissions → ADMIN only (or later manager)
router.get(
  "/",
  authMiddleware,
  checkPermission("permission", "read"),
  getPermissions
);

module.exports = router;
