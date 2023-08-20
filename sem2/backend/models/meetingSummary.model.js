const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const meetingSummarySchema = new Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    transcript: { type: String, required: true },
    summaryPoints: { type: [String], required: true },
    attendees: { type: [String], required: false },
  },
  {
    timestamps: true,
  }
);

const MeetingSummary = mongoose.model("MeetingSummary", meetingSummarySchema);

module.exports = MeetingSummary;
