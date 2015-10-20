//Define an angular module for our app
var myApp = angular.module('LostApp', ["ngRoute"]);
 
//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    	when('/',{
    		templateUrl : 'login/login.html',
    		controller : 'loginController'
    	}).
      when('/itemlist', {
        templateUrl: '../itemList.html',
        controller: 'ItemCtrl'
    }).
      when('/itemlist', {
        templateUrl: '../itemList.html',
        controller: 'ItemCtrl'
      }).
      otherwise({
        redirectTo: '/itemlist'
      });
}]);
 
 
myApp.controller('ItemCtrl', ['$timeout', '$scope', '$http', function($timeout, $scope, $http) {
	console.log("Hello World from controller");

	var refresh = function(){
		$http.get("/itemlist").success(function(response){
			console.log('i got the data requested');
			$scope.$applyAsync(function(){
				$scope.itemlist = response;
				$scope.item = "";
			});
		});
	};

	refresh();

	$scope.addItem = function(){
		console.log($scope.item);
		$http.post("/itemlist",$scope.item).success(function(response){
			refresh();
		});

	}

	$scope.removeItem = function($scope,$element){
		var current_id = ($scope.itemID); 
		console.log(current_id);
		$http.delete("/itemlist/?" + current_id).success(function(response){
			refresh();
		});

	}

	$scope.editItem = function($element){
		var current_id = ($element.itemID); 
		console.log(current_id);
		$http.get("/itemlist/" + current_id).success(function(response){
			console.log("got the data to edit");
			$scope.$applyAsync(function(){
				$scope.item = response[0];
			});
			
		});
		
	}

	$scope.updateItem = function($element){
		console.log($scope.item);
		var current_id = ($element.itemID);
		$http.put("/itemlist/" + current_id, $scope.item).success(function(response){
			console.log("UPDATE");
			refresh();
		});
		
	}

}]);

myApp.controller('loginController', ['$timeout', '$scope', '$http', '$location', '$rootScope','$window', function($timeout, $scope, $http, $location, $rootScope, $window) {

// $scope.loginSubmit = function($scope){
// 		var login_username = $scope.username;
		
// 		$http.post("/login",{login_username}).success(function(response){
// 			console.log("success");
// 			$window.location.href = "../itemList.html";
// 		});
// 	}


  // Register the login() function
  	$scope.loginSubmit = function($scope){
    	$http.post('/login', {
	      	username: $scope.username,
	      	password: $scope.password,
	    })
	    .success(function(user){
	    	console.log("cool");
	     	$window.location.href = "/#itemList";
	    })
	    .error(function(){
	    	$rootScope.message = 'Authentication failed.';
	    	$window.location.href = "../login/login.html";
	    });
  	};
}]);

