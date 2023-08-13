const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const usersRouter = require('./routes/user');
const uploadRoute = require('./routes/upload');
const meetingSummariesRouter = require('./routes/meetingSummaries');
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerAutogen = require('swagger-autogen')();


const summary = require('./routes/summary');
const emailRoute = require('./routes/sendEmail');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

 //TODO: Move to environment file when deploying
const options = {
  oepnapi: "3.1.0",
  definition: {
    swagger: '2.0',
    info: {
      title: "Meeting sumarizer",
      version: "0.1.0",
      description:
        "Meeting summarizer"
    },
  },
  apis: ["./routes/*.js"],
  explorer: true
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/*.js'];

require('dotenv').config();

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
app.use('/api/email', emailRoute);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

swaggerAutogen(outputFile, endpointsFiles, options).then(() => {
  let swaggerDocument =  require('./swagger.json')
  app.use(
    "/api/swagger",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
  );
});



//const uri = process.env.ATLAS_URI;
const mongo = await MongoMemoryServer.create();
const uri = mongo.getUri()
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, 'localhost', () => {
    console.log(`Server is running on port: ${port}`);
});

app.get('/health', (req, res) => {
  res.send('Server is online');
});