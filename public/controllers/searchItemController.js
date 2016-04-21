angular.module('searchItemApp',[]).controller('searchItemController',
	['$timeout', '$scope', '$http', '$animate','$uibModal','$rootScope','sharedProperties',
	function($timeout, $scope, $http, $animate,$uibModal,$rootScope, sharedProperties) {

	$scope.clicked = function($element){
		var current_id = ($element.itemID);
		$http.get("/itemlist/" + current_id).success(function(response){
			var itemTags = [];
			for(i=0;i<response.length;i++){
				itemTags.push(response[i].tag);
			}
			$rootScope.itemTags = itemTags;

			if(response[0].claimed == 0){
				response[0].claimed = false;
			}
			else{
				response[0].claimed = true;
			}

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
	
}]).$inject = ['$scope', 'sharedProperties'];

angular.module('ItemApp').controller('ModalInstanceCtrl', function ($http,$rootScope,$scope, $uibModalInstance,$uibModal, items, sharedPropertiesTags) {

	$rootScope.item = items;
	$scope.selected = {
	    item: $rootScope.item[0]
	};

	var itemEditTags = [];

	$scope.editItem = function ($element) {
		var current_id = ($element.itemID); 
		$http.get("/itemlist/" + current_id).success(function(response){

			
			for(i=0;i<response.length;i++){
				itemEditTags.push({'name':response[i].tag});
			}

    		$rootScope.selectedTags = itemEditTags;

			if(response[0].claimed == 0){
				response[0].claimed = false;
			}
			else{
				response[0].claimed = true;
			}

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
	};

  	$scope.updateItem = function($element){
		var current_id = $rootScope.item.itemID;
		var fullTagsRaw = $rootScope.selectedTags;
	    $scope.item.newTags = fullTagsRaw;

		$http.put("/itemlist/" + current_id, $scope.item).success(function(response){
			$rootScope.$broadcast('handleBroadcast');
			$uibModalInstance.dismiss('cancel');
		});
	};

	$scope.removeItem = function($scope,$element){
		var current_id = ($scope.itemID); 
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
        for (object in response){
          // myList.push({'name': response[object].tag});
          myList.push({'name': response[object].tag});
        }
        sharedPropertiesTags.setProperty(myList);
        $scope.allTags = loadTags(myList);

      });
    };

    getTagsFromDatabase();


    $scope.readonly = false;
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.querySearch = querySearch;
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