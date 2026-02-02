const Student = require("../models/student");
const Role = require("../models/role");
const UserRole = require("../models/userRole");

// CREATE STUDENT
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    // Assign Student role
    const studentRole = await Role.findOne({ name: "student" });

    await UserRole.findOneAndUpdate(
      { userId: req.body.userId },
      { $addToSet: { roleIds: studentRole._id } },
      { upsert: true }
    );

    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET STUDENTS
exports.getStudents = async (req, res) => {
  const filter = {};
  if (req.query.classId) filter.classId = req.query.classId;

  const students = await Student.find(filter)
    .populate("userId", "username email")
    .populate("schoolId", "name")
    .populate("classId", "name section");

  res.json(students);
};