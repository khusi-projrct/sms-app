const express = require('express');
const { registerUser, loginUser, getProfile, getAllUsers, forgotPassword, resetPassword } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

//only logged-in users can access this
router.get("/profile", authMiddleware, getProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/", authMiddleware, checkPermission("view"), getAllUsers);

module.exports = router;