const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    module: {
      type: String,
      required: true,
      lowercase: true,
      trim: true
    },
    actions: {
      type: [String],
      required: true,
      enum: ["create", "read", "update", "delete"]
    }
  },
  { timestamps: true }
);

// One permission document per module
permissionSchema.index({ module: 1 }, { unique: true });

module.exports = mongoose.model("Permission", permissionSchema);
