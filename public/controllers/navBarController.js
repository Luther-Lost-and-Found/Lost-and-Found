var app = angular.module('navBarApp',['ngMaterial','ngFileUpload']);

app.controller('NavBarCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog', 'sharedProperties','sharedService',
  '$animate', 'sharedServiceUploadModal','sharedPropertiesTags','$filter',
  function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog, sharedProperties,
    sharedService,$animate,sharedServiceUploadModal,sharedPropertiesTags,$filter) {

  getTagsFromDatabase();

  // var finalItems = [];


    $scope.toggleRight = buildToggler('right');
    $scope.onSearch = function(searchValue) {
      $scope.search = searchValue;
      $rootScope.search = $scope.search;

    };
    // $scope.onSearch = function(searchValue) {
    //   $scope.search = searchValue;
    //   $rootScope.search = $scope.search;
    //   var searchList = $scope.search.split(" ");
    //   var newItems;
      
    //   for (var i = 0; i < searchList.length; i++) {
    //     newItems = $filter('filter')($rootScope.allItems, searchList[i]);
    //     for (var x = 0; x < newItems.length; x++) {
    //       if(finalItems.length == 0){
    //         finalItems.push({
    //             item:newItems[x],
    //             matches: 0
    //           });
    //       }
    //       else{
    //         console.log("NEW ITEM",newItems[x])

    //         for (var y = 0; y < finalItems.length; y++) {
    //           console.log("EXPR: ", newItems[x]==finalItems[y].item)
    //           console.log("INSIDE")
    //           if(newItems[x] == finalItems[y].item){
    //             finalItems.matches = finalItems.matches+1;
    //           }
    //           else{
    //             console.log("HELLO FROM ELSE")
    //             // finalItems.push({
    //             //   item:newItems[x],
    //             //   matches: 0
    //             // });
    //           }
    //         }
    //       }
          
    //     }
    //   }

      // for (var i = 0; i < searchList.length; i++) {
      //   newItems = $filter('filter')($rootScope.allItems, searchList[i]);
      //   if(finalItems.length > 0){
      //     for (var x = 0; x < newItems.length; x++) {
      //     // if(finalItems.length > 0){}
      //       for (var y = 0; y < finalItems.length; y++) {
      //         if(newItems[x] == finalItems[y].item){
      //           finalItems[y].matches = finalItems[y].matches+1;
      //         }
      //         else{
      //           finalItems.push({
      //             item:newItems[x],
      //             matches: 0
      //           });
      //         }
      //       }
      //     } 
      //   }
      //   else{
      //     console.log("HO");
      //     for (var x = 0; x < newItems.length; x++) {
      //       finalItems.push({
      //         item:newItems[x],
      //         matches: 0
      //       });
      //     }
      //   }
      // }
    //   console.log("FINAL ITEMS",finalItems);
    //   $rootScope.itemlist = newItems;

    // };

    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            
          });
      }
    }

    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      }
    }

    $scope.search = '';
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

  $scope.openMenu = function($mdOpenMenu, ev) {
    $mdOpenMenu(ev);
  };

  $scope.login = function(){
    $http.get("/login").success(function(req,res){
      $location.url("/");
    });
  }

  $scope.logout = function(){
    $http.get("/signout").success(function(req,res){
      $location.url("/");
    });
  }

  $scope.searchItem = function($scope){
    sharedProperties.setProperty($scope);
    var current_search = $scope;
    // var current_search = $scope.selectedTags;
    $http.get("/searchItem/?"+current_search).success(function(data){

      var current_search = sharedProperties.getProperty().title;

      $http.get("/searchItem/?"+current_search).success(function(response){
        $rootScope.searchitemlist = response;
      });

      $location.url("/searchItem");
    });
  }

    $scope.addItem = function(ev){
    sharedServiceUploadModal.setProperty($scope.item);
    $rootScope.item = {};

    $mdDialog.show({
      controller: itemModalInstanceCtrl,
      templateUrl: 'partials/itemList/addItem.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      scope: $scope.$new()
    })
    // var modalInstance = $uibModal.open({
    //     animation: $scope.animationsEnabled,
    //     templateUrl: 'partials/itemList/addItem.html',
    //     controller: 'itemModalInstanceCtrl',
    //     size: 'lg',
    //     resolve: {
    //         items: function () {
    //             return $scope.item;
    //         }
    //     }
    //   });
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