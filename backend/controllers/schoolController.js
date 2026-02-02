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
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSchool,
  getSchools
};
