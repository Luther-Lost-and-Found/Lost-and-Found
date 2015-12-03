
angular.module('navBarApp',['ui.bootstrap','ngFileUpload']).controller('NavBarCtrl', ['$rootScope',
	'$timeout', '$scope', '$http', '$window','sharedProperties','sharedService',
	'$animate','$uibModal',
	function($rootScope,$timeout, $scope, $http, $window,sharedProperties, 
		sharedService,$animate,$uibModal) {

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

	$scope.searchItem = function($scope){
		console.log("search is activated");
		sharedProperties.setProperty($scope);
		console.log(sharedProperties.getProperty());
		var current_search = $scope.title;
		$http.get("/searchItem/?"+current_search).success(function(data){
			console.log(data);
			console.log("exiting the navbarcontroller")
			$window.location.href = "/#searchItem";
		});
	}

	$scope.addItem = function(){
		$rootScope.item = {};
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
		

angular.module('navBarApp').controller('itemModalInstanceCtrl', 
	function ($http,$rootScope,$scope, $uibModalInstance, items,sharedService,sharedPropertiesTags) {

	var myList = [];

    function getTagsFromDatabase() {
      $http.get("/tags").success(function(response){
        console.log("tags request received.");
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
 		if (file == null) {
	    	$scope.upload()
	    }
    	$uibModalInstance.dismiss('cancel');
  	};

  	$scope.upload = function() {

  		console.log($scope.selectedTags);

	    $scope.errorMsg = null;

	    var fullTagsRaw = $scope.selectedTags;

	    console.log(fullTagsRaw);

	    $scope.item.newTags = fullTagsRaw;

	    $http.post("/additem",$scope.item).success(function(response){

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