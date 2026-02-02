const RolePermission = require("../models/rolePermission");
const Permission = require("../models/permission");


const assignPermissionToRole = async (req, res) => {
  try {
    const { roleId, permissionId, allowedActions } = req.body;

    // Validate permission exists
    const permission = await Permission.findById(permissionId);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    // Validate allowed actions
    const invalidActions = allowedActions.filter(
      action => !permission.actions.includes(action)
    );

    if (invalidActions.length > 0) {
      return res.status(400).json({
        message: "Invalid actions provided",
        invalidActions
      });
    }

    // Check existing mapping
    let rolePermission = await RolePermission.findOne({
      roleId,
      permissionId
    });

    if (rolePermission) {
      rolePermission.allowedActions = allowedActions;
      await rolePermission.save();

      return res.json({
        message: "Role permission updated successfully",
        data: rolePermission
      });
    }

    // Create new mapping
    rolePermission = new RolePermission({
      roleId,
      permissionId,
      allowedActions
    });

    await rolePermission.save();

    res.status(201).json({
      message: "Permission assigned to role successfully",
      data: rolePermission
    });

  } catch (error) {
    console.error("RolePermission Error:", error);
    res.status(500).json({ message: "Failed to assign permission to role" });
  }
};


// Get permissions by role
const getPermissionsByRole = async (req, res) => {
  try {
    const { roleId } = req.params;

    const rolePermissions = await RolePermission.find({ roleId })
      .populate("permissionId");

    if (!rolePermissions.length) {
      return res.status(404).json({
        message: "No permissions found for this role"
      });
    }

    // Format response (clean & frontend-friendly)
    const permissions = rolePermissions.map(rp => ({
      module: rp.permissionId.module,
      allowedActions: rp.allowedActions
    }));

    res.json({ roleId, permissions });

  } catch (error) {
    console.error("Get RolePermission Error:", error);
    res.status(500).json({ message: "Failed to fetch role permissions" });
  }
};

module.exports = {
  assignPermissionToRole,
  getPermissionsByRole
};
