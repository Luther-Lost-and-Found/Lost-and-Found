var loginApp = angular.module('LoginApp', []);
loginApp.controller('loginController', ['$timeout', '$scope', '$http', '$window', function($timeout, $scope, $http, $window) {
	console.log("Hello World from controller");


	$scope.loginSubmit = function($scope){
		var login_username = $scope.username;
		
		$http.post("/login",{login_username}).success(function(response){
			console.log("success");
			$window.location.href = "../itemList.html";
		});
	}
}]);

