angular.module('LoginApp').controller('loginController',['$timeout', '$scope', '$http', '$location',
	'$rootScope','$window', '$mdSidenav', function($timeout, $scope, $http, $location, $rootScope, $window, $mdSidenav) {

	// function isMobile(){
	// 	console.log("calling is mobile", window.location.href )
	// 	var url = "";
	// 	$http.get("/loginMobile").success(function(response){
	// 		console.log("RESPONSE:::",response);
	// 		if(response.mobile && !response.auth){
	// 			url = "/mobile/login";
	// 			$rootScope.isMobile = true;
	// 		}
	// 		if(response.mobile && response.auth){
	// 			url = "/mobile/itemlist";
	// 			$rootScope.isMobile = true;
	// 		}
	// 		if(!response.mobile && !response.auth){
	// 			url = "/";
	// 			$rootScope.isMobile = false;
	// 		}
	// 		if(!response.mobile && response.auth){
	// 			url = "/itemlist";
	// 			$rootScope.isMobile = false;
	// 		}
	// 		$location.url(url);

	// 		console.log(response)

	// 	});
	// 	var curURL = window.location.href;
	// 	if(isMobile && curURL.indexOf("mobile") == -1){
	// 		$location.url(url);
	// 	}

	//   // if(user.mobile && ){
	//   //     url = "/mobile/itemlist";
	//   // }
	//   // else{
	//   //     url = "/itemlist";  
	//   // }
	//   // $location.url(url);
	// }

	// isMobile();

	// $scope.test1 = function(){
	// 	isMobile();
	// }

	$scope.loginSubmit = function($scope){
		$http.post('/login', {
			username: $scope.username,
			password: $scope.password,
		})
		.success(function(user){
			console.log("MOBILE RESPONSE",user.mobile);
			$rootScope.mobile = user.mobile;
			var url = "";
			if(user.mobile){
				url = "/mobile/itemlist";
			}
			else{
				url = "/itemlist";  
			}
			$location.url(url);
			
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