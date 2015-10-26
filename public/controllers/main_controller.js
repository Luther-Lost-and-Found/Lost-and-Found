'use strict';

angular.module('LoginApp',[]);
angular.module('ItemApp',[]);



//Define an angular module for our app
var myApp = angular.module('LostApp', ['ui.router','LoginApp','ItemApp']);
 
//Define Routing for app
//Uri /AddNewOrder -> template add_order.html and Controller AddOrderController
//Uri /ShowOrders -> template show_orders.html and Controller AddOrderController
myApp.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    	.state('test',{
            url: '/',
            views: {
                'login': {
                    templateUrl : 'partials/login/login.html',
                    action : 'LoginApp.loginController'
                }
            }
    	})
        .state('itemlist', {
            url:'/itemlist',
            views: {
                'navBar': {
                    templateUrl : '../partials/navBar.html',
                },
                'itemlist': {
                    templateUrl : '../partials/itemList.html',
                    action : 'ItemApp.ItemCtrl'
                }
            }
        })
}]);


