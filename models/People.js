var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// Schema for people
var PersonSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  hash: String,
  salt: String,
  email: {type: String, lowercase: true, unique: true},
  firstName: String,
  lastName: String,
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Person'}],
  reqIn: [{type: mongoose.Schema.Types.ObjectId, ref: 'Person'}],
  reqOut: [{type: mongoose.Schema.Types.ObjectId, ref: 'Person'}]
});

// Schema method to set password
PersonSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

// Schema method to validate password
PersonSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

// Schema method to generate web token for 30 days
PersonSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 30);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, 'TOKEN');   // Should really use an environment variable instead of hardcoding in codebase - but I'm on a strict timetable!
};

mongoose.model('Person', PersonSchema);
