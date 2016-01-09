'use strict';

/**
 * @ngdoc overview
 * @name flatpcApp
 * @description
 * # flatpcApp
 *
 * Main module of the application.
 */
angular
  .module('flatpcApp', [
    //'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ngTouch'
  ])
  .constant('AppConfig',{
      WEB_ROOT:'http://120.26.48.150:8089/'
      
  }).run(['$rootScope', '$location', 'AppConfig',
		function($rootScope, $location, AppConfig) {
            $rootScope.validate = function(menu){
                
            }
            $rootScope.authority = '';
            $rootScope.sysMenu = ['flat','flat',''];
			$rootScope.$on('$stateChangeStart',
				function(event, toState, toParams, fromState, fromParams) {
                    $rootScope.loading = true;
            });
            $rootScope.$on('$stateChangeError', 
                function(event, toState, toParams, fromState, fromParams, error){ 
                sweetAlert("页面加载出错", "错误信息：" + error, "error");
            });
			
		}
	])
  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state('index', {
        url: "/index",
        views: {
            "": {
                templateUrl: 'views/menu.html',
                controller: 'MenuCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('list', {
        url: "/list",
        views: {
            "": {
                templateUrl: 'views/list.html',
                controller: 'ListCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('list1', {
        url: "/list1",
        views: {
            "": {
                templateUrl: 'views/list1.html',
                controller: 'ListCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        }
    })
    .state('404', {
        url: "/missing",
        views: {
            "otherwise": {
                templateUrl: '404.html',
                controller: 'MissingCtrl'
            }
        }
    });
    $urlRouterProvider.otherwise('/index');
  });
