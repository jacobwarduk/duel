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
