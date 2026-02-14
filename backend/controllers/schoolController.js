const School = require("../models/school");

// CREATE SCHOOL
const createSchool = async (req, res) => {
  try {
    const school = await School.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(school);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL SCHOOLS
const getSchools = async (req, res) => {
    try {
        let { page = 1, limit = 10, search = "" } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const query = {
            name: { $regex: search, $options: "i" }
        };

        const total = await School.countDocuments(query);

        const schools = await School.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.json({
            data: schools,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// UPDATE SCHOOL
const updateSchool = async (req, res) => {
  try {
    const { id } = req.params;

    const school = await School.findById(id);

    if (!school) {
      return res.status(404).json({ message: "School not found" });
    }

    school.name = req.body.name || school.name;

    const updatedSchool = await school.save();

    res.json(updatedSchool);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE SCHOOL
const deleteSchool = async (req, res) => {
    try {
        const { id } = req.params;

        const school = await School.findById(id);

        if (!school) {
            return res.status(404).json({
                message: "School not found",
            });
        }

        await School.findByIdAndDelete(id);

        res.status(200).json({
            message: "School deleted successfully",
        });

    } catch (error) {
        console.error("Delete school error:", error);
        res.status(500).json({
            message: "Server error",
        });
    }
};

module.exports = {
  createSchool,
  getSchools,
  updateSchool,
  deleteSchool  
};