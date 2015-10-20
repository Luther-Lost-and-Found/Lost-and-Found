'use strict';

angular.module('LoginApp',[]);
angular.module('ItemApp',[]);



//Define an angular module for our app
var myApp = angular.module('LostApp', ['ngRoute','LoginApp','ItemApp']);
 
//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
myApp.config(['$routeProvider',
  function($routeProvider) {

    $routeProvider.
    	when('/',{
    		templateUrl : 'login/login.html',
    		action : 'LoginApp.loginController'
    	}).
    	when('/itemlist', {
        	templateUrl: '../itemList.html',
        	action: 'ItemApp.ItemCtrl'
    	}).
    	otherwise({
        	redirectTo: '/itemlist'
     	});
}]);


