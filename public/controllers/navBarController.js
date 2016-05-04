var app = angular.module('navBarApp',['ngMaterial','ngFileUpload']);

app.controller('NavBarCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", '$mdDialog', 'sharedProperties','sharedService',
  '$animate', 'sharedServiceUploadModal','sharedPropertiesTags','$filter',
  function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, $mdDialog, sharedProperties,
    sharedService,$animate,sharedServiceUploadModal,sharedPropertiesTags,$filter) {

    getTagsFromDatabase();
    $rootScope.chosenColor = "#093A7D"
    console.log("NAVBAR:",$rootScope.userSettings);

    $scope.toggleRight = buildToggler('right');
    $scope.onSearch = function(searchValue) {
      $scope.search = searchValue;
      $rootScope.search = $scope.search;

    };

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
      console.log("LOGIN RESPONSE",res);
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

  $scope.switchShowAdditem = function() {
    $scope.$applyAsync(function(){
      $rootScope.showAddItem = !$rootScope.showAddItem;
      console.log($rootScope.showAddItem);
    });
  }

  // $rootScope.showAddItem = false;

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

app.controller('addItemMobileCtrl', ['$scope','$rootScope',
  '$http', '$mdDialog','sharedService', 'Upload','sharedServiceUploadModal','sharedPropertiesTags',
  function($scope, $rootScope, $http, $mdDialog, sharedService, 
  Upload, sharedServiceUploadModal,sharedPropertiesTags) {

  var myList = [];

  $scope.testCancel = function(){
    $scope.$applyAsync(function(){
      $rootScope.showAddItem = !$rootScope.showAddItem;
      console.log($rootScope.showAddItem);
    });
    $rootScope.chosenColor = "#093A7D"
  }

  $scope.errorMessage = "";

  var COLORS = [{name: 'Red', colors: [
        {hex: 'F44336' },
        {hex: 'B71C1C' },
        {hex: 'D50000' }
  ]}, 

  {name: 'Pink', colors: [
          {hex: 'FF80AB' },
          {hex: 'FF4081' },
          {hex: 'F50057' },
  ]},

  {name: 'Purple', colors: [
          {hex: 'E040FB' },
          {hex: '7B1FA2' },
          {hex: '4A148C' },
  ]},

  {name: 'Blue', colors: [
          {hex: '80D8FF' },
          {hex: '2962FF' },
          {hex: '01579B' }
  ]},

  {name: 'Cyan', colors: [
          {hex: '1DE9B6' },
          {hex: '00897B' },
          {hex: '004D40' },
  ]}, 

  {name: 'Green', colors: [
          {hex: 'CCFF90' },
          {hex: '64DD17' },
          {hex: '1B5E20' },
  ]}, 

  {name: 'Yellow', colors: [
          {hex: 'FFFF8D' },
          {hex: 'FFFF00' },
          {hex: 'FFD600' }
  ]}, 

  {name: 'Orange', colors: [
          {hex: 'FFD180' },
          {hex: 'FF9800' },
          {hex: 'E65100' },
  ]},

  {name: 'Brown', colors: [
          {hex: 'A1887F' },
          {hex: '6D4C41' },
          {hex: '3E2723' },
  ]},

  {name: 'Grey', colors: [
          {hex: 'BDBDBD' },
          {hex: '757575' },
          {hex: '424242' },
  ]},

  {name: 'Black', colors: [
          {hex: 'FFFFFF' },
  ]},
  {name: 'White', colors: [
          {hex: '000000' },
  ]},
  {name: 'Norse', colors: [
          {hex: '093A7D' },
  ]}
  ];


  
  $scope.colorTiles = (function() {
    var tiles = [];
    for(var primCol=0; primCol< COLORS.length; primCol++){
      for (var secCol = 0; secCol < COLORS[primCol].colors.length; secCol++) {
          var actualColor = COLORS[primCol].colors[secCol].hex;
          tiles.push({
            color: "#"+actualColor,
            name: COLORS[primCol].name.toLowerCase()
            
          });
      }
    };
    return tiles;
   })();

   $rootScope.chosenColor = "#093A7D"
   var itemColor = "";

  $scope.colorClicked = function(color) {
    console.log("COLOR CLICKED", color);
    $scope.$applyAsync(function(){
      $rootScope.chosenColor = color.color;
      itemColor = color.color;
    });
  };

  $scope.updateItem = function(ev,$element){
    var current_id = $rootScope.item.itemID;
    var fullTagsRaw = $rootScope.selectedTags;
    $rootScope.item.newTags = fullTagsRaw;

    $http.put("/itemlist/" + current_id, $rootScope.item).success(function(response){
      $rootScope.$broadcast('handleBroadcast');
      $mdDialog.cancel();
    });
  };

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
    return {lowername: chip};
    // return {name: chip,type='color'};
  }
  /* Search for tags. */
  function querySearch(query) {
    var results = query ? $scope.allTags.filter(createFilterFor(query)) : [];
    var finalResults = [];
    for (var i = 0;i< results.length; i++) {
      finalResults.push(results[i].lowername);
    }
    return finalResults;
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
        $scope.imageStatus = null;
        $scope.addItem();
      }
      // $mdDialog.cancel();
    };

  $scope.addItem = function(){
    $scope.errorMsg = null;
    var fullTagsRaw = $scope.selectedTags;
    $scope.item.newTags = fullTagsRaw;
    $scope.item.itemColor = itemColor;

    if($scope.item.itemColor == '' & $scope.imageStatus == null){
      $scope.errorMessage = "Select color or image.";
    }

    if($scope.item.title == '' || $scope.item.title == null){
      $scope.errorMessage = "Please enter a valid title.";
    }

    if($scope.item.itemColor !='' & $scope.item.title != '' & $scope.item.title != null){
      $http.post("/additem",$scope.item).success(function(response){
        sharedService.refreshMain();
        $mdDialog.cancel();
      });
    }
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

    });
  };

  $scope.getReqParams = function () {
    return $scope.generateErrorOnServer ? '?errorCode=' + $scope.serverErrorCode +
    '&errorMessage=' + $scope.serverErrorMsg : '';
  };

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };

}]);