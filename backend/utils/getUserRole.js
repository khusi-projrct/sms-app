const UserRole = require("../models/userRole");
const Role = require("../models/role");

const getUserRole = async (userId) => {
  const userRole = await UserRole
    .findOne({ userId })
    .populate("roleIds");

  if (!userRole || !userRole.roleIds.length) return null;

  // Assuming single primary role
  return userRole.roleIds[0].name;
};

module.exports = getUserRole;