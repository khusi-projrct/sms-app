const express = require("express");
const { assignRoleToUser, getRoleByUser } = require("../controllers/userRoleController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, assignRoleToUser);
router.get("/:userId", authMiddleware, getRoleByUser);

module.exports = router;