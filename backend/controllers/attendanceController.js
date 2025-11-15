const Attendance = require('../models/attendance');
const Class = require('../models/class');

const createAttendance = async (req, res) => {
    try {
        const { student_id, class_id, date, status } = req.body;
        const classExists = await Class.findById(class_id);
        if (!classExists) return res.status(404).json({ message: 'Class not found' });

        const newAttendance = new Attendance({ student_id, class_id, date, status });
        await newAttendance.save();
        res.status(201).json(newAttendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find()
            .populate('student_id')
            .populate('class_id');
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAttendanceById = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id)
            .populate('student_id')
            .populate('class_id');
        if (!attendance) return res.status(404).json({ message: 'Attendance not found' });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateAttendance = async (req, res) => {
    try {
        const updatedAttendance = await Attendance.findByIdAndUpdate(req.params.id);
        if (!updatedAttendance) return res.status(404).json({ message: 'Attendance not found' });
        res.status(200).json(updatedAttendance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteAttendance = async (req, res) => {
    try {
        const deletedAttendance = await Attendance.findByIdAndDelete(req.params.id);
        if (!deletedAttendance) return res.status(404).json({ message: 'Attendance not found' });
        res.status(200).json({ message: 'Attendance deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createAttendance, getAllAttendance, getAttendanceById, updateAttendance, deleteAttendance }; 
