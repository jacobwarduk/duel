var app = angular.module('duelApp', ['ui.router']);

// Service for people
app.factory('people', [function() {
  var o = {
    people: []
  };
  return o;
}]);

// Main controller
app.controller('MainCtrl', [
  '$scope',
  function($scope, people) {

    $scope.people = people.people;  // Binding the scope variable to the array in the service


    $scope.addPerson = function() {
      // Checking all values are present
      if (!$scope.username || $scope.username === '' || !$scope.password || $scope.password === '' || !$scope.email || $scope.email === '' || !$scope.fullname || $scope.fullname ==='' ) {
        return;
      }
      // Adding a new person to the people array
      $scope.people.push({
        username: $scope.username,
        password: $scope.password,
        email: $scope.email,
        fullname: $scope.fullname
      });
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
      controller: 'MainCtrl'
    });

    $urlRouterProvider.otherwise('home');
  }
]);
