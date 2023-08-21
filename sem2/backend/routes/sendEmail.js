
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const MeetingSummary = require('../models/meetingSummary.model');

// POST route for sending an email
router.post('/', async (req, res) => {
  try {
    // Retrieve the meeting summary from the database
    const meetingSummary = await MeetingSummary.findOne().sort({ createdAt: -1 });

    if (!meetingSummary) {
      return res.status(404).send('Meeting summary not found');
    }

    const {email} = req.body;

    // Create a transporter using nodemailer
    const transporter = nodemailer.createTransport({
      // Set up your email provider's configuration here
      // For example, using SMTP:
      service: 'Outlook',
      auth: {
        user: 'minute-mind.3170@outlook.com',
        pass: 'Test2469'
      }
    });

    

    // Prepare the email message
    const mailOptions = {
      from: 'minute-mind.3170@outlook.com',
      to: email,
      subject: "Meeting Summary",
      body: "Please find the attatched meeting summary",
      attachments: [
        {
          filename: 'summary.txt',
          content: meetingSummary.summaryPoints.join(' ')
        }
      ]
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
        res.status(500).send('An error occurred while sending the email.');
      } else {
        console.log('Email sent:', info.response);
        res.send('Email sent successfully!');
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while sending the email.');
  }
});

module.exports = router;
// POST route for sending an email
