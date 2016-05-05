var app = angular.module('guestApp',['ngMaterial']);

app.controller('guestController', function($location,$timeout, $scope, $http, $animate,$rootScope,sharedProperties,$mdDialog, $mdMedia) {

	var refresh = function(){
		$scope.description = "";
	};

	$rootScope.$on('REFRESH_GUEST', function(event, args) {
	    refresh();
	});

	$scope.login = function(){
		$location.url("/");
	}
	
	$scope.submitGuestSearch = function(ev, $scope){

		//var current_search = ($scope.itemTitle); 
		var current_search = {title:$scope.itemTitle, description:$scope.description}
		$http.post("/guest", current_search).success(function(response){
			$rootScope.$applyAsync(function(){
				$rootScope.locationlist = response;
			});
		});
	};

	//SIDENAV SEARCH

    $scope.toggleRight = buildToggler('right');

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


});

app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown", function(e) {
            if(e.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'e': e});
                });
                e.preventDefault();
            }
        });
    };
});

function guestModalInstanceCtrl($http,$rootScope,$scope, sharedProperties, $mdDialog) {

  	$scope.hide = function() {
	    $mdDialog.hide();
	};
	$scope.cancel = function() {
		$rootScope.$emit("REFRESH_GUEST");
	    $mdDialog.cancel();
	};
	$scope.answer = function(answer) {
	    $mdDialog.hide(answer);
	};
};