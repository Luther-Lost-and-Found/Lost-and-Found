var app = angular.module('ItemApp',['ngMaterial'])
  .config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .accentPalette('blue', {
      'default': 'A200' // use shade 200 for default, and keep all other shades the same
    });
});

app.controller('ItemCtrl', function($timeout, $scope,$location, $http, $animate,$rootScope,sharedService,sharedServiceUploadModal,$mdDialog, $mdMedia) {

  var doneRefreshInit = false;

  $scope.test = function() {
    console.log("WORKING");
  }

  $scope.goToAppSettings = function(){
    console.log("USER PRIV:::",$rootScope.userSettings.superPrivilege);
    if ($rootScope.userSettings.superPrivilege) {
      console.log("To Super Admin Page");
      $location.url("/superAdminPage");
    } else {
      console.log("To Change Password Page");
      $location.url("/changePassword");
    }
  }

  var refresh = function(){
    $http.get("/itemlist").success(function(response){

      console.log(response)
      $scope.$applyAsync(function(){
        $rootScope.itemlist = response;
        for (var i = 0; i < $rootScope.itemlist.length; i++) {
          $rootScope.itemlist[i].time_stamp = new Date(Date.parse($rootScope.itemlist[i].time_stamp)).toUTCString();
        }
        $rootScope.itemlist = response;
        $rootScope.allItems = response;
        $scope.item = "";
        $scope.buttonDisable = true;
        $scope.locationsAll = findUnique();
        $rootScope.mobile = response.mobile;
        doneRefreshInit = true;
        console.log("ITEMLIST",$rootScope.itemlist);
      });
    });
  };

  refresh();

  var sections= {
    pages: [{
      name: 'A-Z',
      type: 'alpha'
    }, {
      name: 'Location',
      type: 'location'
    },
    {
      name: 'Date',
      type: 'date'
    }],
    active: ''

  };

  var setGlobalSettings = function() {
    if(doneRefreshInit){
      $http.get("/loggedin").success(function(response){
        if(response != 0){
          delete response['password'];
          $rootScope.userSettings = response;
          $rootScope.locationID = response.locationID;
          $rootScope.ownLocation = response.locationID;
          
          if(response.allItems == 1){
            $rootScope.switchData = {
              seeAll: true
            };
            $rootScope.message = 'ON';
          }
          else{
            $rootScope.switchData = {
              seeAll: false
            };
            $rootScope.message = 'OFF';
            var matches = $.grep($rootScope.allItems, function(element) {
              return element.locationID == $rootScope.locationID;
            });
            $rootScope.itemlist = matches;

          }
          
          $rootScope.sections = sections;
          $rootScope.sections.active = response.sorting;
          $scope.sort(response.sorting);
        }
      });
    }

    else{
      setTimeout(setGlobalSettings, 1);
    }
  };

  setGlobalSettings();

  var findUnique = function(){
    var locations = [];
    $http.get("/itemlist/locationsAll").success(function(response){
      $scope.$applyAsync(function(){
        $scope.locationsAll = response;
      });
    });
    return locations;
  };

  $scope.gridChange = function(arg){
  }

  $scope.buttonDisable = true;

  $scope.checked = function(args){
    var foundToDelete = 0;
    for (i=0;i<$rootScope.itemlist.length;i++){
      if ($rootScope.itemlist[i].toDelete == true){
        foundToDelete++;
      } 
    }
    if(foundToDelete > 0){
      $scope.buttonDisable = false;
    }
    else{
      $scope.buttonDisable = true;
    }
  }

  $scope.setCursor = function(){
    console.log("setcursor")
    $("#sendInput").focus();
    // $("#sendInput").select();
  }

  $scope.sendToLocation = function(locationID){
    var foundToSend = 0;
    for (i=0;i<$rootScope.itemlist.length;i++){
      if ($rootScope.itemlist[i].toDelete == true){
        foundToSend++;
        var current_id = ($rootScope.itemlist[i].itemID);
        $rootScope.ownLocation = ($rootScope.itemlist[i].locationID);
        // $http.delete("/itemlist/?" + current_id).success(function(response){
        // });
        $http.put("/itemlist/?" + current_id, {'location': locationID}).success(function(response){
        });
      } 
    }
    if(foundToSend > 0){
      refreshAfetSend($rootScope.ownLocation);
    }
  };

  var showAllLocations = function(){
    // $rootScope.itemlist = $rootScope.allItems;
    $rootScope.itemlist = $rootScope.allItems;
    if(currentSorting.isSorted == true){
      $rootScope.$emit(currentSorting.method);
    }
  }

  $scope.logout = function(){
    $http.get("/signout").success(function(req,res){
      $location.url("/");
    });
  }

  var refreshAfetSend = function(locationID){
    $http.get("/itemlist").success(function(response){
      $scope.$applyAsync(function(){
        $rootScope.allItems = response;
        $scope.item = "";
        $scope.buttonDisable = true;
        $scope.locationsAll = findUnique();

        if(!$rootScope.switchData.seeAll){

          var matches = $.grep($rootScope.allItems, function(element) {
            return element.locationID == locationID;
          });
          $rootScope.itemlist = matches;
        }

        else{

          $rootScope.itemlist = response;
        }

        if(currentSorting.isSorted == true){
          $rootScope.$emit(currentSorting.method);
        }

      });
    });
  };

  var showCurrentLocation = function(locationID){
    var matches = $.grep($rootScope.allItems, function(element) {
      return element.locationID == locationID;
    });
    $rootScope.itemlist = matches;    

    if(currentSorting.isSorted == true){
      $rootScope.$emit(currentSorting.method);
    }
  }
  
  $scope.addItem = function(ev){

    console.log("IN ADD ITEM FROM MOBILE");

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

  var currentSorting = {
    isSorted: false,
    method: ""
  }

  $rootScope.$on('sortAlpha', function(event, args) {
    currentSorting.isSorted = true;
    currentSorting.method = event.name;
    $rootScope.itemlist=$($rootScope.itemlist).sort(sortAlpha);
  });
  $rootScope.$on('sortLoc', function(event, args) {
    currentSorting.isSorted = true;
    currentSorting.method = event.name;
    $rootScope.itemlist=$($rootScope.itemlist).sort(sortLoc);
  });
  $rootScope.$on('sortDate', function(event, args) {
    currentSorting.isSorted = true;
    currentSorting.method = event.name;
    $rootScope.itemlist=$($rootScope.itemlist).sort(sortDate);
  });

  $rootScope.$on('TEST', function(event, args) {
    if(args.state == true){
      showAllLocations();
    }
    else{
      showCurrentLocation(args.location);
    }
  });

  $scope.deleteAll = function(){
    var foundToDelete = 0;
    for (i=0;i<$rootScope.itemlist.length;i++){
      if ($rootScope.itemlist[i].toDelete == true){
        foundToDelete++;
        var current_id = ($rootScope.itemlist[i].itemID); 
        $rootScope.ownLocation = ($rootScope.itemlist[i].locationID);
        $http.delete("/itemlist/?" + current_id).success(function(response){
        });
      } 
    }
    if(foundToDelete > 0){
      refreshAfetSend($rootScope.ownLocation);
    }
  };

  jQuery.fn.sort = function() {  
      return this.pushStack( [].sort.apply( this, arguments ), []);  
  };  

  function sortAlpha(a,b){  
    if (a.title.toLowerCase() == b.title.toLowerCase()){
      return 0;
    }
    return a.title.toLowerCase()> b.title.toLowerCase() ? 1 : -1;  
  };  
  function sortLoc(a,b){  
    if (a.locationID == b.locationID){
      return 0;
    }
    return a.locationID> b.locationID ? 1 : -1;  
  };
  function sortDate(a,b){  
    if (a.time_stamp == b.time_stamp){
      return 0;
    }
    return a.time_stamp> b.time_stamp ? 1 : -1;
  };


  // function sortAlpha() {
  //   $http.get("/itemlist/alpha").success(function(response){
  //     $scope.$applyAsync(function(){
  //       $rootScope.itemlist = response;
  //       $scope.item = "";
  //     });
  //   });
  // };

  // function sortLoc() {
  //   $http.get("/itemlist/location").success(function(response){
  //     $scope.$applyAsync(function(){
  //       $rootScope.itemlist = response;
  //       $scope.item = "";
  //     });
  //   });
  // };

  // function sortDate() {
  //   $http.get("/itemlist/date").success(function(response){
  //     $scope.$applyAsync(function(){
  //       $rootScope.itemlist = response;
  //       $scope.item = "";
  //     });
  //   });
  // };

  $scope.updateItem = function($element){
    var current_id = ($element.itemID);
    $http.put("/itemlist/" + current_id, $scope.item).success(function(response){
      console.log($scope.item)


      refresh();
    });
  };

  $scope.status = '  ';

  $scope.clicked = function(ev,$element) {

    var current_id = ($element.itemID);
    $http.get("/itemlist/" + current_id).success(function(response){


      $rootScope.itemTags = response[0].tags;

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

    function filterByID(obj) {
      if (obj.itemID == current_id) {
        return true;
      } else {
        return false;
      }
    }

    var matches = $rootScope.allItems.filter(filterByID);

    if(matches[0].claimed  == 0){
        matches[0].claimed = false;
    }
    else{
      matches[0].claimed = true;
    }

    $rootScope.item = matches;

    $scope.parentSelected = $element;

    $mdDialog.show({
      controller: ModalInstanceCtrl,
      templateUrl: '/partials/itemList/ViewItemModal.html',
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
    refreshAfetSend($rootScope.ownLocation);
  });

  $scope.isCollapsed = true;

}).$inject = ['$scope', 'sharedServiceUpdateModal'];

function ModalInstanceCtrl($scope, $rootScope, $http, $mdDialog, sharedService, Upload, sharedServiceUploadModal,sharedPropertiesTags) {
  $rootScope.item = $scope.parentSelected;
  $scope.item = $scope.parentSelected;
  $scope.selected = {
      item: $scope.parentSelected
  };

  var itemEditTags = [];

  $scope.editItem = function (ev,$element) {
    
    var current_id = ($element.itemID);
    $http.get("/itemlist/" + current_id).success(function(response){

      for(i=0;i<response.length;i++){
        itemEditTags.push({'name':response[i].tags});
      }
      var tagsInProcess = []
      var curTagsList = itemEditTags[0].name;
      for (var i = 0; i < curTagsList.length; i++) {
        tagsInProcess.name = curTagsList[i]
      }
      $rootScope.tagsFromItem = curTagsList;

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
      templateUrl: '/partials/itemList/EditItemModal.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      scope: $rootScope.$new()
    })
  };

  $scope.updateItem = function(ev,$element){
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
      $mdDialog.cancel('cancel');
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
    return {lowername: chip};
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

   $scope.chosenColor = "#093A7D"
   var itemColor = "";
   var colorName = "";

  $scope.colorClicked = function(color) {
    $scope.chosenColor = color.color;
    itemColor = color.color;
    itemColor = color.name;
  };

  $scope.updateItem = function(ev,$element){
    var current_id = $rootScope.item.itemID;
    var fullTagsRaw = $rootScope.selectedTags;
    $rootScope.item.newTags = fullTagsRaw;
    console.log("UPDATING ITEM",$rootScope.item);

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
    $scope.item.imagePrimColor = colorName;

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