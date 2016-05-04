angular.module('LoginApp').controller('loginController',['$timeout', '$scope', '$http', '$location',
 '$rootScope','$window', '$mdSidenav', function($timeout, $scope, $http, $location, $rootScope, $window, $mdSidenav) {

  	$scope.loginSubmit = function($scope){
    	$http.post('/login', {
	      	username: $scope.username,
	      	password: $scope.password,
	    })
	    .success(function(user){
        console.log("MOBILE RESPONSE",user.mobile);
        if(user.mobile){
          $location.url("/mobile");
        }
        else{
          $location.url("/itemlist");  
        }
	    	
	    })
	    .error(function(){
	    	$rootScope.message = 'Authentication failed.';
        $scope.password = "";
	    	$location.url("/");
	    });
  	};

  	$scope.guestLoginSubmit = function(){
  		$location.url("/guestPage");
  	}



    //SIDENAV SEARCH

    $scope.toggleRight = buildToggler('right');
    $scope.onSearch = function(searchValue) {
      $scope.search = searchValue;
      $rootScope.search = $scope.search;

    };

    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
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


}]);

angular.module('LoginApp').directive('focus',
function($timeout) {
 return {
 scope : {
   trigger : '@focus'
 },
 link : function(scope, element) {
  scope.$watch('trigger', function(value) {
    if (value === "true") {
      $timeout(function() {
       element[0].focus();
      });
   }
 });
 }
};
});