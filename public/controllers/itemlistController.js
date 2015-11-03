angular.module('ItemApp',['ui.bootstrap']).controller('ItemCtrl', ['$timeout', '$scope', '$http',
	'$animate','$uibModal','$rootScope','sharedService',
	function($timeout, $scope, $http, $animate,$uibModal,sharedService,$rootScope) {

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

	};

	$scope.updateItem = function($element){
		console.log($scope.item);
		var current_id = ($element.itemID);
		$http.put("/itemlist/" + current_id, $scope.item).success(function(response){
			console.log("UPDATE");
			refresh();
		});
	};

	$scope.showDetails = function ($element) {
	    if ($scope.active != $element.title) {
	    	$scope.active = $element.title;
	    }
	    else {
	    	$scope.active = null;
	    }
	};

	$scope.$on('handleBroadcast', function() {
        	refresh();
    });

	$scope.isCollapsed = true;

	$scope.editItem = function ($element) {
		var current_id = ($element.itemID); 
		console.log(current_id);
		$http.get("/itemlist/" + current_id).success(function(response){
			console.log("got the data to edit");
			$rootScope.$applyAsync(function(){
				$rootScope.item = response[0];
			});
		});

	    var modalInstance = $uibModal.open({
	      animation: $scope.animationsEnabled,
	      templateUrl: 'myModalContent.html',
	      controller: 'ModalInstanceCtrl',
	      size: 'lg',
	      resolve: {
	        items: function () {
	          	return $scope.item;
	        }
	      }
	    });

	    modalInstance.result.then(function ($rootScope) {
	      $rootScope.selected = selectedItem;
	    });

	    $scope.$on('handleBroadcast', function() {
        	refresh();
    	});
	};	
}]).$inject = ['$scope', 'sharedService'];

angular.module('ItemApp').controller('ModalInstanceCtrl', function ($http,$rootScope,$scope, $uibModalInstance, items) {
	console.log(items);
	$rootScope.item = items;
	$scope.selected = {
	    item: $rootScope.item[0]
	};

  	$scope.updateItem = function($element){
		var current_id = $rootScope.item.itemID;
		console.log(current_id);
		$http.put("/itemlist/" + current_id, $scope.item).success(function(response){
			console.log("UPDATE");
			$rootScope.$broadcast('handleBroadcast');
			$uibModalInstance.dismiss('cancel');
		});
	};

 	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};
}).$inject = ['$scope', 'sharedService'];
       
