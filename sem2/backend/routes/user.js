const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = createUser;

async function createUser(firstName, lastName, email, password){
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    user_detail = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": hashedPassword
    }
    return new User(user_detail)
}


router.route('/signup').post(async (req, res) => {
    try {
        let body = req.body
        const newUser = createUser(body.firstName, body.lastName, body.email, body.password);

        newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err));
    }
    catch {
        res.status(500).send();
    }
});

router.route('/create').post(async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user_details = {
            'username': req.body.username,
            'email': req.body.email,
            'password': hashedPassword,
            'salt': salt
        }

        const newUser = new User(user_details);
        newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => res.status(400).json('Error: ' + err));
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

    module.exports = router;
