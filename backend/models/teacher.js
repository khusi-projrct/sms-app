const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    },

    assignedClasses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
      }
    ],

    assignedSubjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
