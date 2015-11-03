'use strict';

angular.module('LoginApp',[]);
angular.module('ItemApp',[]);
angular.module('navBarApp',[]);
angular.module('addItemApp',[]);
angular.module('searchItemApp',[]);

var myApp = angular.module('LostApp', ['ui.router','LoginApp','ItemApp','navBarApp','addItemApp','searchItemApp']);

myApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider,$urlRouterProvider, $httpProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
        	.state('login',{
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
                        templateUrl : '../partials/navBar/navBar.html',
                        action : 'navBarApp.NavBarCtrl'
                    },
                    'itemlist': {
                        templateUrl : '../partials/itemList/itemList.html',
                        action : 'ItemApp.ItemCtrl'
                    }
                }
            })
            .state('searchitem', {
                url:'/searchItem',
                views: {
                    'navBar': {
                        templateUrl : '../partials/navBar/navBar.html',
                        action : 'navBarApp.NavBarCtrl'
                    },
                    'searchitem': {
                        templateUrl : '../partials/search/searchItem.html',
                        action : 'searchItemApp.searchItemController'
                    }
                }
            })

        var interceptor = ['$location', '$q', '$injector', function($location, $q, $injector) {

            function success(response) {

                return response;
            }

            function error(response) {


                if(response.status === 401) {
                    $injector.get('$state').transitionTo('login');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }

            return function(promise) {
                return promise.then(success, error);

            }

        }];

        $httpProvider.interceptors.push(interceptor);
    }
]);


myApp.service('sharedService',function($rootScope) {
    console.log('working');
    return{
        refreshMain: function(){
            $rootScope.$broadcast('handleBroadcast');
        }
    };
});

myApp.service('sharedProperties',function(){
    var property = {nice:'First'};

    return {
        getProperty: function () {
            return property;
        },
        setProperty: function(value) {
            property = value;
        }
    };
});

