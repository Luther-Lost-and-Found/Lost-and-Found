var app = angular.module('changePasswordApp', ['ngMaterial']);

app.controller('changePasswordController', ['$timeout', '$scope', '$http', '$window',
	'$animate','$rootScope', '$mdDialog', '$mdMedia', '$location',
	function($timeout, $scope, $http, $window, $animate,$rootScope, $mdDialog, $mdMedia, $location) {

	console.log("Hello World from the CHANGE PW Controller");

	$http.get("/loggedin").success(function(response){
		console.log(response);
		$scope.user = response;
	});

    $scope.ChangePW = function(oldPass, newPass1, newPass2) {
    	console.log($scope.user);
    	console.log(oldPass,newPass1,newPass2);
    	if(newPass1 == newPass2){
    		$scope.user.oldPass = oldPass;
    		$scope.user.newPass = newPass1;
    		$http.post("/changePassword",$scope.user).success(function(response){
    			
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

	$scope.goHome = function() {
		$location.url("/itemlist")
	}
}]);
