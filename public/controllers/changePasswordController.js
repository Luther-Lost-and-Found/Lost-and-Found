var app = angular.module('changePasswordApp', ['ngMaterial']);

app.controller('changePasswordController', ['$timeout', '$scope', '$http', '$window',
	'$animate','$rootScope', '$mdDialog', '$mdMedia', '$location',
	function($timeout, $scope, $http, $window, $animate,$rootScope, $mdDialog, $mdMedia, $location) {

	$http.get("/loggedin").success(function(response){
		$scope.user = response;
	});

	if ($(window).width() < 400 ) {
		$scope.mobile = true;
	} else {
		$scope.mobile = false;
	}

	console.log($scope.mobile);

    $scope.ChangePW = function(oldPass, newPass1, newPass2) {
    	if(newPass1 == newPass2){
    		$scope.user.oldPass = oldPass;
    		$scope.user.newPass = newPass1;
    		$http.post("/changePassword",$scope.user).success(function(response){
			    $http.get("/signout").success(function(req,res){
			      $location.url("/");
			    });
			})
			.error(function(err){
			});
    	}
    	else{
    	}
  	};

	$scope.goHome = function() {
		var url = "/itemlist";
	    $http.get("/loginMobile").success(function(response){
	    	console.log("GO HOME");
	        if(response.mobile){
	        	console.log("HOME BUTTON TEST", response)
	          	url = '/mobile/itemlist';
	          	$location.url(url);
	        }
	        else{
	        	$location.url(url);
	        }
	    });
	}
}]);
