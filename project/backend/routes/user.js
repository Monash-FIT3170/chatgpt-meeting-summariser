const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

async function createUser(username, email, password) {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  user_detail = {
      "username": username,
      "email": email,
      "password": hashedPassword,
      "salt": salt
  }
  return new User(user_detail);
}


router.route('/create').post(async (req, res) => {

  let body = req.body;  
  if (!(body.username && body.email && body.password && validateEmail(body.email))) {
    res.status(400).json("invalid details")
  }

  try {
    (await createUser(req.body.username, req.body.email, req.body.password)).save()
    .then(() => res.json('User added!'))
  }
  catch {
      res.status(500).send();
  }
});

// Login route
router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        if (isPasswordValid) {
          // Store user details in the session
          req.session.user = {
            id: user._id,
            username: user.username,
            // Add other relevant user details to store in the session if needed.
          };
          res.status(200).json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Logout route
router.post('/logout', (req, res) => {
    // Destroy the session to log out the user
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).json({ message: 'Server error' });
      } else {
        res.json({ message: 'Logged out successfully' });
      }
    });
  });

  module.exports = {
    createUser: createUser,
    router: router
  };


  // written by chatGpt
  function validateEmail(email) {
    // Regular expression for a valid email address
    const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  
    // Test the provided email against the regex pattern
    return emailRegex.test(email);
  }