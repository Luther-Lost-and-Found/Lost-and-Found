var app = angular.module('guestApp',['ngMaterial']);

app.controller('guestController', function($timeout, $scope, $http, $animate,$rootScope,sharedProperties,$mdDialog, $mdMedia) {

	var refresh = function(){
		$http.get("/guest").success(function(response){
			$scope.$applyAsync(function(){
				$scope.itemlist = response;
				$scope.item = "";
			});
		});
	};
	
	$scope.submitGuestSearch = function(ev, $scope){

		//var current_search = ($scope.itemTitle); 
		var current_search = {title:$scope.itemTitle, description:$scope.description}
		console.log(current_search);
		$http.post("/guest", current_search).success(function(response){
			$rootScope.$applyAsync(function(){
				$rootScope.locationlist = response;
			});
		});

		//$rootScope.item = {};
		// var modalInstance = $uibModal.open({
	 //    	animation: $scope.animationsEnabled,
	 //    	templateUrl: 'guestSearchResult.html',
	 //    	controller: 'guestModalInstanceCtrl',
	 //    	size: 'lg',
	 //    	resolve: {
	 //        	items: function () {
	 //          		return $scope.item;
	 //        	}
	 //    	}
	 //    });
	 	console.log($scope);
	    $mdDialog.show({
	    	controller: guestModalInstanceCtrl,
	    	templateUrl: 'guestSearchResult.html',
	    	parent: angular.element(document.body),
	    	targetEvent: ev,
	    	clickOutsideToClose:true,
	    	scope: $rootScope
	    })
	};
});

function guestModalInstanceCtrl($http,$rootScope,$scope, sharedProperties, $mdDialog) {

	

	// $scope.submitGuestSearch = function(){


	// 	var current_search = sharedProperties.getProperty().title;
	// 	console.log($rootScope);

	// 	$http.post("/guest",$scope.locationlist).success(function(response){

	// 		$mdDialog.cancel();

	// 	});

	// }

  	$scope.hide = function() {
	    $mdDialog.hide();
	};
	$scope.cancel = function() {
	    $mdDialog.cancel();
	};
	$scope.answer = function(answer) {
	    $mdDialog.hide(answer);
	};
};