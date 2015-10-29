angular.module('navBarApp').controller('NavBarCtrl', ['$rootScope','$timeout', '$scope', '$http', '$window','sharedProperties',
	function($rootScope,$timeout, $scope, $http, $window,sharedProperties) {

	console.log("Hello World from the Navigation Bar");

	$scope.logout = function(){
		$http.get("/signout").success(function(req,res){
			$window.location.href = "/";
		});
	}

	$scope.searchItem = function($scope){
		console.log("search is activated");
		sharedProperties.setProperty($scope);
		console.log(sharedProperties.getProperty());
		$http.put("/searchItem",$scope).success(function(data){
			console.log(data);
			console.log("exiting the navbarcontroller")
			$window.location.href = "/#searchItem";
		});
	}

}]).$inject = ['$scope', 'sharedProperties'];