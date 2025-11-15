const express = require("express");
const router = express.Router();
const { createPermission, getPermissions } = require("../controllers/permissionController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createPermission);
router.get("/", authMiddleware, getPermissions);

module.exports = router;