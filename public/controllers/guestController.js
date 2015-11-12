angular.module('guestApp',['ui.bootstrap']).controller('guestController', ['$timeout', '$scope', '$http',
	'$animate','sharedProperties','$uibModal','$rootScope',
	function($timeout, $scope, $http, $animate, sharedProperties, $uibModal, $rootScope) {

	console.log("Hello World from controller");

	var refresh = function(){
		$http.get("/guest").success(function(response){
			console.log('i got the data requested');
			console.log(response);
			$scope.$applyAsync(function(){
				$scope.itemlist = response;
				$scope.item = "";
			});
		});
	};

	$scope.submitGuestSearch = function($scope){

		$rootScope.item = {};
		console.log()
		var modalInstance = $uibModal.open({
	    	animation: $scope.animationsEnabled,
	    	templateUrl: 'guestSearchResult.html',
	    	controller: 'guestModalInstanceCtrl',
	    	size: 'lg',
	    	resolve: {
	        	items: function () {
	          		return $scope.item;
	        	}
	    	}
	    });
	};
}]);

angular.module('guestApp').controller('guestModalInstanceCtrl', function ($http,$rootScope,$scope, $uibModalInstance, items,sharedService, sharedProperties) {

	$scope.submitGuestSearch = function(){

		var current_search = sharedProperties.getProperty().title;

		$http.get("/guest/?"+current_search).success(function(response){
			console.log("should be good");
			console.log(response);
			$scope.$applyAsync(function(){
				$scope.locationlist = response;
			});

			sharedService.refreshMain();
			$uibModalInstance.dismiss('cancel');
		});

		console.log($scope.locationlist);
		/*$http.post("/guest",$scope.locationlist).success(function(response){
			console.log("yes");

			
			sharedService.refreshMain();

			$uibModalInstance.dismiss('cancel');

		});*/

	}

 	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};
});