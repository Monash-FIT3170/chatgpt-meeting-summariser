const multer = require("multer");


multer.diskStorage = function (param) {
    return undefined;
};

const storage = multer.memoryStorage()

// Filter for txt files only
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["text/plain"];
    if (allowedFileTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const uploadMiddleware = multer({ storage});

module.exports = uploadMiddleware;
