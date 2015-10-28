angular.module('ItemApp').controller('ItemCtrl', ['$timeout', '$scope', '$http',
	function($timeout, $scope, $http) {

	console.log("Hello World from controller");

	var refresh = function(){
		$http.get("/itemlist").success(function(response){
			console.log('i got the data requested');
			$scope.$applyAsync(function(){
				$scope.itemlist = response;
				$scope.item = "";
			});
		});
	};

	refresh();

	$scope.removeItem = function($scope,$element){
		var current_id = ($scope.itemID); 
		console.log(current_id);
		$http.delete("/itemlist/?" + current_id).success(function(response){
			refresh();
		});

	}

	$scope.editItem = function($element){
		var current_id = ($element.itemID); 
		console.log(current_id);
		$http.get("/itemlist/" + current_id).success(function(response){
			console.log("got the data to edit");
			$scope.$applyAsync(function(){
				$scope.item = response[0];
			});
			
		});
		
	}

	$scope.updateItem = function($element){
		console.log($scope.item);
		var current_id = ($element.itemID);
		$http.put("/itemlist/" + current_id, $scope.item).success(function(response){
			console.log("UPDATE");
			refresh();
		});
		
	}
}]);
