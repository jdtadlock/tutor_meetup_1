const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const port = process.env.PORT || 5000;
const config = require('./config/config');

mongoose.connect('mongodb://localhost/meetup_1');
mongoose.Promise = Promise;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(session({
  secret: config.secret,
  proxy: true,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

