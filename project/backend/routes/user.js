const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/signup').post(async (req, res) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user_detail = {
            "firstName": req.body.firstName,
            "lastName": req.body.lastName,
            "email": req.body.email,
            "password": hashedPassword
        }

        const newUser = new User(user_detail);

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

router.post('/login', async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({ username: req.body.username });
    try {
        if (user) {
            res.redirect('/CreateMeetingSummary');
        } else {
            res.json({ message: 'Incorrect username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }   
});

    module.exports = router;