const School = require('../models/school');

const createSchool = async (req, res) => {
    try {
        const { school_id, name, address } = req.body;

        if (!school_id || !name || !address) {
            return res.status(400).json({ message: "SchoolId, name and address are required." });
        }

        const newSchool = new School({ school_id, name, address });
        await newSchool.save();

        res.status(201).json({ message: "School created successfully", school: newSchool });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllSchools = async (req, res) => {
    try {
        const schools = await School.find();
        res.json(schools);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSchool = async (req, res) => {
    try {
        const { schoolId } = req.params;
        const school = await School.findById(schoolId);

        if (!school) {
            return res.status(404).json({ message: "School not found." });
        }

        res.json(school);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSchool = async (req, res) => {
    try {
        const { schoolId } = req.params;
        const { name, address } = req.body;

        const updatedSchool = await School.findByIdAndUpdate(schoolId, { name, address }, { new: true });

        if (!updatedSchool) {
            return res.status(404).json({ message: "School not found." });
        }
        res.json({ message: "School updated successfully", school: updatedSchool });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSchool = async (req, res) => {
    try {
        const { schoolId } = req.params;
        const deletedSchool = await School.findByIdAndDelete(schoolId);

        if (!deletedSchool) {
            return res.status(404).json({ message: "School not found" });
        }

        res.json({ message: "School deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createSchool, getAllSchools, getSchool, updateSchool, deleteSchool };