const Permission = require("../models/permission");

const createPermission = async (req, res) => {
  try {
    const { module, actions } = req.body;

    const existingPermission = await Permission.findOne({ module });
    if (existingPermission) {
      return res.status(400).json({
        message: "Permission already exists for this module"
      });
    }

    const permission = new Permission({ module, actions });
    await permission.save();

    res.status(201).json({
      message: "Permission created successfully",
      permission
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPermission, getPermissions };
