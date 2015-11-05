var mongoose = require('mongoose');

// Schema for people
var PersonSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  fullname: String,
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'Person'}]
});

mongoose.model('Person', PersonSchema);
