var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Person = mongoose.model('Person');

// Authenticating a user given their username and password
passport.use(new LocalStrategy(function(username, password, done) {
  Person.findOne({username: username}, function(err, person) {
    if (err) {
      return done(err);
    }

    if (!person) {
      return done(null, false, {message: 'Could not find a user with that username.'});
    }

    if (!person.validPassword(password)) {
      return done(null, false, {message: 'Incorrect password entered.'});
    }

    return done(null, person);
  });
}));
