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

    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };

    $scope.logout = function(){
      $http.get("/signout").success(function(req,res){
        $location.url("/");
      });
    }


    function querySearch (query) {
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

    function loadAll() {
      var allTags = 'One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten';
      return allTags.split(/, +/g).map( function (tag) {
        return {
          value: tag.toLowerCase(),
          display: tag
        };
      });
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(tag) {
        return (tag.value.indexOf(lowercaseQuery) === 0);
      };
    }
}]);