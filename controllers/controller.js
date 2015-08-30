var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {



var refresh = function() {
  $http.get('/tododb').success(function(response) {
    $scope.tododb = response;
    $scope.todo = "";
  });
};

refresh();

$scope.addTodo = function() {
  $http.post('/tododb', $scope.todo).success(function(response) {
 
    refresh();
  });
};

$scope.remove = function(id) {
  $http.delete('/tododb/' + id).success(function(response) {
    refresh();
  });
};


}]);﻿