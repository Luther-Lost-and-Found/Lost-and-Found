angular.module('ItemApp',['ui.bootstrap','ngMaterial']).controller('ItemCtrl', ['$timeout', '$scope', '$http',
	'$animate','$uibModal','$rootScope','sharedService','sharedServiceUploadModal',
	function($timeout, $scope, $http, $animate,$uibModal,$rootScope,sharedService,sharedServiceUploadModal) {


	var refresh = function(){
		$http.get("/itemlist").success(function(response){
			$scope.$applyAsync(function(){
				$scope.itemlist = response;
				$scope.item = "";
			});
		});
	};

	refresh();

	$scope.addItem = function(){
		sharedServiceUploadModal.setProperty($scope.item);
		$rootScope.item = {};
		var modalInstance = $uibModal.open({
	    	animation: $scope.animationsEnabled,
	    	templateUrl: 'partials/itemList/addItem.html',
	    	controller: 'itemModalInstanceCtrl',
	    	size: 'lg',
	    	resolve: {
	        	items: function () {
	          		return $scope.item;
	        	}
	    	}
	    });
	};

	$scope.deleteAll = function(){
		var foundToDelete = 0;
		for (i=0;i<$scope.itemlist.length;i++){
			if ($scope.itemlist[i].toDelete == true){
				foundToDelete++;
				var current_id = ($scope.itemlist[i].itemID); 
				$http.delete("/itemlist/?" + current_id).success(function(response){
				});
			}	
		}
		if(foundToDelete > 0){
			refresh();
		}
	}

	$scope.sortAlpha = function(){
		$http.get("/itemlist/alpha").success(function(response){
			$scope.$applyAsync(function(){
				$scope.itemlist = response;
				$scope.item = "";
			});
		});
	};

	$scope.sortLoc = function(){
		$http.get("/itemlist/location").success(function(response){
			$scope.$applyAsync(function(){
				$scope.itemlist = response;
				$scope.item = "";
			});
		});
	};

	$scope.sortDate = function(){
		$http.get("/itemlist/date").success(function(response){
			$scope.$applyAsync(function(){
				$scope.itemlist = response;
				$scope.item = "";
			});
		});
	};

	$scope.updateItem = function($element){
		var current_id = ($element.itemID);
		$http.put("/itemlist/" + current_id, $scope.item).success(function(response){
			refresh();
		});
	};

	$scope.clicked = function($element){
		var current_id = ($element.itemID);
		console.log(current_id); 
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

	$scope.$on('handleBroadcast', function() {
        	refresh();
    });

	$scope.isCollapsed = true;
	
}]).$inject = ['$scope', 'sharedServiceUpdateModal'];

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
			console.log(itemEditTags);

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
	    console.log("======================");
	    console.log("======================");
	    console.log("======================");
	    console.log($scope.item);
	    console.log("======================");
	    console.log("======================");
	    console.log("======================");

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
       
angular.module('ItemApp').controller('itemModalInstanceCtrl', 
	function ($http,$rootScope,$scope, $uibModalInstance, items,sharedService, Upload, sharedServiceUploadModal,sharedPropertiesTags) {

	var myList = [];

    function getTagsFromDatabase() {
      $http.get("/tags").success(function(response){
        for (object in response){
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

	$scope.uploadImage = function (file) {
 		if (file != null) {
	    	$scope.upload(file)
	    }
	    else{
	    	$scope.addItem();
	    }
    	$uibModalInstance.dismiss('cancel');
  	};

  	$scope.addItem = function(){

	    $scope.errorMsg = null;

	    var fullTagsRaw = $scope.selectedTags;

	    $scope.item.newTags = fullTagsRaw;

	    $http.post("/additem",$scope.item).success(function(response){

		    sharedService.refreshMain();

			$uibModalInstance.dismiss('cancel');
		});
  	};

  	$scope.upload = function(image) {

	    $scope.errorMsg = null;
	    var transferredItem = sharedServiceUploadModal.getProperty();

	    var fullTagsRaw = $scope.selectedTags;

	    $scope.item.newTags = fullTagsRaw;

	    $http.post("/additem",$scope.item).success(function(response){

			var fileExtension = '.' + image.name.split('.').pop();

		    Upload.rename(image, response.insertId.toString()+fileExtension);

		    image.upload = Upload.upload({
		      	url: 'additem/uploadImage',
		      	method: 'POST',
		      	data: {
			    	type: 'profile'
			    },
			    file: image
		    });
		    sharedService.refreshMain();

			$uibModalInstance.dismiss('cancel');
		});
	};

	$scope.getReqParams = function () {
	    return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
	    '&errorMessage=' + $scope.serverErrorMsg : '';
	};

 	$scope.cancel = function () {
    	$uibModalInstance.dismiss('cancel');
  	};

});