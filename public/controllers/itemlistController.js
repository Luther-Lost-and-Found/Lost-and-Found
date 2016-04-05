var app = angular.module('ItemApp',['ui.bootstrap','ngMaterial']);

app.controller('ItemCtrl', function($timeout, $scope, $http, $animate,$rootScope,sharedService,sharedServiceUploadModal,$mdDialog, $mdMedia) {

  var refresh = function(){
    $http.get("/itemlist").success(function(response){
      $scope.$applyAsync(function(){
        console.log(response);
        $scope.itemlist = response;
        $scope.item = "";
      });
    });
  };

  refresh();

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
  };

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

  $scope.status = '  ';
  
  $scope.clicked = function(ev,$element) {

    var current_id = ($element.itemID);
    console.log(current_id); 
    $http.get("/itemlist/" + current_id).success(function(response){
      var itemTags = [];
      for(i=0;i<response.length;i++){
        itemTags.push(response[i].tag);
      }
      $rootScope.itemTags = itemTags;

      console.log("+++++++RESPONSE1++++++++");
      console.log(response[0]);

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

    $scope.parentSelected = $element;
    console.log("PARENT SELECTED");
    console.log($scope.parentSelected);

    $mdDialog.show({
      controller: ModalInstanceCtrl,
      templateUrl: 'myModalContent.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      scope: $scope.$new()
    })
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
}).$inject = ['$scope', 'sharedServiceUpdateModal'];

function ModalInstanceCtrl($scope, $rootScope, $http, $mdDialog, sharedService, Upload, sharedServiceUploadModal,sharedPropertiesTags) {
  
  $rootScope.item = $scope.parentSelected;
  $scope.item = $scope.parentSelected;
  console.log($scope.parentSelected);
  $scope.selected = {
      item: $scope.parentSelected
  };

  var itemEditTags = [];

  $scope.editItem = function (ev,$element) {
    var current_id = ($element.itemID); 
    console.log(current_id);
    $http.get("/itemlist/" + current_id).success(function(response){

      for(i=0;i<response.length;i++){
        itemEditTags.push({'name':response[i].tag});
      }
      console.log(itemEditTags);
      $rootScope.selectedTags = itemEditTags;

      console.log("+++++++RESPONSE++++++++");
      console.log(response[0].claimed);

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

    $mdDialog.show({
      controller: itemModalInstanceCtrl,
      templateUrl: 'myModalContentEdit.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      scope: $rootScope.$new()
    })
  };

  $scope.updateItem = function(ev,$element){
    console.log("HI UPDATEITEM");
    var current_id = $scope.parentSelected.itemID;
    var fullTagsRaw = $rootScope.selectedTags;
    $scope.parentSelected.newTags = fullTagsRaw;

    $http.put("/itemlist/" + current_id, $scope.parentSelected).success(function(response){
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

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}

function itemModalInstanceCtrl($scope, $rootScope, $http, $mdDialog, sharedService, Upload, sharedServiceUploadModal,sharedPropertiesTags) {

  var myList = [];

  $scope.updateItem = function(ev,$element){
    console.log($rootScope.item);
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
      $mdDialog.cancel();
    };

  $scope.addItem = function(){

    $scope.errorMsg = null;
    var fullTagsRaw = $scope.selectedTags;
    $scope.item.newTags = fullTagsRaw;
    $http.post("/additem",$scope.item).success(function(response){

      sharedService.refreshMain();
      $mdDialog.cancel();
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

      $mdDialog.cancel();
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

};