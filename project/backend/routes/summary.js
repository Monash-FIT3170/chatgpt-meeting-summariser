const {Router} = require('express');
const UploadModel = require("../models/upload.model");
const UploadMiddleware = require("../middleware/multer.middleware");
const fs = require('fs');
const path = require('path');
const {transcribedScript} = require('./transcribe')
const axios = require("axios");
let MeetingSummary = require("../models/meetingSummary.model");

require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


const router = require('express').Router();



router.post("/summary", async (req, res) => {
    const transcriptChunks = transcribedScript
    let summaryChunks = ""
    let transcript = ""
    console.log("no. chunks:", transcriptChunks.length)
    for (var i = 0; i < transcriptChunks.length; i++) {
        console.log("summarising chunk", i+1, "of", transcriptChunks.length)
        let transcriptChunk = transcriptChunks[i].text
        transcript = transcript.concat(transcriptChunk)

        const chunkCompletion = await openai.createChatCompletion({
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
                {role: "user", content: transcriptChunk},
            ],
        });

        let summaryChunk = chunkCompletion.data.choices[0].message.content
        summaryChunks = summaryChunks.concat("\n", summaryChunk)
    }

    let fullCompletion = await openai.createChatCompletion({
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
                    "In the next message I will supply summaries of several parts of a meeting. Please combine the following meeting summaries into a single cohesive meeting summary.",
            },
            {
                role: "assistant",
                content: "Absolutely, I'm ready to assist. Please provide me with the meeting summaries that you'd like me to combine into a cohesive summary, and I'll do my best to create a comprehensive summary for you.",
            },
            {role: "user", content: summaryChunks},
        ],
    });

    const summaryPoints = fullCompletion.data.choices[0].message.content;

    const newMeetingSummary = new MeetingSummary({transcript: transcript, summaryPoints});
    await newMeetingSummary
        .save()
        .then((savedMeetingSummary) => {
            const savedMeetingSummaryId = savedMeetingSummary._id;
            console.log(savedMeetingSummaryId)
            res.json({ id: savedMeetingSummaryId });

          })
        .catch((err) => {
            console.log("save summary failed")
            res.status(400).json("Error: " + err)
        });
})



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
