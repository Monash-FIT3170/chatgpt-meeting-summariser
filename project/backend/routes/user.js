const express = require('express');
const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');

const app = express();
const crypto = require('crypto');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/signup').post(async (req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user_detail = {"firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": hashedPassword}
    
        const newUser = new User(user_detail);
    
        newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    catch{
        res.status(500).send();
    }
});

router.route('/create').post(async (req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user_details = {'username': req.body.username,
        'email' : req.body.email,
        'password': hashedPassword}

        const newUser = new User(user_details);
        newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    }
    catch{
        res.status(500).send();
    }
});

// Login route
router.route('/login').post(async (req, res) => {
  try {
    // Retrieve the login credentials from the request body
    const { username, password } = req.body;

    // Find the user in the MongoDB collection based on the username
    const user = await User.findOne({ username });

    if (!user) {
      // User not found in the database
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password stored in the user document
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Authentication successful
      // Generate a token or set up a session to authenticate subsequent requests
      const buffer = crypto.randomBytes(32);
      const token = buffer.toString('hex');
      // Return the token or any other relevant data
      res.json({ token });
      
    } else {
      // Authentication failed
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    // Error occurred while querying the database or comparing passwords
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
