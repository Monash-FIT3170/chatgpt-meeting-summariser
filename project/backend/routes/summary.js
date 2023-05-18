const {Router} = require('express');
const UploadModel = require("../models/upload.model");
const UploadMiddleware = require("../middleware/multer.middleware");
const fs = require('fs');
const path = require('path');

let MeetingSummary = require("../models/meetingSummary.model");

require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const router = Router();


router.post("/api/save", UploadMiddleware.single("transcript"), async (req, res) => {
    // const transcript = req.file.originalname;
    const transcript = req.file.buffer.toString();

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "system",
                content:
                    "You are a meeting assistant that is tasked to summarize meeting transcripts.",
            },
            {
                role: "user",
                content:
                    "Please generate a meeting summary for the following transcript.",
            },
            {
                role: "assistant",
                content: "Sure, I will generate a summary for your meeting transcript.",
            },
            {role: "user", content: transcript},
        ],
    });
    // console.log(completion.data.choices[0].message.content);

    const summaryPoints = completion.data.choices[0].message.content;

    const newMeetingSummary = new MeetingSummary({transcript, summaryPoints});
    console.log(transcript);
    console.log(summaryPoints);
    newMeetingSummary
        .save()
        .then((savedMeetingSummary) => {
            const savedMeetingSummaryId = savedMeetingSummary._id;
            console.log(`Meeting summary saved with ID: ${savedMeetingSummaryId}`);
            res.json({ id: savedMeetingSummaryId });
          })
        .catch((err) => res.status(400).json("Error: " + err));
})

// Delete a transcript
// router.delete('/api/delete/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const transcript = await UploadModel.findById(id);
//         if (!transcript) {
//             return res.status(404).send('Transcript not found');
//         }
//         const filePath = path.join(__dirname, '..', 'uploads', transcript.transcript);
//         fs.unlinkSync(filePath); // Delete the file from the server
//         await UploadModel.deleteOne({ _id: transcript._id }); // Delete the transcript from the database
//         res.send('Transcript deleted successfully');
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Internal Server Error');
//     }
// });

router.delete('/api/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const meetingSummary = await MeetingSummary.findById(id);
        if (!meetingSummary) {
            return res.status(404).send('Meeting summary not found');
        }
        //const filePath = path.join(__dirname, '..', 'uploads', meetingSummary.transcript);
        //fs.unlinkSync(filePath); // Delete the file from the server
        await MeetingSummary.deleteOne({ _id: meetingSummary._id }); // Delete the transcript from the database
        res.send('Meeting summary deleted successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
});



router.route("/").get((req, res) => {
    MeetingSummary.find()
        .then((meetingSummaries) => res.json(meetingSummaries))
        .catch((err) => res.status(400).json("Error: " + err));
});


router.route("/:id").get((req, res) => {
    MeetingSummary.findById(req.params.id)
        .then((meetingSummary) => res.json(meetingSummary))
        .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").delete((req, res) => {
    MeetingSummary.findByIdAndDelete(req.params.id)
        .then(() => res.json("Meeting summary deleted."))
        .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/update/:id").post((req, res) => {
    MeetingSummary.findById(req.params.id)
        .then((meetingSummary) => {
            meetingSummary.transcript = req.body.transcript;
            meetingSummary.summaryPoints = req.body.summaryPoints;

            meetingSummary
                .save()
                .then(() => res.json("Meeting summary updated!"))
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;


//module.exports = router;
