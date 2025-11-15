const express = require("express");
const router = express.Router();
const { createRole, getRoles } = require("../controllers/roleController");
// const { assignPermissionToRole } = require("../controllers/roleController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createRole);
router.get("/", authMiddleware, getRoles);

// router.post("/assign-permissions", assignPermissionToRole);
module.exports = router;
