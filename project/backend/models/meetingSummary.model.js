const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const attendeeSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return emailRegex.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
});

const meetingSummarySchema = new Schema(
  {
    transcript: { type: String, required: true },
    summaryPoints: { type: [String], required: true },
    attendees: { type: [attendeeSchema], required: false },
    completed: { type: Boolean, required: false },
    meetingTitle: { type: String, required: false }, // Add meetingTitle field
    meetingDate: { type: Date, required: false },   // Add meetingDate field
  },
  {
    timestamps: true,
  }
);

const MeetingSummary = mongoose.model("MeetingSummary", meetingSummarySchema);

module.exports = MeetingSummary;
