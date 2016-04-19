var app = angular.module('changePasswordApp', ['ngMaterial']);

app.controller('changePasswordController', ['$timeout', '$scope', '$http', '$window',
	'$animate','$rootScope', '$mdDialog', '$mdMedia',
	function($timeout, $scope, $http, $window, $animate,$rootScope, $mdDialog, $mdMedia) {

	console.log("Hello World from the CHANGE PW Controller");

	$scope.test = function() {
		alert("test");
	}

    $scope.ChangePW = function(user,oldPass, newPass1, newPass2) {
    	if(newPass1 == newPass2){
    		user.oldPass = oldPass;
    		user.newPass = newPass;
    		$http.post("/changePassword",user).success(function(response){
    			
				console.log("CHANGING PASSWORD", response);
			    $http.get("/signout").success(function(req,res){
			      $location.url("/");
			    });
			})
			.error(function(err){
				console.log("sorry no can do. probably old password did not match");
			});
    	}
    	else{
    		console.log("sorry, passwords do not match");
    	}
  	};

	function resetPassword(user) {
		console.log(user);
		$http.post("/changePassword",user).success(function(response){
			console.log("CHANGING PASSWORD", response);
			$scope.newPassword = response;
		});
	};
}]);
