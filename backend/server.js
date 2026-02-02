// configure main server
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
connectDB();     //Connect to MongoDB

const app = express();
app.use(express.json());  //Enable JSON body parsing
app.use(cors());  //Allow frontend requsts

const authRoutes = require("./routes/authRoutes"); //import routes (user)
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); //serve uploaded files

const roleRoutes = require("./routes/roleRoutes"); //import roleRoutes
app.use("/api/roles", roleRoutes);

const permissionRoutes = require("./routes/permissionRoutes"); //import permissionRoutes
app.use("/api/permissions", permissionRoutes);

const rolePermissionRoutes = require("./routes/rolePermissionRoutes"); //import rolePermissionRoutes
app.use("/api/role-permissions", rolePermissionRoutes);

const userRoleRoutes = require("./routes/userRoleRoutes"); //import userRoleRoutes
app.use("/api/user-roles", userRoleRoutes);

const schoolRoutes = require("./routes/schoolRoutes"); //import schoolRoutes
app.use("/api/schools", schoolRoutes);

const classRoutes = require("./routes/classRoutes"); //import classRoutes
app.use("/api/classes", classRoutes);

const subjectRoutes = require("./routes/subjectRoutes"); //import subjectRoutes
app.use("/api/subjects", subjectRoutes);

const teacherRoutes = require("./routes/teacherRoutes"); //import teacherRoutes
app.use("/api/teachers", teacherRoutes);

const studentRoutes = require("./routes/studentRoutes"); //import studentRoutes
app.use("/api/students", studentRoutes);

const attendanceRoutes = require("./routes/attendanceRoutes"); //import attendanceRoutes
app.use("/api/attendance", attendanceRoutes);

const subscriptionPlanRoutes = require("./routes/subscriptionPlanRoutes"); //import subscriptionPlanRoutes
app.use("/api/subscription-plans", subscriptionPlanRoutes);

const subscriptionRoutes = require("./routes/subscriptionRoutes"); //import subscriptionRoutes
app.use("/api/subscriptions", subscriptionRoutes);

const paymentRoutes = require("./routes/paymentRoutes"); //import paymentRoutes
app.use("/api/payments", paymentRoutes);

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);

//Default Routes
app.get("/", (req, res) => {
    res.send("School Management System API is runnig...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`));