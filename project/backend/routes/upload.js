const {Router} = require('express');
const UploadModel = require("../models/upload.model");
const UploadMiddleware = require("../middleware/multer.middleware");


const router = Router();

router.get("/api/get", async (req,res)=>{
    const allTranscripts= await UploadModel.find().sort({createdAt: "descending"});
    res.send(allTranscripts)
});

router.post("/api/save", UploadMiddleware.single("transcript"), (req, res) => {
    const transcript = req.file.filename;


    UploadModel.create({transcript})
        .then((data) =>{
            console.log("Transcript uploaded successfully");
            res.send(data);

        })
        .catch((err) => console.log(err));
})

module.exports = router;
