const router = require('express').Router();
const db = require('../db');
const createUser = require("../routes/user");

router.route('/test/reset-the-world').post(async (_req, res) => {

        db.clearDatabase();
        const newUser = await createUser('badstudent', 'test@test.com', 'Password#23');
        console.log("created not saved");
        newUser.save();
});


module.exports = router;