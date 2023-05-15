const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
    },
});

// Filter for txt files only
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["text/txt"];
    if (allowedFileTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const uploadMiddleware = multer({ storage , fileFilter});

module.exports = uploadMiddleware;
