var app = angular.module('superAdminApp', []);

app.controller('superAdminController', ['$timeout', '$scope', '$http', '$window',
	'$animate','$rootScope',
	function($timeout, $scope, $http, $window, $animate,$rootScope) {

	console.log("Hello World from the SUPER ADMIN Controller");

	$scope.AdminUsers = ["User One","User Two","User Three","User Four"];

	$scope.test = function (func, user) {
		console.log(func+" : "+user);
	};
}]);