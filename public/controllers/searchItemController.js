angular.module('searchItemApp',[]).controller('searchItemController',
	['$timeout', '$scope', '$http', '$animate','$uibModal','$rootScope','sharedProperties',
	function($timeout, $scope, $http, $animate,$uibModal,$rootScope, sharedProperties) {

	console.log("Hello World from SEARCH controller");

	var refresh = function(){
		var current_search = sharedProperties.getProperty().title;

		$http.get("/searchItem/?"+current_search).success(function(response){
			console.log("should be good");
			console.log(response);
			$scope.$applyAsync(function(){
				$scope.searchitemlist = response;
			});
		});
	};
	refresh();
	
}]).$inject = ['$scope', 'sharedProperties'];