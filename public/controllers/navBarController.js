angular.module('navBarApp',['ui.bootstrap']).controller('NavBarCtrl', ['$timeout', '$scope', '$http', '$window','$animate','$uibModal','$rootScope','sharedService',
	function($timeout, $scope, $window, $http, $animate,$uibModal,$rootScope ) {

	console.log("Hello World from the Navigation Bar");
	var refresh = function(){
		$http.get("/itemlist").success(function(response){
			console.log('i got the data requested');
			$scope.$applyAsync(function(){
				$scope.itemlist = response;
				$scope.item = "";
			});
		});
	};

	$scope.logout = function(){
		$http.get("/signout").success(function(req,res){
			$window.location.href = "/";
		});
	}

	$scope.search = function(){
		console.log("search is activated");
		$window.location.href = "/#searchItem"
	}

	$scope.addItem = function(){
		  var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'addItemContent.html',
	      controller: 'itemModalInstanceCtrl',
	      size: 'lg',
	      resolve: {
	        items: function () {
	          	return $scope.item;
	        }
	      }
	    });
	};	
}]);

//create a service between navbar controller and itemlistcontroller trigger an event,
//$scope.editItem = function ($element) {
		

angular.module('navBarApp').controller('itemModalInstanceCtrl', function ($http,$rootScope,$scope, $uibModalInstance, items,sharedService) {

	$scope.addItem = function(){

		console.log($scope.item);
		$http.post("/additem",$scope.item).success(function(response){
			console.log("yes");
			sharedService.refreshMain();

			$uibModalInstance.dismiss('cancel');

		

		});

	}

 	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};
}).$inject = ['$scope', 'sharedService'];
       
