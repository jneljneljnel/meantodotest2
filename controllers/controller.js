var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/tododb').success(function(response) {
    console.log("got the data");
    $scope.tododb = response;
    $scope.todo = "";
  });
};

refresh();

$scope.addTodo = function() {
  console.log($scope.todo);
  $http.post('/tododb', $scope.todo).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/tododb/' + id).success(function(response) {
    refresh();
  });
};


}]);﻿