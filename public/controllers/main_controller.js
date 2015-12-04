'use strict';

angular.module('LoginApp',[]);
angular.module('ItemApp',[]);
angular.module('navBarApp',[]);
angular.module('searchItemApp',[]);
angular.module('guestApp',[]);
angular.module('footerApp',[]);

var myApp = angular.module('LostApp', ['ui.router','ngMaterial',
    'LoginApp','ItemApp','navBarApp', 'searchItemApp', 'guestApp','footerApp']);

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
                    },
                    'footerAdmin': {
                        templateUrl : '../partials/general/footer.html',
                        action : 'footerApp.footerController'
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
                    },
                    'footerAdmin': {
                        templateUrl : '../partials/general/footer.html',
                        action : 'footerApp.footerController'
                    }
                }
            })
            .state('guestPage', {
                url:'/guestPage',
                views: {
                    'navBar': {
                        templateUrl : '../partials/guest/guestNav.html',
                        action : 'navBarApp.NavBarCtrl'
                    },
                    'guestPage': {
                        templateUrl : '../partials/guest/guest.html',
                        action : 'guestApp.guestController'
                    }
                    
                }
            })

        var interceptor = ['$location', '$q', '$injector', function($location, $q, $injector) {
            return {
                response: function(response) {
                    return response; 
                },
                responseError: function(response) { 
                    if (response.status === 401) 
                        $location.url('/login'); 
                    return $q.reject(response); 
                } 
            };
        }];

        $httpProvider.interceptors.push(interceptor);
    }
]);


myApp.service('sharedService',function($rootScope) {
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

myApp.service('sharedServiceUploadModal',function(){
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

myApp.service('sharedPropertiesTags',function(){
    var property = [{name:'First'}];

    return {
        getProperty: function () {
            return property;
        },
        setProperty: function(value) {
            property = value;
        }
    };
});