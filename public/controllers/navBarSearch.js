angular.module('navBarApp',['ngMaterial','ngFileUpload']).controller('NavBarSearchCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', 'sharedProperties','sharedService',
  '$animate','$uibModal', 'sharedServiceUploadModal','sharedPropertiesTags',
  function($rootScope,$timeout, $scope, $http, $location, sharedProperties, 
    sharedService,$animate,$uibModal,sharedServiceUploadModal,sharedPropertiesTags, log, $log) {

    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    
    // list of `tag` value/display objects
    self.tags        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

    // self.newTag = newTag;

    // function newTag(tag) {
    //   alert("Alert!");
    // }

    /**
     * Search for tags... use $timeout to simulate remote dataservice call.
     */
  
    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };

    function test() {
      console.log("MADE IT TO TESTING.....");
    }

    $scope.logout = function(){
      console.log("HELLLLOOOOO");
      $http.get("/signout").success(function(req,res){
        $location.url("/");
      });
    }


    function querySearch (query) {
      console.log("querySearch", query);
      var results = query ? self.tags.filter( createFilterFor(query) ) : self.tags,
          deferred;

      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }
    function searchTextChange(text) {
      console.log("text: ", text);
      // $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      console.log("selectedItemChange");
      // $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build list of key/value pairs
     */

    function loadAll() {
      console.log("loadAll");
      var allTags = 'One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten';
      return allTags.split(/, +/g).map( function (tag) {
        return {
          value: tag.toLowerCase(),
          display: tag
        };
      });
    }

    /**
     * Create filter function for a query string
     */

    function createFilterFor(query) {
      console.log("createFilterFor", query);
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(tag) {
        return (tag.value.indexOf(lowercaseQuery) === 0);
      };
    }
}]);


//create a service between navbar controller and itemlistcontroller trigger an event,
//$scope.editItem = function ($element) {
