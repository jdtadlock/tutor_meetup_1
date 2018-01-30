const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  User.findOne({email: email})
    .then(user => {
      if ( !user ) return done(null, false);

      user.comparePassword(password, (err, isMatch) => {
        if ( isMatch )
          return done(null, user);
        else return done(null, false);
      });
    }).catch(err => console.log(err));
}));

passport.serializeUser((user, cb) => {
  User.findById(id, (err, user) => {
    if ( err ) return cb(err);

    cb(null, user);
  });
});

module.exports = passport;