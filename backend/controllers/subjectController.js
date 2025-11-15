const Subject = require("../models/subject");
const classModel = require("../models/class");

const createSubject = async (req, res) => {
    try {
        const { name, class: classId, teacher } = req.body;

        const classExists = await classModel.findById(classId);
        if (!classExists) {
            return res.status(404).json({ message: "Class not found" });
        }

        const newSubject = new Subject({
            name,
            class: classId,
            teacher
        });

        await newSubject.save();
        res.status(201).json(newSubject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate('class');
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id).populate('class');
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Subject.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Subject not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Subject.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createSubject, getSubjects, getSubjectById, updateSubject, deleteSubject };  