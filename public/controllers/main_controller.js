'use strict';

angular.module('LoginApp',[]);
angular.module('ItemApp',[]);
angular.module('navBarApp',[]);
angular.module('searchItemApp',[]);
angular.module('guestApp',[]);
angular.module('404App',[]);
angular.module('SideNavApp',[]);
angular.module('superAdminApp',[]);
angular.module('changePasswordApp',[]);

var myApp = angular.module('LostApp', ['ui.router','ngMaterial',
    'LoginApp','ItemApp','navBarApp', 'searchItemApp', 'guestApp','404App','SideNavApp','superAdminApp', 'changePasswordApp']);

myApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider,$urlRouterProvider,$httpProvider) {

        var interceptor = ['$location', '$q', '$injector', function($location, $q, $injector) {
            return {
                responseError: function(response) { 
                    if (response.status === 401){
                        $location.url('/');
                    }
                    if (response.status === 404){
                        $location.url('/404');
                    }
                    if (response.status === 454){
                        $location.url('/itemlist');
                    }                    
                    if (response.status === 440){
                        console.log("MOBILE")
                        $location.url('/mobile');
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

            .state('changePassword', {
                url:'/changePassword',
                views: {
                    'navBar': {
                        templateUrl : '../partials/changePassword/adminNav.html',
                        action : 'changePasswordApp.changePasswordController'
                    },
                    'superAdminPage': {
                        templateUrl : '../partials/changePassword/changePassword.html',
                        action : 'changePasswordApp.changePasswordController'
                    }
                    
                }
            })

            .state('login',{
                url: '/',
                views: {
                    'login': {
                        templateUrl : 'partials/login/login.html',
                        action : 'LoginApp.loginController',
                        resolve:{
                            myVar: function($q,$http,$location){
                                var url = "";
                                $http.get("/loginMobile").success(function(response){
                                    console.log("RESPONSE:::",response);
                                    if(response.mobile && !response.auth){
                                        url = "/mobile/login";
                                        // $rootScope.isMobile = true;
                                    }
                                    if(response.mobile && response.auth){
                                        url = "/mobile/itemlist";
                                        // $rootScope.isMobile = true;
                                    }
                                    if(!response.mobile && response.auth){
                                        url = "/itemlist";
                                        // $rootScope.isMobile = false;
                                    }
                                    console.log("DUMMY",response);
                                    $location.url(url);

                                    console.log("DUMMY",response)
                                    var dummy = "dummy";

                                });
                                var dummy = "dummy";
                                // console.log("hi");
                                // var curURL = window.location.href;
                                // if(isMobile && curURL.indexOf("mobile") == -1){
                                //     $location.url(url);
                                // }
                            }
                        }
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
                        templateUrl : '../partials/changePassword/adminNav.html',
                        action : 'changePasswordApp.changePasswordController'
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
                        templateUrl : '../partials/404/404Nav.html',
                        action : '404App.404Controller'
                    },
                    '404':{
                        templateUrl : '../partials/404/404.html',
                        action : '404App.404Controller'
                    }
                }
            })

            .state('mobile',{
                url:'/mobile/itemlist',
                views:{
                    'mobile':{
                        templateUrl : '../partials/mobile/mobile.html',
                        action : 'mobileApp.MobileCtrl'
                    }
                }
            })

            .state('mobileLogin',{
                url:'/mobile/login',
                views:{
                    'mobile':{
                        templateUrl : '../partials/mobile/mobileLogin.html',
                        action : 'LoginApp.loginController'
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
