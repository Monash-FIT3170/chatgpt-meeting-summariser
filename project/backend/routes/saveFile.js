const axios = require("axios")
const multer = require("multer");
const path = require("path");
const {Router} = require('express');
const fs = require("fs");

const router = Router();
const port = 5001;

// Initialize multer with the storage configuration
const upload = multer({ dest: "uploads/" });
const destinationPath = path.resolve(__dirname, '..');

// Handle the POST request to /saveFile
router.post("/saveFile", upload.single("mp4File"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file provided." });
    }

     // Rename the uploaded file
     const newFileName = "test" + path.extname(req.file.originalname);
     const newPath = path.join(destinationPath, "uploads/", newFileName);
     fs.rename(req.file.path, newPath, (err) => {
         if (err) {
             console.error("Error renaming file:", err);
             return res.status(500).json({ error: "Error renaming file." });
         }
     });


     console.log("File uploaded successfully:", req.file.originalname);
     axios.post(`http://localhost:${port}/transcribe`)
        .then((response) => {
            const savedMeetingSummaryId = response.data.id;
            console.log(`Received Meeting Summary ID for save fileee: ${savedMeetingSummaryId}`);
            // res.json({ id: savedMeetingSummaryId });
            return res.status(200).json({
                id: savedMeetingSummaryId,
                message: "File uploaded and renamed successfully."
            });
        })
        .catch((error) => {
            console.error("Error while fetching meeting summary ID:", error);
        });

    //  return res.status(200).json({ message: "File uploaded and renamed successfully." });

});

module.exports = router;