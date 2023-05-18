const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const usersRouter = require('./routes/user');
const uploadRoute = require('./routes/upload');
const meetingSummariesRouter = require('./routes/meetingSummaries');

const summary = require('./routes/summary');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; 

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use('/users', usersRouter);
app.use('/meetingSummaries', meetingSummariesRouter);
app.use(summary);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.get('/health', (req, res) => {
  res.send('Server is online');
});