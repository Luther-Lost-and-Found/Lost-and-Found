var app = angular.module('navBarApp',['ngMaterial','ngFileUpload']);

app.controller('NavBarCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', "$mdSidenav", 'sharedProperties','sharedService',
  '$animate','$uibModal', 'sharedServiceUploadModal','sharedPropertiesTags',
  function($rootScope,$timeout, $scope, $http, $location, $mdSidenav, sharedProperties, 
    sharedService,$animate,$uibModal,sharedServiceUploadModal,sharedPropertiesTags) {

  getTagsFromDatabase();

  $scope.onSearch = function(searchValue) {
        $scope.search = searchValue;
        $rootScope.search = $scope.search;
  };

    $scope.toggleLeft = buildDelayedToggler('left');

    $scope.toggleRight = buildToggler('right');

    // $scope.doTest = function() {
    //   // document.body.insertAdjacentHTML( 'afterbegin', '<div id="myID">...</div>' );
    //   var backdropStr = "<md-backdrop class=""md-sidenav-backdrop md-opaque ng-scope"" style=""></md-backdrop>"
    //   var itemlist = document.querySelector("#main");

    //   itemlist.innerHTML = backdropStr;
    //   while (itemlist.firstChild) {
    //       itemlist.appendChild(itemlist.firstChild);
    //   }
    //   console.log(itemlist);
    // }


    $scope.isOpenRight = function(){
      return $mdSidenav('right').isOpen();
    };

    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $http.get("/loggedin").success(function(response){
              $scope.$applyAsync(function(){
                console.log(response.norsekeyID);
                $scope.username = response.norsekeyID;
              });
            });
            // $log.debug("toggle " + navID + " is done");
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
    console.log("HELLLLOOOOO");
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
        console.log("should be good");
        console.log(response);
        $rootScope.searchitemlist = response;
      });


      $location.url("/searchItem");
    });
  }

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

app.controller('SideNavCtrl', function ($http,$scope, $rootScope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    $mdSidenav('right').close()
      .then(function () {
        $http.get("/loggedin").success(function(response){
          $scope.$applyAsync(function(){
            console.log(response.norsekeyID);
            $scope.username = response.norsekeyID;
          });
        });
        // $log.debug($rootScope.username);
      });
  };

  var sections= {
    pages: [{
      name: 'A-Z',
      type: 'alpha',
      state: 'beers.ipas',
      icon: 'fa fa-group'
    }, {
      name: 'Location',
      state: 'home.toollist',
      type: 'location',
      icon: 'fa fa-map-marker'
    },
    {
      name: 'Date',
      state: 'home.createTool',
      type: 'date',
      icon: 'fa fa-plus'
    }]
  };
  $rootScope.sections = sections;

  $scope.sort = function(sort){
    console.log(sort);
    if (sort == "alpha"){
      $scope.$emit('sortAlpha');
    }
    if (sort == "location"){
      $scope.$emit('sortAlpha');
    }
    if (sort == "date"){
      $scope.$emit('sortAlpha');
    }
  }

  function alpa($scope) 
  {
    $scope.$emit('sortAlpha');
  };
  function location($scope) 
  {
    $scope.$emit('sortLoc');
  };
  function date($scope) 
  {
    $scope.$emit('sortDate');
  };


});


//create a service between navbar controller and itemlistcontroller trigger an event,
//$scope.editItem = function ($element) {
    