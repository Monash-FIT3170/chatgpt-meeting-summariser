const router = require("express").Router();
let MeetingSummary = require("../models/meetingSummary.model");

router.route("/").get((req, res) => {
  MeetingSummary.find()
    .then((meetingSummaries) => res.json(meetingSummaries))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const transcript = req.body.transcript;
  const summaryPoints = req.body.summaryPoints;

  const newMeetingSummary = new MeetingSummary({ transcript, summaryPoints });

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

      meetingSummary
        .save()
        .then(() => res.json("Meeting summary updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
