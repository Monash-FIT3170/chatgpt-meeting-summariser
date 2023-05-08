const {Router} = require('express');
const UploadModel = require("../models/upload.model");
const UploadMiddleware = require("../middleware/multer.middleware");
const fs = require('fs');
const path = require('path');



const router = Router();


router.post("/api/save", UploadMiddleware.single("transcript"), (req, res) => {
    // const transcript = req.file.originalname;
    const transcript = req.file.buffer.toString();


    UploadModel.create({transcript})
        .then((data) =>{
            console.log("Transcript uploaded successfully");
            res.send(data);

        })
        .catch((err) => console.log(err));
})

// Delete a transcript
router.delete('/api/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const transcript = await UploadModel.findById(id);
        if (!transcript) {
            return res.status(404).send('Transcript not found');
        }
        const filePath = path.join(__dirname, '..', 'uploads', transcript.transcript);
        fs.unlinkSync(filePath); // Delete the file from the server
        await UploadModel.deleteOne({ _id: transcript._id }); // Delete the transcript from the database
        res.send('Transcript deleted successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
