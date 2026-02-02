const UserRole = require("../models/userRole");
const RolePermission = require("../models/rolePermission");

const checkPermission = (moduleName, action) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;

      const userRole = await UserRole.findOne({ userId });
      if (!userRole || !userRole.roleIds.length) {
        return res.status(403).json({ message: "No roles assigned" });
      }

      const rolePermissions = await RolePermission.find({
        roleId: { $in: userRole.roleIds }
      }).populate("permissionId");

      const hasPermission = rolePermissions.some(rp =>
        rp.permissionId &&
        rp.permissionId.module === moduleName &&
        rp.allowedActions.includes(action)
      );

      if (!hasPermission) {
        return res.status(403).json({ message: "Permission denied" });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Permission check failed" });
    }
  };
};

module.exports = checkPermission;
