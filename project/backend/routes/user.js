const express = require('express');
const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');
var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();

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


// Set up session middleware
app.use(session({
  secret: 'your_secret_key_here',
  resave: false,
  saveUninitialized: false
}));

// Set up Passport.js middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport.js LocalStrategy
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // Find user by email
    const user = await User.findOne({ email });
    
    // If user not found or password incorrect, return error
    if (!user || !user.validPassword(password)) {
      return done(null, false, { message: 'Invalid email or password' });
    }
    
    // If user found and password correct, return user
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

// Serialize user for session storage
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session storage
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Login endpoint
router.post('/login', passport.authenticate('local'), (req, res) => {
  // If authentication successful, return user object
  res.json(req.user);
});

module.exports = router;
