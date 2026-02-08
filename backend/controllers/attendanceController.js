const Attendance = require("../models/attendance");
const Teacher = require("../models/teacher");
const Student = require("../models/student");
const getUserRole = require("../utils/getUserRole");

exports.markAttendance = async (req, res) => {
  try {
    const { schoolId, classId, subjectId, date, records } = req.body;

    // check duplicate
    const existingAttendance = await Attendance.findOne({
      classId,
      subjectId,
      date: new Date(date)
    });

    if (existingAttendance) {
      return res.status(400).json({
        message: "Attendance already marked for this class & subject on this date"
      });
    }

    // map teacher correctly
    const teacher = await Teacher.findOne({ userId: req.user.id });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher profile not found" });
    }

    const attendance = await Attendance.create({
      schoolId,
      classId,
      subjectId,
      date,
      teacherId: teacher._id,
      records
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const role = await getUserRole(req.user.id);
    let filter = {};
    let student = null;

    // Teacher restriction
    if (role === "teacher") {
      const teacher = await Teacher.findOne({ userId: req.user.id });

      filter.classId = { $in: teacher.assignedClasses };
      filter.subjectId = { $in: teacher.assignedSubjects };
    }

    // Student restriction
    if (role === "student") {
      student = await Student.findOne({ userId: req.user.id });

      if (!student) {
        return res.status(404).json({ message: "Student profile not found" });
      }

      filter["records.studentId"] = student._id;
    }

    // optional query filters
    if (req.query.classId) filter.classId = req.query.classId;
    if (req.query.subjectId) filter.subjectId = req.query.subjectId;
    if (req.query.date) filter.date = new Date(req.query.date);

    const attendance = await Attendance.find(filter)
      .populate("classId", "name section")
      .populate("subjectId", "name")
      .populate("records.studentId", "rollNumber");

    // student sees only their record
    if (role === "student") {
      attendance.forEach(a => {
        a.records = a.records.filter(
          r => r.studentId._id.toString() === student._id.toString()
        );
      });
    }

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};