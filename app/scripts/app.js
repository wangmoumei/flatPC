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
    // 'ngCookies',
    // 'ngResource',
    // 'ngSanitize',
    'ui.router',
    // 'ngTouch',
    'frapontillo.bootstrap-switch'
  ])
  .constant('AppConfig',{
      WEB_ROOT:'http://120.55.84.193/Geese_Apartment/',
    //   WEB_ROOT:'http://ap.houqinbao.com/Geese_Apartment/',
    WEB_ROOT_MESSAGE:'http://120.55.84.193/Geese_Quality_Supervision/',
    FRAME:'http://code.houqinbao.com:3338/Apartment/',
    SHOWER:'http://code.houqinbao.com:3338/Shower/',
      schoolCode:0,
	  token:'',
      adminId:0,
      nodeIds:''
  }).run(['$rootScope', '$location', 'AppConfig','authority','$stateParams','$http',
		function($rootScope, $location, AppConfig,authority,$stateParams,$http) {
            //侧边栏收缩控制
            var w = document.documentElement.clientWidth||document.body.clientWidth;
            if(w < 1024) $rootScope.miniAside = true;
            
            $rootScope.routerInit = function(menu){
                $rootScope.sysMenu = [menu,menu,""];
            }
            $rootScope.menuCheck = authority.menuCheck;
            $rootScope.authority = '';
			$rootScope.$on('$stateChangeStart',
				function(event, toState, toParams, fromState, fromParams) {
                    if(authority.check()){
                        $rootScope.loginSwitch = true;
                    }else{
                        $location.path('/login');
                    }
                    $rootScope.sysMenu = authority.transform(toState.name);
                    $rootScope.loading = true;
                    // console.log(AppConfig.nodeIds)
            });
            $rootScope.$on('$stateChangeSuccess',
				function(event, toState, toParams, fromState, fromParams) {
                    
                    if(!$rootScope.sysMenu)$location.path('/index');

            });
            $rootScope.$on('$stateChangeError', 
                function(event, toState, toParams, fromState, fromParams, error){ 
                    sweetAlert("页面加载出错", "错误信息：" + error.status, "error");
            });
			
		}
	])
  .config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
    .state('login', {
        url: "/login",
        views: {
            "login": {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('nbdx', {
        url: "/nbdx",
        views: {
            "login": {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('hzsf', {
        url: "/hzsf",
        views: {
            "login": {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('cslg', {
        url: "/cslg",
        views: {
            "login": {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('sqxy', {
        url: "/sqxy",
        views: {
            "login": {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('sxwl', {
        url: "/sxwl",
        views: {
            "login": {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            }
        }
    })
    .state('index', {
        url: "/index?p",
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
    .state('flats', {
        url: "/flats",
        views: {
            "": {
                templateUrl: 'views/flat/flats.html',
                controller: 'FlatCtrls'
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
    .state('flat1', {
        url: "/flat1",
        views: {
            "": {
                templateUrl: 'views/flat/list-selectByFlat.html',
                controller: 'Flat1Ctrl'
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
                controller: 'ChangeCtrl'
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
                controller: 'QuitCtrl'
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
                controller: 'CheckCtrl'
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
    .state('graduation', {
        url: "/graduation",
        views: {
            "": {
                templateUrl: 'views/flat/graduation.html',
                controller: 'GraduationCtrl'
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
    .state('arrearage', {
        url: "/arrearage",
        views: {
            "": {
                templateUrl: 'views/flat/arrearage.html',
                controller: 'ArrearageCtrl'
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
    .state('holiday', {
        url: "/holiday",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'HolidayCtrl'
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
    .state('gradeForWeek', {
        url: "/gradeForWeek",
        views: {
            "": {
                templateUrl: 'views/grade/grade.html',
                controller: 'GradeForWeekCtrl'
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
    .state('gradeForDay', {
        url: "/gradeForDay",
        views: {
            "": {
                templateUrl: 'views/grade/grade.html',
                controller: 'GradeForDayCtrl'
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
    .state('gradeForMonth', {
        url: "/gradeForMonth",
        views: {
            "": {
                templateUrl: 'views/grade/grade.html',
                controller: 'GradeForMonthCtrl'
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
    .state('spot', {
        url: "/spot",
        views: {
            "": {
                templateUrl: 'views/grade/spot.html',
                controller: 'SpotCtrl'
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
    .state('gradeForSpot', {
        url: "/gradeForSpot",
        views: {
            "": {
                templateUrl: 'views/grade/grade.html',
                controller: 'GradeForSpotCtrl'
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
    .state('rule', {
        url: "/rule",
        views: {
            "": {
                templateUrl: 'views/grade/rule.html',
                controller: 'RuleCtrl'
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
                controller: 'StatisticsCtrl'
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
    .state('ruleStatistics', {
        url: "/ruleStatistics",
        views: {
            "": {
                templateUrl: 'views/grade/ruleStatistics.html',
                controller: 'RuleStatisticsCtrl'
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
    .state('appraiseStatistics', {
        url: "/appraiseStatistics",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'AppraiseStatisticsCtrl'
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
    .state('scoreStatisticsForCollege', {
        url: "/scoreStatisticsForCollege",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'ScoreStatisticsForCollegeCtrl'
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
    .state('ruleStatisticsForCollege', {
        url: "/ruleStatisticsForCollege",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'RuleStatisticsForCollegeCtrl'
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
    .state('appraiseStatisticsForCollege', {
        url: "/appraiseStatisticsForCollege",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'AppraiseStatisticsForCollegeCtrl'
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
                controller: 'GradeSettingCtrl'
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
    .state('ruleSetting', {
        url: "/ruleSetting",
        views: {
            "": {
                templateUrl: 'views/grade/ruleSetting.html',
                controller: 'RuleSettingCtrl'
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
    .state('appraiseSetting', {
        url: "/appraiseSetting",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'AppraiseSettingCtrl'
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
                controller: 'KeyCtrl'
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
                controller: 'LateCtrl'
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
    .state('flatManager', {
        url: "/flatManager",
        views: {
            "": {
                templateUrl: 'views/flatManager/manager.html',
                controller: 'FlatManagerCtrl'
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
    .state('counselor', {
        url: "/counselor",
        views: {
            "": {
                templateUrl: 'views/flatManager/counselor.html',
                controller: 'CounselorCtrl'
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
                controller: 'RoomCtrl'
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
                controller: 'TypeCtrl'
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
                controller: 'SchoolCtrl'
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
                controller: 'StudentCtrl'
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
        }
    })
    .state('term', {
        url: "/term",
        views: {
            "": {
                templateUrl: 'views/setting/term.html',
                controller: 'TermCtrl'
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
    .state('userList', {
        url: "/userList",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'UserListCtrl'
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
    //实名审核
    .state('verify', {
        url: "/verify",
        views: {
            "": {
                templateUrl: 'views/frame.html',
                controller: 'verifyCtrl'
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
    //认证方式
      .state('form', {
        url: "/form",
        views: {
            "": {
                templateUrl: 'views/approve.html',
                controller: 'formCtrl'
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
    //认证方式
      .state('identity', {
        url: "/identity",
        views: {
            "": {
                templateUrl: 'views/admin/identity.html',
                controller: 'identityCtrl'
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
    .state('user', {
        url: "/user",
        views: {
            "": {
                templateUrl: 'views/admin/user.html',
                controller: 'UserCtrl'
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
    .state('admin', {
        url: "/admin",
        views: {
            "": {
                templateUrl: 'views/admin/admin.html',
                controller: 'AdminCtrl'
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
    .state('group', {
        url: "/group",
        views: {
            "": {
                templateUrl: 'views/admin/group.html',
                controller: 'GroupCtrl'
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
    .state('role', {
        url: "/role",
        views: {
            "": {
                templateUrl: 'views/role/role.html',
                controller: 'RoleCtrl'
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
    .state('template', {
        url: "/template",
        views: {
            "": {
                templateUrl: 'views/role/template.html',
                controller: 'RoleTemplateCtrl'
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
    .state('menu', {
        url: "/menu",
        views: {
            "": {
                templateUrl: 'views/role/menu.html',
                controller: 'MenuSettingCtrl'
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
     .state('graduate', {
        url: "/leaveschool",
        views: {
            "": {
                templateUrl: 'views/grade/leaveschool.html',
                controller: 'leaveschoolCtrl'
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
    .state('graduatepeople', {
        url: "/leaveschoolpeople",
        views: {
            "": {
                templateUrl: 'views/grade/leaveschoolpeople.html',
                controller: 'leaveschoolpeopleCtrl'
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
     .state('newstudent', {
        url: "/newstudent",
        views: {
            "": {
                templateUrl: 'views/grade/newStudentAllocation.html',
                controller: 'newStudentCtrl'
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
            }
        }
    })
    .state('order', {
        url: "/order",
        views: {
            "": {
                templateUrl: 'views/shower/order.html',
                controller: 'orderCtrl'
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
    .state('showper', {
        url: "/showper",
        views: {
            "": {
                templateUrl: 'views/shower/personnel.html',
                controller: 'personnelCtrl'
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
    .state('showset', {
        url: "/showset",
        views: {
            "": {
                templateUrl: 'views/shower/setting.html',
                controller: 'settingCtrl'
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
    });
    $urlRouterProvider.otherwise('/login');
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