angular.module('404App').controller('404Controller',['$timeout', '$scope', '$http', '$location',
 '$rootScope','$window', function($timeout, $scope, $http, $location, $rootScope, $window) {
	
 	$scope.goHome = function() {
		$location.url("/itemlist")
	}
}]);