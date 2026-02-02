const Class = require("../models/class");

// CREATE CLASS
exports.createClass = async (req, res) => {
  try {
    const newClass = await Class.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET CLASSES (BY SCHOOL)
exports.getClasses = async (req, res) => {
  try {
    const filter = req.query.schoolId
      ? { schoolId: req.query.schoolId }
      : {};

    const classes = await Class.find(filter).populate("schoolId", "name");
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};