const router = require('express').Router();
const User = require('../models/User');
const passport = require('../modules/passport');

// localhost:5000/auth/register

// User.find({}).remove().then(res => console.log(res));
// User.remove({});
// User.find({}).then(users => console.log(users));

function authenticate(req, res) {
  passport.authenticate('local')
    (req, res, result => {
      res.send({ user: req.user, success: 1 });
    });
}

router.post('/register', (req, res) => {
  User.create(req.body)
    .then(result => {
      authenticate(req, res)
    }).catch(err => console.log(err));
});

router.post('/login', (req, res) => {
  authenticate(req, res);
});

router.get('/authenticated', (req, res) => {
  res.send({user: req.user});
});


module.exports = router;