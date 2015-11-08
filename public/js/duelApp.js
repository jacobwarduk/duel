var app = angular.module('duelApp', ['ui.router']);

// Service for people
app.factory('people', ['$http', function($http) {

  // Initialising people object with array
  var o = {
    people: []
  };

  // Method to retieve all people
  o.getAll = function () {
    return $http.get('/people').success(function(data) {
      angular.copy(data, o.people);
    });
  };

  // Method to retrieve a single person
  o.get = function(id) {
    return $http.get('/people/' + id).then(function(res) {
      return res.data;
    });
  };

  return o;
}]);

// Service for updating a person's details
app.factory('update', ['$http', function($http) {
  var update = {};

  // Method to update a person's details
  update.newDetails = function(id) {
    return $http.put('/update/' + id).then(function(res) {
      return res.data;
    });
  };

  return update;
}]);

// Service for friendships
app.factory('friends', ['$http', funtion($http) {
  // Initialising friends object with array
  var f = {
    friends[];
  };

  // Method to retrieve all friends
  friends.getAll = function () {
    return $http.get('/friends/' + id).then(function(res) {
      return res.data;
    });
  };

}]);

// Service for authentication
app.factory('auth', ['$http', '$window', function($http, $window) {
  var auth = {};

  // Method to save token
  auth.saveToken = function(token) {
    $window.localStorage['friend-finder-token'] = token;
  };

  // Method to retrieve token
  auth.getToken = function() {
    return $window.localStorage['friend-finder-token'];
  };

  // Method to register a new person
  auth.register = function(person) {
    return $http.post('/register', person).success(function(data) {
      auth.saveToken(data.token);
    });
  };

  // Method to update a person's details
  auth.update = function(person) {
    return $http.put('/update' + person._id).success(function(data) {
      auth.saveToken(data.token);
    });
  };

  // Method to log in an existing person
  auth.logIn = function(person) {
    return $http.post('/login', person).success(function(data) {
      auth.saveToken(data.token);
    });
  };

  // Method to log out a logged in person
  auth.logOut = function() {
    $window.localStorage.removeItem('friend-finder-token');
  };

  // Method to check a person is logged in
  auth.isLoggedIn = function() {
    var token = auth.getToken();

    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  // Method to retrieve a logged in person's username from the token's payload
  auth.currentUser = function() {
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload;
    }
  };

  return auth;
}]);


// Main controller
app.controller('MainCtrl', [
  '$scope',
  'people',
  function($scope, people) {
    $scope.people = people.people;  // Binding the scope variable to the array in the service
  }
]);

// Authentication controller
app.controller('AuthCtrl', [
  '$scope',
  '$state',
  'auth',
  function($scope, $state, auth) {

    $scope.person = {};

    // Method to register new person
    $scope.register = function() {
      auth.register($scope.person).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go('home');
      });
    };

    // Method to log in an existing person
    $scope.logIn = function() {
      auth.logIn($scope.person).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go('home');
      });
    };

  }
]);

// Navigation menu controller
app.controller('NavCtrl', [
  '$scope',
  'auth',
  function($scope, auth){
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;
}]);

// Profile page controller
app.controller('PeopleCtrl', [
  '$scope',
  'people',
  'person',
  'auth',
  function($scope, people, person, auth) {
    $scope.person = person;
    $scope.currentUser = auth.currentUser;
  }
]);

app.controller('UpdateCtrl', [
  '$scope',
  'update',
  'people',
  'person',
  'auth',
  function($scope, update, people, person, auth) {
    $scope.person = person;
    $scope.newDetails = update.newDetails;
    $scope.currentUser = auth.currentUser;
  }
]);

// Configuring the homepage state
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    // URL routing for home page
    $stateProvider.state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
        personPromise: ['people', function(people) {
          return people.getAll();
        }]
      }
    });

    // URL routing for profile page
    $stateProvider.state('people', {
      url: '/people/{id}',
      templateUrl: '/people.html',
      controller: 'PeopleCtrl',
      resolve: {
        person: ['$stateParams', 'people', function($stateParams, people) {
          return people.get($stateParams.id);
        }]
      }
    });

    // URL for routing update page
    $stateProvider.state('auth', {
      url: '/update/{id}',
      templateUrl: '/update.html',
      controller: 'AuthCtrl',
      resolve: {
        person: ['$stateParams', 'people', function($stateParams, people) {
          return people.get($stateParams.id);
        }]
      }
    });

    // Redirecting to homepage
    $urlRouterProvider.otherwise('home');
  }
]);
