const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const port = process.env.PORT || 5000;
const config = require('./config/config');
const passport = require('./modules/passport');

mongoose.connect('mongodb://localhost/meetup_1');
mongoose.Promise = Promise; // Setup Promises on the Mongoose base Model

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

const passport_routes = require('./routes/passport_routes');
app.use('/auth', passport_routes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, () => console.log(`Server up on ${port}`));