var app = angular.module('superAdminApp', ['ngMaterial']);

app.controller('superAdminController', ['$timeout', '$scope', '$http', '$window',
	'$animate','$rootScope', '$mdDialog', '$mdMedia',
	function($timeout, $scope, $http, $window, $animate,$rootScope, $mdDialog, $mdMedia) {

	console.log("Hello World from the SUPER ADMIN Controller");

	var refresh = function(){
		$http.get("/superAdminPage").success(function(response){
			console.log(response);
			$scope.AdminUsers = response;
		});
	}

	refresh();

    $scope.removeUser = function(ev, user) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .ok('Confirm')
          .cancel('No')
          // .title('Password Change for'+username+'?')
          .textContent('Are you sure you would like to DELETE USER "'+user.norsekeyID+'"?')
          .ariaLabel('remUser')
          .targetEvent(ev)
          .clickOutsideToClose(true)
          .ok('Yes, REMOVE USER')
          .cancel('Nope!');
	    $mdDialog.show(confirm).then(function() {
	      $scope.status = 'User Removed.';
	      deleteUser(user);
	      console.log("User Removed.");
	    }, function() {
	      $scope.status = 'Canceled.';
	      console.log("Canceled");
	    });
	  };

	function deleteUser(user) {
		console.log(user);
		$http.delete("/deleteUser/?" + user.norsekeyID).success(function(response){
			console.log("DELETING USER", response);
			refresh();
		});
	};

    $scope.ChangePW = function(ev, user) {
    // Appending dialog to document.body to cover sidenav in docs app
    console.log(user);
    var confirm = $mdDialog.confirm()
          .ok('Confirm')
          .cancel('No')
          // .title('Password Change for'+username+'?')
          .textContent('Are you sure you would like to change password for "'+user.norsekeyID+'"?')
          .ariaLabel('ChangePW')
          .targetEvent(ev)
          .clickOutsideToClose(true)
          .ok('Yes, change password')
          .cancel('Nope!');
	    $mdDialog.show(confirm).then(function() {
	      $scope.status = 'Password has been changed.';
	      resetPassword(user);
	      console.log("pw change confirmed");
	    }, function() {
	      $scope.status = 'Password change canceled.';
	      console.log("pw change cancelled");
	    });
  	};

	function resetPassword(user) {
		console.log(user);
		$http.post("/resetPassword",user).success(function(response){
			console.log("RESETTING PASSWORD", response);
			$scope.newPassword = response;
		});
	};

	$scope.grantSuper = function (user) {
		console.log(user);
		$http.post("/grantSuper",user).success(function(response){
			console.log("GRANTED SUPER", response);
		});
	};

	$scope.addUser = function (newUser) {
		console.log(user);
		$http.post("/addUser",newUser).success(function(response){
			console.log("CREATED NEW USER", response);
		});
	};
}]);