const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create the uploads folder if it doesn't exist
if (!fs.existsSync('uploads/')) {
    fs.mkdirSync('uploads/');
}

const storageConfiguration = multer.diskStorage({
    destination: (req, file, next) => {
        next(null, 'uploads/');
    },
    filename: (req, file, next) => {
        console.log(file);
        next(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploader = multer({ storage: storageConfiguration });

module.exports = uploader;
