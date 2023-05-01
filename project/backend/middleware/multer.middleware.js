const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
    },
});


const uploadMiddleware = multer({ storage});

module.exports = uploadMiddleware;
