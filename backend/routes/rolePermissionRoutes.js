const express = require("express");
const { assignPermissionsToRole, getPermissionByRole } = require("../controllers/rolePermissionController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, assignPermissionsToRole);
router.get("/:roleId", authMiddleware, getPermissionByRole);

module.exports = router;