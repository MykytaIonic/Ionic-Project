const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/config');
const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
const passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

app.get('/', function(req, res) {
  return res.send('Hello! The API is at http://localhost' + port + '/api');
});

const routes = require('./routes.js');
app.use('/api', routes);

mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established succesfully!');
});

connection.on('error', (err) => {
  console.log("MongoDB conection error. Please make sure MongoDB is running. " + err);
  process.exit();
});

app.listen(port);
console.log('There will be dragons: http://localhost' + port);
