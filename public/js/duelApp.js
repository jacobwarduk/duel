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

  return o;
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
    return $http.opst('/register', person).success(function(data) {
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

      return payload.username;
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


    $scope.addPerson = function() {
      // Checking all values are present
      // if (!$scope.username || $scope.username === '' || !$scope.password || $scope.password === '' || !$scope.email || $scope.email === '' || !$scope.firstName || $scope.firstName ==='' || !$scope.lastName || $scope.lastName ==='') {
      //   return;
      // }
      // // Adding a new person to the people array
      // $scope.people.push({
      //   username: $scope.username,
      //   password: $scope.password,
      //   email: $scope.email,
      //   firstName: $scope.firstName,
      //   lastName: $scope.lastName
      // });
    }
  }
]);

// Configuring the homepage state
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
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

    $urlRouterProvider.otherwise('home');
  }
]);
