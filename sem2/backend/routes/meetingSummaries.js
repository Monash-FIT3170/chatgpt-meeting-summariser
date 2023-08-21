const router = require("express").Router();
let MeetingSummary = require("../models/meetingSummary.model");

require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  MeetingSummary.find()
    .then((meetingSummaries) => res.json(meetingSummaries))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  const transcript = req.body.transcript;
  const attendees = req.body.attendees;
  const date = req.body.date;
  const startTime = req.body.startTime; 
  // const summaryPoints = req.body.summaryPoints;

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
      { role: "user", content: transcript },
    ],
  });
  // console.log(completion.data.choices[0].message.content);

  const summaryPoints = completion.data.choices[0].message.content;

  const newMeetingSummary = new MeetingSummary({ date, startTime, transcript, summaryPoints, attendees });

  newMeetingSummary
    .save()
    .then(() => res.json("Meeting summary added!"))
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
      meetingSummary.attendees = req.body.attendees

      meetingSummary
        .save()
        .then(() => res.json("Meeting summary updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
