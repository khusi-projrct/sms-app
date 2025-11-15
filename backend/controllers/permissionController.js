const Permission = require("../models/permission");

const createPermission = async (req, res) => {
    try {
        const { tag, actions } = req.body;

        const existingPermission = await Permission.findOne({ tag, actions });
        if (existingPermission) {
            return res.status(400).json({ message: "Permission already exists for this model" });
        }

        const permission = new Permission({ tag, actions });
        await permission.save();

        res.status(201).json({ message: "Pemission created Successfully", permission });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.json(permissions);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = { createPermission, getPermissions };