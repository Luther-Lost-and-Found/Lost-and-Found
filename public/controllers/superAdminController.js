var app = angular.module('superAdminApp', ['ngMaterial']);

app.controller('superAdminController', ['$timeout', '$scope', '$http', '$window',
	'$animate','$rootScope', '$mdDialog', '$mdMedia', '$location',
	function($timeout, $scope, $http, $window, $animate,$rootScope, $mdDialog, $mdMedia, $location) {

	$scope.newPW = false;
	$scope.newUserPW = false;


	console.log("Hello World from the SUPER ADMIN Controller");

	var refresh = function(){
		$http.get("/superAdminPage1").success(function(response){
			$scope.AdminUsers = response;
			for (user in $scope.AdminUsers) {
				if ($scope.AdminUsers[user].superPrivilege == 1) {
					// console.log("PRIVVVVV:",$scope.AdminUsers[user].superPrivilege);
					$scope.AdminUsers[user].superPrivilege = true;
				} else {
					$scope.AdminUsers[user].superPrivilege = false;
				}
			}
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
			$scope.newPW = true;
			$scope.newPassword = response;
		});
	};

	$scope.grantSuper = function (ev,user) {
		console.log(user);
		$http.post("/grantSuper",user).success(function(response){
			console.log("GRANTED SUPER", response);
		});
	};

	$scope.AddUSER = function(ev) {
    	$mdDialog.show({
	      	controller: addUserController,
	      	templateUrl: '/partials/superAdmin/addUser.html',
	      	parent: angular.element(document.body),
	      	targetEvent: ev,
	      	clickOutsideToClose:true,
	      	scope: $rootScope.$new()
	    })
  	};

	$scope.changeMyPassword = function(){
		$location.url("/changePassword");
	}

  	$scope.$on('broadcastFromAddUser', function() {
	    refresh();
	});
}]);

function addUserController($scope, $rootScope, $http, $mdDialog) {
	console.log("hello controller")

	$scope.addUser = function (newUser) {
		console.log(newUser);
		$http.post("/addUser",newUser).success(function(response){
			console.log("CREATED NEW USER", response);
			$scope.newUserPW = true;
			$rootScope.newUserPassword = response;
			$rootScope.$broadcast('broadcastFromAddUser');
			$scope.cancel();
		});
	};

	$scope.hide = function() {
	    $mdDialog.hide();
	};
	$scope.cancel = function() {
		$mdDialog.cancel();
	};
	$scope.answer = function(answer) {
    	$mdDialog.hide(answer);
	};

}
