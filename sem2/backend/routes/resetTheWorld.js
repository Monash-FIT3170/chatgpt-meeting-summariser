const router = require('express').Router();
const db = require('../db');
const {createUser} = require("../routes/user");

router.route('/test/reset-the-world').post(async (_req, res) => {

        db.clearDatabase();
        const newUser = await createUser('badstudent', 'test@test.com', 'Password#23');
        newUser.save();
        res.status(200).json({ message: 'world resetted' });
});


module.exports = router;