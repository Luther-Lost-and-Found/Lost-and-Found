var app = angular.module('guestApp',['ngMaterial']);

app.controller('guestController', function($location,$timeout, $scope, $http, $animate,$rootScope,sharedProperties,$mdDialog, $mdMedia) {

	var refresh = function(){
		$scope.description = "";
		console.log($scope.description);
		
		
	};

	$rootScope.$on('REFRESH_GUEST', function(event, args) {
	    refresh();
	});

	$scope.login = function(){
		console.log("GOODBYE GUEST");
		$location.url("/");
	}
	
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
	    	scope: $rootScope.$new()
	    })
	};
});

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown", function(e) {
            if(e.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'e': e});
                });
                e.preventDefault();
            }
        });
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
		$rootScope.$emit("REFRESH_GUEST");
	    $mdDialog.cancel();
	};
	$scope.answer = function(answer) {
	    $mdDialog.hide(answer);
	};
};