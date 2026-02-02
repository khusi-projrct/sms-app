const express = require("express");
const { assignPermissionToRole, getPermissionsByRole } = require("../controllers/rolePermissionController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, assignPermissionToRole);
router.get("/:roleId", authMiddleware, getPermissionsByRole);

module.exports = router;