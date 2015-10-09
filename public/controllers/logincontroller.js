var myApp = angular.module('LostApp', []);
myApp.controller('loginController', ['$timeout', '$scope', '$http', function($timeout, $scope, $http) {
  console.log("Hello World from logincontroller");

  $scope.loginSubmit = function($scope){
    console.log($scope.username);
    $http.post("/login",$scope.username).success(function(response){
      refresh();
    });

  }