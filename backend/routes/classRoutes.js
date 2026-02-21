const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const checkPermission = require("../middleware/checkPermission");

const {
  createClass,
  getClasses,
  updateClass,
  deleteClass,
} = require("../controllers/classController");

router.post(
  "/",
  authMiddleware,
  checkPermission("class", "create"),
  createClass
);

router.get(
  "/",
  authMiddleware,
  checkPermission("class", "read"),
  getClasses
);

router.put(
  "/:id",
  authMiddleware,
  checkPermission("class", "update"),
  updateClass
);

router.delete(
  "/:id",
  authMiddleware,
  checkPermission("class", "delete"),
  deleteClass
);

module.exports = router;