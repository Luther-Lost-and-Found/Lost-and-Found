var loginApp = angular.module('LoginApp', []);
loginApp.controller('loginController', ['$timeout', '$scope', '$http', '$location', '$rootScope','$window', function($timeout, $scope, $http, $location, $rootScope, $window) {

// $scope.loginSubmit = function($scope){
// 		var login_username = $scope.username;
		
// 		$http.post("/login",{login_username}).success(function(response){
// 			console.log("success");
// 			$window.location.href = "../itemList.html";
// 		});
// 	}


  // Register the login() function
  	$scope.loginSubmit = function($scope){
    	$http.post('/login', {
	      	username: $scope.username,
	      	password: $scope.password,
	    })
	    .success(function(user){
	    	console.log("cool");
	     	$window.location.href = "itemList.html";
	    })
	    .error(function(){
	    	$rootScope.message = 'Authentication failed.';
	    	$window.location.href = "../login/login.html";
	    });
  	};
}]);

