const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: true
    },
    actions: {
        type: String,
        required: true,
    }
});

// Create a compound unique index
permissionSchema.index({ tag: 1, actions: 1 }, { unique: true });

const Permission = mongoose.model("Permission", permissionSchema);

module.exports = Permission;