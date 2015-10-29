angular.module('searchItemApp',['ui.bootstrap']).controller('searchItemController',
	['$timeout', '$scope', '$http', '$animate','$uibModal','$rootScope','sharedProperties',
	function($timeout, $scope, $http, $animate,$uibModal,$rootScope, sharedProperties) {

	console.log("Hello World from SEARCH controller");

	var refresh = function(){
		console.log(sharedProperties.getProperty());
		$scope = sharedProperties.getProperty();

		$http.put("/searchItem",$scope).success(function(data){
			console.log("should be good");
			console.log(data);
			$scope.$applyAsync(function(){
				$scope.itemlist = data;
				$scope.item = "";
			});
		});
	};
	refresh();
	
}]).$inject = ['$scope', 'sharedProperties'];