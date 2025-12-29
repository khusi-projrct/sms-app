const express = require('express');
const { registerUser, loginUser, getProfile, getAllUsers, forgotPassword, resetPassword, uploadAvatar, updateProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");
const upload = require("../middleware/uploads");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

//only logged-in users can access this
router.get("/profile", authMiddleware, getProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/", authMiddleware, checkPermission("view"), getAllUsers);
router.post("/upload-avatar", authMiddleware, upload.single('avatar'), uploadAvatar);
router.put("/update-profile", authMiddleware, updateProfile);

module.exports = router;