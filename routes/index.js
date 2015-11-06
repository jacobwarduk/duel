var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

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

// Route to get existing people
router.get('/people', function(req, res, next) {
  Person.find(function(err, people) {
    if (err) {
      return next(err);
    }
    res.json(people);
  });
});

// Route to register new people
router.post('/register', function(req, res, next) {
  if (!req.body.username || req.body.username === '' || !req.body.password || req.body.password === '' || !req.body.email || req.body.email === '' || !req.body.firstName || req.body.firstName ==='' || !req.body.lastName || req.body.lastName ==='') {
      return res.status(400).json({message: 'Please ensure you fill out all required fields.'});
    }

    var person = new Person();

    person.username = req.body.username;
    person.setPassword(req.body.password);
    person.email = req.body.email;
    person.firstName = req.body.firstName;
    person.lastName = req.body.lastName;

    person.save(function(err) {
      if (err) {
        return next(err);
      }

      return res.json({token: person.generateJWT()});
    });
});

// Authenticating JWT tokens
var auth = jwt({
  secret: 'TOKEN',
  personProperty: 'payload'
});

// Route to login for existing users
router.post('/login', function(req, res, next) {
  if (!req.body.username || req.body.username === '' || !req.body.password || req.body.password === '') {
    return res.status(400).json({message: 'Please ensure you fill out all required fields.'});
  }

  passport.authenticate('local', function(err, person, info) {
    if (err) {
      return next(err);
    }

    if (person) {
      return res.json({token: person.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  }) (req, res, next);
});



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Friend Finder' });
});

module.exports = router;
