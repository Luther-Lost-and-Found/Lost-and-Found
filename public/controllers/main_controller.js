'use strict';

angular.module('LoginApp',[]);
angular.module('ItemApp',[]);
angular.module('navBarApp',[]);
angular.module('searchItemApp',[]);
angular.module('guestApp',[]);
angular.module('404App',[]);
angular.module('SideNavApp',[]);
angular.module('superAdminApp',[]);

var myApp = angular.module('LostApp', ['ui.router','ngMaterial',
    'LoginApp','ItemApp','navBarApp', 'searchItemApp', 'guestApp','404App','SideNavApp','superAdminApp']);

myApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider,$urlRouterProvider,$httpProvider) {

        var interceptor = ['$location', '$q', '$injector', function($location, $q, $injector) {
            
            console.log("inside interceptor");
            return {
                // response: function(response) {
                //     console.log("NO ERROR NO ERROR");
                //     return response; 
                // },
                responseError: function(response) { 
                    if (response.status === 401){
                        console.log("4010401401401");
                        $location.url('/');
                    }
                    if (response.status === 404){
                        console.log("4040404040404");
                        $location.url('/404');
                    } 
                    return $q.reject(response); 
                } 
            };
        }];

        $httpProvider.interceptors.push(interceptor);

        $stateProvider
            .state('rootIL', {
                abstract: true,
                //url: '/',
                views: {
                    '@' : {
                        templateUrl: '../partials/tpl/main/layoutIL.html',
                        action: 'rootILApp.rootController'
                    },
                    'top@rootIL' : { templateUrl: '../partials/tpl/main/tpl.top.html',},
                    'main@rootIL' : { templateUrl: '../partials/tpl/main/tpl.main.html',},
                },
              })

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
                parent:'rootIL',
                url:'/itemlist',
                views: {
                    'navBar@rootIL': {
                        templateUrl : '../partials/navBar/navBar.html',
                        action : 'navBarApp.NavBarCtrl'
                    },
                    'itemlist@rootIL': {
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
                    }
                }
            })
            .state('superAdminPage', {
                url:'/superAdminPage',
                views: {
                    'navBar': {
                        templateUrl : '../partials/guest/guestNav.html',
                        action : 'guestApp.guestController'
                    },
                    'superAdminPage': {
                        templateUrl : '../partials/superAdmin/superAdmin.html',
                        action : 'superAdminApp.superAdminController'
                    }
                    
                }
            })
            .state('guestPage', {
                url:'/guestPage',
                views: {
                    'navBar': {
                        templateUrl : '../partials/guest/guestNav.html',
                        action : 'guestApp.guestController'
                    },
                    'guestPage': {
                        templateUrl : '../partials/guest/guest.html',
                        action : 'guestApp.guestController'
                    }
                    
                }
            })

            .state('404',{
                url:'/404',
                views:{
                    'navBar': {
                        templateUrl : '../partials/navBar/navBar.html',
                        action : 'navBarApp.NavBarCtrl'
                    },
                    '404':{
                        templateUrl : '../partials/404/404.html',
                        action : '404App.404Controller'
                    }
                }
            })

            $urlRouterProvider.when('','/');

            $urlRouterProvider.otherwise('/404');

        var interceptor = ['$location', '$q', '$injector', function($location, $q, $injector) {

            return {
                response: function(response) {
                    return response; 
                },
                responseError: function(response) { 
                    if (response.status === 401){
                        $location.url('/login');
                    }
                    if (response.status === 404){
                        $location.url('/404');
                    } 
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

// myApp.run(function($rootScope,$http) {

//     var setRootScope = function(){
//         $http.get("/getSettings").success(function(response){
//           $scope.$applyAsync(function(){
//             console.log(response);
//             $rootScope.userSettings = response;
//           });
//         });
//         console.log("REFRESH");       
//     };

//     setRootScope();

//     console.log("MAIN CONTROLLER");
// });

