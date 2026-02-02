const Teacher = require("../models/teacher");
const UserRole = require("../models/userRole");
const Role = require("../models/role");

// CREATE TEACHER
exports.createTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);

    // Assign Teacher role
    const teacherRole = await Role.findOne({ name: "teacher" });

    await UserRole.findOneAndUpdate(
      { userId: req.body.userId },
      { $addToSet: { roleIds: teacherRole._id } },
      { upsert: true }
    );

    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET TEACHERS
exports.getTeachers = async (req, res) => {
  const teachers = await Teacher.find()
    .populate("userId", "username email")
    .populate("schoolId", "name")
    .populate("assignedClasses", "name section")
    .populate("assignedSubjects", "name");

  res.json(teachers);
};