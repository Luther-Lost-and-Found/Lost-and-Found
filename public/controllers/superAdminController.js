var app = angular.module('superAdminApp', ['ngMaterial']);

app.controller('superAdminController', ['$timeout', '$scope', '$http', '$window',
	'$animate','$rootScope', '$mdDialog', '$mdMedia',
	function($timeout, $scope, $http, $window, $animate,$rootScope, $mdDialog, $mdMedia) {

	console.log("Hello World from the SUPER ADMIN Controller");

	$scope.AdminUsers = ["User One","User Two","User Three","User Four"];



	$http.get("/superAdminPage").success(function(response){
		console.log("TRYING TO GET TO THE SUPER ADMIN PAGE");

	});
	

    $scope.deleteUser = function(ev, username) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .ok('Confirm')
          .cancel('No')
          // .title('Password Change for'+username+'?')
          .textContent('Are you sure you would like to DELETE USER "'+username+'"?')
          .ariaLabel('remUser')
          .targetEvent(ev)
          .clickOutsideToClose(true)
          .ok('Yes, REMOVE USER')
          .cancel('Nope!');
	    $mdDialog.show(confirm).then(function() {
	      $scope.status = 'User Removed.';
	      console.log("User Removed.");
	    }, function() {
	      $scope.status = 'Canceled.';
	      console.log("Canceled");
	    });
	  };


    $scope.ChangePW = function(ev, username) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .ok('Confirm')
          .cancel('No')
          // .title('Password Change for'+username+'?')
          .textContent('Are you sure you would like to change password for "'+username+'"?')
          .ariaLabel('ChangePW')
          .targetEvent(ev)
          .clickOutsideToClose(true)
          .ok('Yes, change password')
          .cancel('Nope!');
	    $mdDialog.show(confirm).then(function() {
	      $scope.status = 'Password has been changed.';
	      console.log("pw change confirmed");
	    }, function() {
	      $scope.status = 'Password change canceled.';
	      console.log("pw change cancelled");
	    });
  	};
}]);