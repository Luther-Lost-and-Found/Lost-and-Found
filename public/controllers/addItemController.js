angular.module('addItemApp').controller('addItemCtrl', ['$timeout', '$scope', '$http', '$window',
	function($timeout, $scope, $http, $window) {

	console.log("Hello World from the Navigation Bar");

	$scope.addItem = function(){

		var refresh = function(){
	        $http.get("/itemlist").success(function(response){
	            console.log('i got the data requested');
	            $scope.$applyAsync(function(){
	                $scope.itemlist = response;
	                $scope.item = "";
	            });
	        });
	    };

		console.log($scope.item);
		$http.post("/additem",$scope.item).success(function(response){
			refresh();
		});

	}
}]);