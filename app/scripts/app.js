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
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'ngTouch'
  ])
  .constant('AppConfig',{
      WEB_ROOT:'http://120.26.48.150:8089/'
      
  }).run(['$rootScope', '$location', 'AppConfig',
		function($rootScope, $location, AppConfig, loginservice, AuthService) {
			$rootScope.$on('$stateChangeStart',
				function(event, toState, toParams, fromState, fromParams) {
                    
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
            }
        }
    })
    .state('login', {
        url: "/login",
        views: {
            "login": {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
            }
        }
    });
    $urlRouterProvider.otherwise('/index');
  });
