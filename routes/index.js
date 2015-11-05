var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Person = mongoose.model('Person');

// Route for preloading people objects
router.param('person', function(req, res, next, id) {
  var query = Person.findById(id);

  query.exec(function(err, person) {
    if (err) {
      return next(err);
    }

    if (!person) {
      return next(new Error('Error finding requested person.'));
    }

    req.person = person;
    return next();
  });
});

// Route to get a person
router.get('/people/:person', function(req, res) {
  res.json(req.person);
});

// Route to GET people
router.get('/people', function(req, res, next) {
  Person.find(function(err, people) {
    if (err) {
      return next(err);
    }
    res.json(people);
  });
});

// Route to POST people
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
