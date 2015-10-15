var loginApp = angular.module('LoginApp', []);
loginApp.controller('loginController', ['$timeout', '$scope', '$http', function($timeout, $scope, $http) {
	console.log("Hello World from controller");


	$scope.loginSubmit = function(){
		console.log($scope.username);
		$scope.username = "hello";
		$http.post("/login",$scope.username).success(function(response){
			console.log("success");
		});
	}
}]);

