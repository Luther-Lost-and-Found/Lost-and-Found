angular.module('navBarApp').controller('NavBarCtrl', ['$timeout', '$scope', '$http', '$window',
	function($timeout, $scope, $http, $window) {

	console.log("Hello World from the Navigation Bar");

	$scope.logout = function(){
		$http.get("/signout").success(function(req,res){
			$window.location.href = "/";
		});
	}

	$scope.search = function(){
		console.log("search is activated");
		$window.location.href = "/#searchItem"
	}

}]);