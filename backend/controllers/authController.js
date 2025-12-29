const rolePermission = require("../models/rolePermission");
const User = require("../models/userModel");
const UserRole = require("../models/userRole");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");


// Register User
const registerUser = async (req, res) => {
    try {
        const { username, contactNumber, email, password } = req.body;

        //Basic validation
        if (!username || !contactNumber || !email || !password) {
            return res.status(400).json({ message: "All feilds are required" });
        }

        //contact number format validation
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(contactNumber)) {
            return res.status(400).json({ message: "Invalid contact number format" });
        }

        // email format validation 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // password length validation
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create New User
        user = new User({ username, contactNumber, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        //get user roles 
        const userRoleData = await UserRole.findOne({ userId: user._id }).populate("roleIds");
        const roleNames = userRoleData ? userRoleData.roleIds.map(role => role.name) : [];

        //Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email, roles: roleNames }, process.env.JWT_SECRET, { expiresIn: "7d" });


        res.json({
            message: "Login successful", token, user: {
                id: user._id,
                username: user.username,
                contactNumber: user.contactNumber,
                email: user.email,
                roles: roleNames
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        // console.log("User ID from token:", userId);

        const user = await User.findById(userId, "-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        //get user roles
        const userRole = await UserRole.findOne({ userId }).populate("roleIds");
        const roles = userRole ? userRole.roleIds.map(role => role.name) : [];

        //get user permissions
        const roleIds = userRole ? userRole.roleIds.map(role => role._id) : [];
        const rolePermissions = await rolePermission.find({ roleId: { $in: roleIds } }).populate("permissionIds");
        const permissions = rolePermissions.flatMap(rp => rp.permissionIds.map(p => `${p.tag}/${p.actions}`));

        res.json({
            message: "Profile data", user: {
                id: user._id,
                username: user.username,
                contactNumber: user.contactNumber,
                email: user.email,
                avatarUrl: user.avatarUrl,
                roles,
                permissions
            }
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, "-password"); //exclude password
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// forgot password

const forgotPassword = async (req, res) => {
    const { email } = req.body;

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    //create random token and expiry time
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; //1 hour
    await user.save();

    //create reset link 
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    //send email
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false  // 👈 allow self-signed certs
  }
});

    const mailOptions = {
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: "Password Reset Request",
        html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset email sent" });
};

//reset password
const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password has been reset successfully" });
};
// image upload 
const uploadAvatar = async (req, res) => {
    try{
        if(!req.file) {
            return res.status(400).json({message: "No file uploaded"});
        }
        const userId = req.user.id;
        const avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        await User.findByIdAndUpdate(userId, {avatarUrl}, { new: true });
        res.json({message: "Avatar uploaded successfully", avatarUrl});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const { username, contactNumber, email, avatarUrl } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                username,
                contactNumber,
                email,
                ...(avatarUrl && { avatarUrl })
            },
            { new: true }
        ).select("-password");

        res.json({
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, getProfile, getAllUsers, forgotPassword, resetPassword, uploadAvatar, updateProfile };