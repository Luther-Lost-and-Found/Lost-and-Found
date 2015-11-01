angular.module('LoginApp').controller('loginController',['$timeout', '$scope', '$http', '$location',
 '$rootScope','$window', function($timeout, $scope, $http, $location, $rootScope, $window) {

	

	// Register the login() function
  	$scope.loginSubmit = function($scope){
    	$http.post('/login', {
	      	username: $scope.username,
	      	password: $scope.password,
	    })
	    .success(function(user){
	     	$window.location.href = "/#itemlist";
	    })
	    .error(function(){
	    	$rootScope.message = 'Authentication failed.';
	    	$window.location.href = "/";
	    });
  	};
}]);