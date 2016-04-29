var app = angular.module('superAdminApp', ['ngMaterial']);

app.controller('superAdminController', ['$timeout', '$scope', '$http', '$window',
	'$animate','$rootScope', '$mdDialog', '$mdMedia', '$location',
	function($timeout, $scope, $http, $window, $animate,$rootScope, $mdDialog, $mdMedia, $location) {

	$scope.newPW = false;
	$rootScope.newUserPW = false;

	var refresh = function(){
		$http.get("/superAdminPage1").success(function(response){
			$scope.AdminUsers = response;
			for (user in $scope.AdminUsers) {
				if ($scope.AdminUsers[user].superPrivilege == 1) {
					$scope.AdminUsers[user].superPrivilege = true;
				} else {
					$scope.AdminUsers[user].superPrivilege = false;
				}
			}
		});
	}

	refresh();

    $scope.removeUser = function(ev, user) {
    var confirm = $mdDialog.confirm()
          .ok('Confirm')
          .cancel('No')
          .textContent('Are you sure you would like to DELETE USER "'+user.norsekeyID+'"?')
          .ariaLabel('remUser')
          .targetEvent(ev)
          .clickOutsideToClose(true)
          .ok('Yes, REMOVE USER')
          .cancel('Nope!');
	    $mdDialog.show(confirm).then(function() {
	      $scope.status = 'User Removed.';
	      deleteUser(user);
	    }, function() {
	      $scope.status = 'Canceled.';
	    });
	  };

	function deleteUser(user) {
		$http.delete("/deleteUser/?" + user.norsekeyID).success(function(response){
			refresh();
		});
	};

    $scope.ChangePW = function(ev, user) {
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
	    }, function() {
	      $scope.status = 'Password change canceled.';
	    });
  	};

	function resetPassword(user) {
		$http.post("/resetPassword",user).success(function(response){
			$scope.newPW = true;
			$rootScope.newUserPW = false;
			$scope.newPassword = response;
		});
	};

	$scope.grantSuper = function (ev,user) {
		$http.post("/grantSuper",user).success(function(response){
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

	$scope.addUser = function (newUser) {
		$http.post("/addUser",newUser).success(function(response){
			$rootScope.newUserPW = true;
			$rootScope.newPW = false;
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

	var findUnique = function(){
    	var locations = [];
	    $http.get("/itemlist/locationsAll").success(function(response){
	      	$scope.$applyAsync(function(){
	        	$scope.locationsAll = response;
	        	console.log(response);
	      	});
	    });
	    return locations;
  	};

  	$scope.locationsAll = findUnique();

	$scope.pickLocation = function(locationID){
	    var foundToSend = 0;
	    for (i=0;i<$rootScope.itemlist.length;i++){
	      	if ($rootScope.itemlist[i].toDelete == true){
		        foundToSend++;
		        var current_id = ($rootScope.itemlist[i].itemID);
		        $rootScope.ownLocation = ($rootScope.itemlist[i].locationID);
		        // $http.delete("/itemlist/?" + current_id).success(function(response){
		        // });
		        $http.put("/itemlist/?" + current_id, {'location': locationID}).success(function(response){
		        });
	      	} 
	    }
	    if(foundToSend > 0){
	      	refreshAfetSend($rootScope.ownLocation);
	    }
  	};
}
