const Subject = require("../models/subject");

// CREATE SUBJECT
exports.createSubject = async (req, res) => {
  try {
    const subject = await Subject.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET SUBJECTS
exports.getSubjects = async (req, res) => {
  try {
    const filter = {};
    if (req.query.classId) filter.classId = req.query.classId;

    const subjects = await Subject.find(filter)
      .populate("classId", "name section")
      .populate("schoolId", "name");

    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};