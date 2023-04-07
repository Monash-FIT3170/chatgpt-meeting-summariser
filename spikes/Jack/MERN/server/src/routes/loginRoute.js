const jwt = require('jsonwebtoken')

module.exports = (req, res) => {
    if (req.body.password === process.env.PASSWORD){
        const token = jwt.sign({
            userId: 1,
        }, process.env.SECRET);
        res.json({
            token,
        });
    }
    else {
        console.log("fail");
        res.status(401).send('Incorrect password');
    }
}