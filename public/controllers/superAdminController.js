var app = angular.module('superAdminApp', []);

app.controller('superAdminController', ['$timeout', '$scope', '$http', '$window',
	'$animate','$rootScope',
	function($timeout, $scope, $http, $window, $animate,$rootScope) {

	console.log("Hello World from the SUPER ADMIN Controller");

	var refresh = function(){
		$http.get("/superAdminPage").success(function(response){
			console.log("TRYING TO GET TO THE SUPER ADMIN PAGE", response);
			$scope.AdminUsers = response;
		});
	}

	refresh();

	$scope.test = function (func, user) {
		console.log(func+" : "+user);
	};

	$scope.resetPassword = function (user) {
		console.log(user);
		$http.post("/resetPassword",user).success(function(response){
			console.log("RESETTING PASSWORD", response);
			$scope.newPassword = response;
		});
	};

	$scope.grantSuper = function (user) {
		console.log(user);
		$http.post("/grantSuper",user).success(function(response){
			console.log("GRANTED SUPER", response);
		});
	};

	$scope.deleteUser = function (user) {
		console.log(user);
		$http.delete("/deleteUser/?" + user.norsekeyID).success(function(response){
			console.log("DELETING USER", response);
			refresh();
		});
	};

	$scope.addUser = function (newUser) {
		console.log(user);
		$http.post("/addUser",newUser).success(function(response){
			console.log("CREATED NEW USER", response);
		});
	};
}]);