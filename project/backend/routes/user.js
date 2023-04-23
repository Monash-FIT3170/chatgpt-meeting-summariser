const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');

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

module.exports = router;