var app = angular.module('superAdminApp', []);

app.controller('superAdminController', ['$timeout', '$scope', '$http', '$window',
	'$animate','$rootScope',
	function($timeout, $scope, $http, $window, $animate,$rootScope) {

	console.log("Hello World from the SUPER ADMIN Controller");

	$http.get("/superAdminPage").success(function(response){
		console.log("TRYING TO GET TO THE SUPER ADMIN PAGE", response);
		$scope.AdminUsers = response;
	});

	$scope.test = function (func, user) {
		console.log(func+" : "+user);
	};
}]);