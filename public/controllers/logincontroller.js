var loginApp = angular.module('LoginApp', []);
loginApp.controller('loginController', ['$timeout', '$scope', '$http', '$location', '$rootScope','$window', function($timeout, $scope, $http, $location, $rootScope, $window) {
	console.log("Hello World from controller");

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
	      // No error: authentication OK
	      	console.log("hooray");
	    	$rootScope.message = 'Authentication successful!';
	     	$window.location.href = "../itemList.html";
	    })
	    .error(function(){
	      // Error: authentication failed
	      	console.log("nooo");
	    	$rootScope.message = 'Authentication failed.';
	    	$location.url('/login');
	    });
  	};
}]);

