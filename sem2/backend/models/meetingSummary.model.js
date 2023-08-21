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
    // _id: mongoose.Schema.Types.ObjectId,
    transcript: { type: String, required: true },
    summaryPoints: { type: [String], required: true },
    attendees: { type: [attendeeSchema], required: false, validate: {
      validator: (v) => {
        return v.every(email => emailRegex.test(email));
      },
      message: props => `${props.value} is not a valid email address!`
    } },
  },
  {
    timestamps: true,
  }
);

const MeetingSummary = mongoose.model("MeetingSummary", meetingSummarySchema);

module.exports = MeetingSummary;
