angular.module('guestApp',['ui.bootstrap']).controller('guestController', ['$timeout', '$scope', '$http',
	'$animate','$uibModal','$rootScope',
	function($timeout, $scope, $http, $animate,$uibModal,$rootScope) {

	console.log("Hello World from controller");

	var refresh = function(){
		$http.get("/itemlist").success(function(response){
			console.log('i got the data requested');
			console.log(response);
			$scope.$applyAsync(function(){
				$scope.itemlist = response;
				$scope.item = "";
			});
		});
	};

	$scope.submitGuestSearch = function($scope){
		console.log($scope);

	};
}]);