var myApp = angular.module('LostApp', []);
myApp.controller('ItemCtrl', ['$timeout', '$scope', '$http', function($timeout, $scope, $http) {
  console.log("Hello World from logincontroller");

  $scope.loginSubmit = function(){
    console.log($scope.login);
    $http.post("/login",$scope.login).success(function(response){
      refresh();
    });

  }