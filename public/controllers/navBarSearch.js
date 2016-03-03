angular.module('navBarApp',['ui.bootstrap','ngFileUpload']).controller('NavBarSearchCtrl', ['$rootScope',
  '$timeout', '$scope', '$http', '$location', 'sharedProperties','sharedService',
  '$animate','$uibModal', 'sharedServiceUploadModal','sharedPropertiesTags',
  function($rootScope,$timeout, $scope, $q, $log, $http, $location, sharedProperties, 
    sharedService,$animate,$uibModal,sharedServiceUploadModal,sharedPropertiesTags) {

    var self = this;
    self.simulateQuery = false;
    self.isDisabled    = false;
    
    // list of `state` value/display objects
    self.states        = loadAll();
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
    self.newState = newState;

    function newState(state) {
      alert("Alert!");
    }

    /**
     * Search for states... use $timeout to simulate remote dataservice call.
     */

    function querySearch (query) {
      var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
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
      console.log("text: ");
      console.log(text);
      // $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      // $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Build list of key/value pairs
     */

    function loadAll() {
      var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
      return allStates.split(/, +/g).map( function (state) {
        return {
          value: state.toLowerCase(),
          display: state
        };
      });
    }

    /**
     * Create filter function for a query string
     */

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }
}]);


//create a service between navbar controller and itemlistcontroller trigger an event,
//$scope.editItem = function ($element) {

