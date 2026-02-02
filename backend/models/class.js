const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true
    },

    section: {
      type: String, // A, B, C
      default: "A"
    },

    isActive: {
      type: Boolean,
      default: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

// One class name per school
classSchema.index(
  { name: 1, section: 1, schoolId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Class", classSchema);
