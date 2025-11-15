const Class = require('../models/class');
const School = require('../models/school');

const createClass = async (req, res) => {
    try {
        const { name, school, section } = req.body;
        const schoolExists = await School.findById(school);
        if (!schoolExists) return res.status(404).json({ message: 'School not found' });

        const newClass = new Class({ name, school, section });
        await newClass.save();
        res.status(201).json(newClass);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getClasses = async (req, res) => {
    try {
        const classes = await Class.find().populate('school', 'name');
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getClass = async (req, res) => {
    try {
        const { id } = req.params;
        const classObj = await Class.findById(id).populate('school');
        if (!classObj) return res.status(404).json({ message: 'Class not found' });
        res.status(200).json(classObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Class.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: 'Class not found' });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Class.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Class not found' });
        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createClass, getClasses, getClass, updateClass, deleteClass };