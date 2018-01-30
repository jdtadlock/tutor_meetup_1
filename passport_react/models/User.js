const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


// User.find({}).then(users => console.log(users));

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: { type: String, required: true }
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password'))
    return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});


UserSchema.methods.comparePassword = function (userPass, cb) {
  bcrypt.compare(userPass, this.password, function (err, isMatch) {
    if (err) return cb(err);

    cb(null, isMatch);
  })
}

module.exports = mongoose.model('User', UserSchema);