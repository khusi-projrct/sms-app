const Class = require("../models/class");

// CREATE CLASS
exports.createClass = async (req, res) => {
  try {
    const newClass = await Class.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET CLASSES (WITH PAGINATION + FILTER)
exports.getClasses = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", school } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};

    if (school) {
      filter.schoolId = school;
    }

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    const total = await Class.countDocuments(filter);

    const classes = await Class.find(filter)
      .populate("schoolId", "name")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      data: classes,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE CLASS
exports.updateClass = async (req, res) => {
  try {
    const updated = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE CLASS
exports.deleteClass = async (req, res) => {
  try {
    const deleted = await Class.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};