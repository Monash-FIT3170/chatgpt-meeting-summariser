const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const MeetingSummary = require('../models/meetingSummary.model');
const sendEmailRouter = require('../routes/sendEmail');
const sendEmail = sendEmailRouter.sendEmail;




router.post('/schedule', async (req, res) => {
    try {
        const { email, scheduleTime } = req.body;

        // Convert scheduleTime into a cron format
        
       
        

        const date1 = new Date(scheduleTime).toLocaleString('en-US', { timeZone: 'Australia/Melbourne' });
     
        const date = new Date(date1);
      
        console.log(date1)
       
        
        const cronTime = `${date.getMinutes()} ${date.getHours()} ${date.getDate() } ${date.getMonth() + 1} ${date.getDay()+1}`; // Runs every day at the specified time
        console.log(cronTime)
        cron.schedule(cronTime, async () => {
            try {
                const meetingSummary = await MeetingSummary.findOne().sort({ createdAt: -1 }); // Get the latest meeting summary
                sendEmail(meetingSummary, email, res);  // Call the sendEmail function
            } catch (error) {
                console.error('Error inside scheduled job:', error); // Log the error
                res.status(500).send('An error occurred inside the scheduled job.');   // Send a response to the client
            }
        });

        res.send('Email scheduled successfully!'); // Send a response as notification pop up
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while scheduling the email.'); 
    }
});

router.sendEmail = sendEmail; // Export the sendEmail function

module.exports = router; // Export the router

