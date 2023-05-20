// backend/routes/email.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// POST route for sending an email
router.post('/', (req, res) => {
  // Extract necessary data from the request body
  const { to, subject, body } = req.body;

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
    to,
    subject,
    text: body
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
});

module.exports = router;