angular.module('ItemApp',['ui.bootstrap','ngMaterial']).controller('ItemCtrl', ['$timeout', '$scope', '$http',
	'$animate','$uibModal','$rootScope','sharedService',
	function($timeout, $scope, $http, $animate,$uibModal,$rootScope,sharedService) {

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

	refresh();

	// $scope.topDirections = ['left', 'up'];
	// $scope.bottomDirections = ['down', 'right'];
	$scope.isOpen = false;
	//$scope.availableModes = ['md-fling', 'md-scale'];
	$scope.selectedMode = 'md-scale';
	//$scope.availableDirections = ['up', 'down', 'left', 'right'];
	$scope.selectedDirection = 'down';


	$scope.sort = function(sortMethod){
	};

	$scope.updateItem = function($element){
		var current_id = ($element.itemID);
		$http.put("/itemlist/" + current_id, $scope.item).success(function(response){
			console.log("UPDATE");
			refresh();
		});
	};

	$scope.clicked = function($element){
		var current_id = ($element.itemID); 
		console.log($element);
		$http.get("/itemlist/" + current_id).success(function(response){
			console.log("got the data to edit");
			var itemTags = [];
			for(i=0;i<response.length;i++){
				itemTags.push(response[i].tag);
			}
			console.log("HERE IS THE ITEMTAGSLIST");
			$rootScope.itemTags = itemTags;
			console.log($rootScope.itemTags);
			$rootScope.$applyAsync(function(){
				$rootScope.item = response[0];
			});
		});

	    var modalInstance = $uibModal.open({
		    animation: $scope.animationsEnabled,
		    templateUrl: 'myModalContent.html',
		    controller: 'ModalInstanceCtrl',
		    size: 'md',
		    resolve: {
		        items: function () {
		          	return $scope.item;
		        }
	      	}
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
	
}]).$inject = ['$scope', 'sharedServiceUpdateModal'];

angular.module('ItemApp').controller('ModalInstanceCtrl', function ($http,$rootScope,$scope, $uibModalInstance,$uibModal, items, sharedPropertiesTags) {
	console.log("In TagsController from ItemListController");
	console.log(items);
	$rootScope.item = items;
	$scope.selected = {
	    item: $rootScope.item[0]
	};

	$scope.editItem = function ($element) {
		var current_id = ($element.itemID); 
		console.log($element);
		$http.get("/itemlist/" + current_id).success(function(response){

			$rootScope.$applyAsync(function(){
				$rootScope.item = response[0];
			});
		});

		var modalInstance = $uibModal.open({
		    animation: $scope.animationsEnabled,
		    templateUrl: 'myModalContentEdit.html',
		    controller: 'ModalInstanceCtrl',
		    size: 'md',
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

  	$scope.updateItem = function($element){
		var current_id = $rootScope.item.itemID;
		console.log(current_id);
		$http.put("/itemlist/" + current_id, $scope.item).success(function(response){
			console.log("UPDATE");
			$rootScope.$broadcast('handleBroadcast');
			$uibModalInstance.dismiss('cancel');
		});
	};

	$scope.removeItem = function($scope,$element){
		var current_id = ($scope.itemID); 
		console.log(current_id);
		$http.delete("/itemlist/?" + current_id).success(function(response){
			$rootScope.$broadcast('handleBroadcast');
			$uibModalInstance.dismiss('cancel');
		});
	};

 	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};


  	var myList = [];

    function getTagsFromDatabase() {
      $http.get("/tags").success(function(response){
        console.log("tags request received.");
        for (object in response){
          // myList.push({'name': response[object].tag});
          myList.push({'name': response[object].tag});
        }
        sharedPropertiesTags.setProperty(myList);
        $scope.allTags = loadTags(myList);

      });
    };

    getTagsFromDatabase();

    //console.log(sharedPropertiesTags.getProperty());

    $scope.readonly = false;
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.querySearch = querySearch;
    $scope.selectedTags = [];
    $scope.numberBuffer = '';
    $scope.autocompleteDemoRequireMatch = true;
    $scope.transformChip = transformChip;
    $scope.myTags = [];

    /* Return the proper object when the append is called. */
    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }
      // Otherwise, create a new one
      return {tagname: chip};
      // return {name: chip,type='color'};
    }
    /* Search for tags. */
    function querySearch(query) {
      var results = query ? $scope.allTags.filter(createFilterFor(query)) : [];
      return results;
    }
    /* Create filter function for a query string */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(tag) {
        return (tag.lowername.indexOf(lowercaseQuery) === 0)
      };
    }
    function loadTags(tagsList) {
      var tags = tagsList;
      return tags.map(function (tag) {
        tag.lowername = tag.name.toLowerCase();
        return tag;
      });
    }



}).$inject = ['$scope', 'sharedServiceUpdateModal'];
       
