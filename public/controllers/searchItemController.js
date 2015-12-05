angular.module('searchItemApp',['ui.bootstrap']).controller('searchItemController',
	['$timeout', '$scope', '$http', '$animate','$uibModal','$rootScope','sharedProperties',
	function($timeout, $scope, $http, $animate,$uibModal,$rootScope, sharedProperties) {

	console.log("Hello World from SEARCH controller");
	console.log($rootScope.searchitemlist);
	
}]).$inject = ['$scope', 'sharedProperties'];