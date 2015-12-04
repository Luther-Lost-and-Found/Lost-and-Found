angular.module('guestApp',['ui.bootstrap']).controller('guestController', ['$timeout', '$scope', '$http',
	'$animate','sharedProperties','$uibModal','$rootScope',
	function($timeout, $scope, $http, $animate, sharedProperties, $uibModal, $rootScope) {

	var refresh = function(){
		$http.get("/guest").success(function(response){
			$scope.$applyAsync(function(){
				$scope.itemlist = response;
				$scope.item = "";
			});
		});
	};
	
	$scope.submitGuestSearch = function($scope){

		//var current_search = ($scope.itemTitle); 
		var current_search = {title:$scope.itemTitle, description:$scope.description}
		$http.post("/guest", current_search).success(function(response){
			$rootScope.$applyAsync(function(){
				$rootScope.locationlist = response;
			});
		});

		//$rootScope.item = {};
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

angular.module('guestApp').controller('guestModalInstanceCtrl', function ($http,$rootScope,$scope, $uibModalInstance, items, sharedProperties) {

	$scope.submitGuestSearch = function(){

		var current_search = sharedProperties.getProperty().title;

		$http.post("/guest",$scope.locationlist).success(function(response){

			
			//sharedService.refreshMain();

			$uibModalInstance.dismiss('cancel');

		});

	}

 	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};
});