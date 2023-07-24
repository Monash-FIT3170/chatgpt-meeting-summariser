const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingSummarySchema = new Schema(
  {
    transcript: { type: String, required: true },
    summaryPoints: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const MeetingSummary = mongoose.model("MeetingSummary", meetingSummarySchema);

module.exports = MeetingSummary;
