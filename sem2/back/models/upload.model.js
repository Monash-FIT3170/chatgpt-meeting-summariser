const mongoose = require("mongoose");

const uploadTranscriptSchema = new mongoose.Schema(
    {
        transcript: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const transcriptUpload = mongoose.model("UploadTranscript", uploadTranscriptSchema);

module.exports = transcriptUpload;