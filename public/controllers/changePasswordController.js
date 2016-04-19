var app = angular.module('superAdminApp', ['ngMaterial']);

app.controller('changePasswordController', ['$timeout', '$scope', '$http', '$window',
	'$animate','$rootScope', '$mdDialog', '$mdMedia',
	function($timeout, $scope, $http, $window, $animate,$rootScope, $mdDialog, $mdMedia) {

	console.log("Hello World from the CHANGE PW Controller");

	var refresh = function(){
		$http.get("/changePasswordPage").success(function(response){
			$scope.AdminUsers = response;
			for (user in $scope.AdminUsers) {
				if ($scope.AdminUsers[user].superPrivilege == 1) {
					console.log($scope.AdminUsers[user].superPrivilege);
					$scope.AdminUsers[user].superPrivilege = true;
				} else {
					$scope.AdminUsers[user].superPrivilege = false;
				}
			}
		});
	}

	refresh();

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
}
