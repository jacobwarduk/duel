var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Person = mongoose.model('Person');

// Route to GET people API
router.get('/people', function(req, res, next) {
  Person.find(function(err, people) {
    if (err) {
      return next(err);
    }
    res.json(people);
  });
});

// Route to POST people API
router.post('/people', function(req, res, next) {
  var person = new Person(req.body);

  person.save(function(err, person) {
    if (err) {
      return next(err);
    }
    res.json(person);
  });
});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
