angular.module('addItemApp').controller('addItemCtrl', ['$timeout', '$scope', '$http', '$window',
	function($timeout, $scope, $http, $window) {

	console.log("Hello World from the Navigation Bar");

	$scope.addItem = function(){

		console.log($scope.item);
		$http.post("/additem",$scope.item).success(function(response){
			console.log("added successfully");
		});

	}
}]);