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
    // need database to be updated with information
    const mailOptions = {
      from: 'Minute Mind <minute-mind.3170@outlook.com>',
      bcc: email,  // prefer to be bcc just in case of large list of attendees
      subject: `Meeting Summary from ${meetingSummary?.meetingDate?.toLocaleDateString('pt-PT') ?? meetingSummary.createdAt.toLocaleDateString('pt-PT')}`,
      text: `Hello,\n\nBelow is a summary from ${meetingSummary?.meetingTitle ?? "Meeting"} that took place on ${meetingSummary?.meetingDate?.toLocaleDateString('pt-PT') ?? meetingSummary.createdAt.toLocaleDateString('pt-PT')} \n\nSummary: ${meetingSummary.summaryPoints.join(' ')}\n\nKind regards, 
      `
      
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
        res.status(500).send('An error occurred while sending the email.');
      } else {
        console.log(meetingSummary)
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
    
    console.log(meetingSummary)
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
