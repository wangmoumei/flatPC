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
  ],function($provide){
      //$provide.factory('authority',function(){
      //    return "aaaaa";
      //});
  })
  .constant('AppConfig',{
      WEB_ROOT:'http://120.26.48.150:8089/'
      
  }).run(['$rootScope', '$location', 'AppConfig','authority',
		function($rootScope, $location, AppConfig,authority) {
            $rootScope.sysMenu = ['flat','flat',''];
            console.log($rootScope.sysMenu);
            $rootScope.routerInit = function(menu){
                $rootScope.sysMenu = [menu,menu,""];
            }
            $rootScope.authority = '';
			$rootScope.$on('$stateChangeStart',
				function(event, toState, toParams, fromState, fromParams) {
                    
                    $rootScope.sysMenu = authority.check(toState.name);
                    $rootScope.loading = true;
            });
            $rootScope.$on('$stateChangeError', 
                function(event, toState, toParams, fromState, fromParams, error){ 
                    sweetAlert("页面加载出错", "错误信息：" + error.status, "error");
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
    .state('flat', {
        url: "/flat",
        views: {
            "": {
                templateUrl: 'views/flat/list-selectByFlat.html',
                controller: 'FlatCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            }
        },
        data:{
            name:'111'
        }
    })
    .state('college', {
        url: "/college",
        views: {
            "": {
                templateUrl: 'views/flat/list-selectByCollege.html',
                controller: 'CollegeCtrl'
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
    .state('live', {
        url: "/live",
        views: {
            "": {
                templateUrl: 'views/flat/live.html',
                controller: 'LiveCtrl'
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
    .state('change', {
        url: "/change",
        views: {
            "": {
                templateUrl: 'views/flat/change.html',
                controller: 'LiveCtrl'
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
    .state('quit', {
        url: "/quit",
        views: {
            "": {
                templateUrl: 'views/flat/quit.html',
                controller: 'LiveCtrl'
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
    .state('check', {
        url: "/check",
        views: {
            "": {
                templateUrl: 'views/flat/check.html',
                controller: 'LiveCtrl'
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
    .state('grade', {
        url: "/grade",
        views: {
            "": {
                templateUrl: 'views/grade/grade.html',
                controller: 'GradeCtrl'
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
    .state('scoreStatistics', {
        url: "/scoreStatistics",
        views: {
            "": {
                templateUrl: 'views/grade/statistics.html',
                controller: 'GradeCtrl'
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
    .state('gradeSetting', {
        url: "/gradeSetting",
        views: {
            "": {
                templateUrl: 'views/grade/setting.html',
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
    .state('visit', {
        url: "/visit",
        views: {
            "": {
                templateUrl: 'views/checkIn/visit.html',
                controller: 'VisitCtrl'
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
    .state('key', {
        url: "/key",
        views: {
            "": {
                templateUrl: 'views/checkIn/key.html',
                controller: 'VisitCtrl'
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
    .state('late', {
        url: "/late",
        views: {
            "": {
                templateUrl: 'views/checkIn/late.html',
                controller: 'VisitCtrl'
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
    .state('floor', {
        url: "/floor",
        views: {
            "": {
                templateUrl: 'views/floor/tree.html',
                controller: 'FloorCtrl'
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
    .state('room', {
        url: "/room",
        views: {
            "": {
                templateUrl: 'views/floor/room.html',
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
    .state('type', {
        url: "/type",
        views: {
            "": {
                templateUrl: 'views/floor/type.html',
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
    .state('class', {
        url: "/class",
        views: {
            "": {
                templateUrl: 'views/collect/tree.html',
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
    .state('student', {
        url: "/student",
        views: {
            "": {
                templateUrl: 'views/collect/student.html',
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
    .state('stay', {
        url: "/stay",
        views: {
            "": {
                templateUrl: 'views/collect/stay.html',
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
    .state('term', {
        url: "/term",
        views: {
            "": {
                templateUrl: 'views/grade/term.html',
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
    .state('list', {
        url: "/list",
        views: {
            "": {
                templateUrl: 'views/list-tree.html',
                controller: 'ListCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            },
            'modal':{
                templateUrl: 'views/add.html',
                controller: 'ListCtrl'
            }
        }
    })
    .state('list1', {
        url: "/list1",
        views: {
            "": {
                templateUrl: 'views/list-normal.html',
                controller: 'ListCtrl'
            },
            "aside": {
                templateUrl: "views/aside.html",
                controller: 'AsideCtrl'
            },
            "header": {
                templateUrl: "views/header.html",
                controller: 'HeaderCtrl'
            },
            'modal':{
                templateUrl: 'views/add.html',
                controller: 'ListCtrl'
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
  
Date.prototype.Format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month 
        "d+": this.getDate(), //day 
        "h+": this.getHours(), //hour 
        "m+": this.getMinutes(), //minute 
        "s+": this.getSeconds(), //second 
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
        "S": this.getMilliseconds() //millisecond 
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}