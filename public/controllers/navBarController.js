
angular.module('navBarApp',['ui.bootstrap','ngFileUpload']).controller('NavBarCtrl', ['$rootScope',
	'$timeout', '$scope', '$http', '$window','sharedProperties','sharedService',
	'$animate','$uibModal', 'sharedServiceUploadModal','sharedPropertiesTags',
	function($rootScope,$timeout, $scope, $http, $window,sharedProperties, 
		sharedService,$animate,$uibModal,sharedServiceUploadModal,sharedPropertiesTags) {

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

	var refresh = function(){
		$http.get("/itemlist").success(function(response){
			$scope.$applyAsync(function(){
				$scope.itemlist = response;
				$scope.item = "";
			});
		});
	};

  $scope.login = function(){
    $http.get("/login").success(function(req,res){
      $window.location.href = "/";
    });
  }

	$scope.logout = function(){
		$http.get("/signout").success(function(req,res){
			$window.location.href = "/";
		});
	}

	$scope.searchItem = function($scope){
		sharedProperties.setProperty($scope);
		var current_search = $scope.selectedTags;
		$http.get("/searchItem/?"+current_search).success(function(data){
			$window.location.href = "/#searchItem";
		});
	}

	$scope.addItem = function(){
		sharedServiceUploadModal.setProperty($scope.item);
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

}]);


//create a service between navbar controller and itemlistcontroller trigger an event,
//$scope.editItem = function ($element) {
		