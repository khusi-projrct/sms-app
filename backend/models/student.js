const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
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

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true
    },

    rollNumber: {
      type: String,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// Unique roll number per class
studentSchema.index(
  { rollNumber: 1, classId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Student", studentSchema);
