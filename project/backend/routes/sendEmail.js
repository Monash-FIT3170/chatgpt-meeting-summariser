const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const MeetingSummary = require('../models/meetingSummary.model');

async function sendEmail(meetingSummary, email, res) {
  try {
    if (!meetingSummary) {
      return res.status(404).send('Meeting summary not found');
    }

    const transporter = nodemailer.createTransport({
      service: 'Outlook',
      auth: {
        user: 'minute-mind.3170@outlook.com',
        pass: 'Test2469'
      }
    });

    const mailOptions = {
      from: 'minute-mind.3170@outlook.com',
      to: email,
      subject: 'Meeting Summary',
      text: 'Hi,\n\nPlease find the attached meeting summary.\n\nRegards,\nThe Minute Mind',
      attachments: [
        {
          filename: 'summary.txt',
          content: meetingSummary.summaryPoints.join(' ')
        }
      ]
    };

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
}

router.post('/', async (req, res) => {
  try {
    const meetingSummary = await MeetingSummary.findOne().sort({ createdAt: -1 });
    const { email } = req.body;
    sendEmail(meetingSummary, email, res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while sending the email.');
  }
});

router.post('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const meetingSummary = await MeetingSummary.findById(id);
    console.log(meetingSummary)
    const { email } = req.body;
    sendEmail(meetingSummary, email, res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('An error occurred while sending the email.');
  }
});

module.exports = router;
