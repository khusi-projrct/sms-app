const multer = require('multer');
const path = require('path');

// Set storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads/'));
    },
    filename: function (req, file, cb) {
        // Generate a unique filename: timestamp + random number + original extension
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    // Treat JFIF as JPEG based on extension
    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.includes(file.mimetype) || ext === ".jfif") {
        cb(null, true);
    } else {
        cb(new Error("Only JPEG, JPG, PNG, and JFIF files are allowed"), false);
    }
};

// Create multer upload instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // optional: max 5MB file size
});

module.exports = upload;
