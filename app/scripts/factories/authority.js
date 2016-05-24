'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.factory('authority', ['$rootScope','AppConfig','$state',function ($rootScope,AppConfig,$state) {
    
    var transform = function(name){
        
        name = name || "";
        switch (name){
            case "login":
            case "nbdx":
            case "hzsf":
            case "cslg":
            case "sqxy":
            case "sxwl":
                return ['login'];
            case "index":
                if($rootScope.sysMenu && $rootScope.sysMenu[0]!='login'){
                    return $rootScope.sysMenu;
                }else{
                    var menus = [];
                    if(menuCheck(1)){
                        menus.push('flat');
                        if(menuCheck(6)){
                            menus.push('flat');
                        }else if(menuCheck(7)){
                            menus.push('grade');
                        }else if(menuCheck(8)){
                            menus.push('check');
                        }else menus.push(' ');
                    }else if(menuCheck(2)){
                        menus.push('data');
                        if(menuCheck(9)){
                            menus.push('data');
                        }else if(menuCheck(10)){
                            menus.push('collect');
                        }else if(menuCheck(11)){
                            menus.push('floor');
                        }else menus.push(' ');
                    }else if(menuCheck(3)){
                        menus.push('admin');
                        if(menuCheck(13)){
                            menus.push('admin');
                        }else if(menuCheck(12)){
                            menus.push('role');
                        }else menus.push(' ');
                    }
                    menus.push(' ')
                    return menus;
                }
            case 'flat':
                if(menuCheck(18))
                    return ['flat','flat','flat'];
                else
                    return null;
            case 'college':
                if(menuCheck(19))
                    return ['flat','flat','college'];
                else
                    return null;
            case 'live':
                if(menuCheck(27))
                    return ['flat','flat','live'];
                else
                    return null;
            case 'change':
                if(menuCheck(28))
                    return ['flat','flat','change'];
                else
                    return null;
            case 'quit':
                if(menuCheck(29))
                    return ['flat','flat','quit'];
                else
                    return null;
            case 'check':
                if(menuCheck(30))
                    return ['flat','flat','check'];
                else
                    return null;
            case 'graduation':
            // return ['flat','flat','graduation'];
                if(menuCheck(32))
                    return ['flat','flat','graduation'];
                else
                    return null;
            case 'arrearage':
            // return ['flat','flat','arrearage'];
                if(menuCheck(342))
                    return ['flat','flat','arrearage'];
                else
                    return null;
            case 'holiday':
                if(menuCheck(369))
                    return ['flat','flat','holiday'];
                else
                    return null;
            case 'gradeForWeek':
                if(menuCheck(60))
                    return ['flat','grade','gradeForWeek'];
                else
                    return null;
            case 'gradeForDay':
                if(menuCheck(277))
                    return ['flat','grade','gradeForDay'];
                else
                    return null;
            case 'gradeForMonth':
                if(menuCheck(278))
                    return ['flat','grade','gradeForMonth'];
                else
                    return null;
            case 'spot':
            // return ['flat','grade','spot'];
            case 'gradeForSpot':
            // return ['flat','grade','gradeForSpot'];
                if(menuCheck(279))
                    return ['flat','grade','gradeForSpot'];
                else
                    return null;
            case 'rule':
                if(menuCheck(307))
                    return ['flat','grade','rule'];
                else
                    return null;
            case 'visit':
                if(menuCheck(73))
                    return ['flat','check','visit'];
                else
                    return null;
            case 'key':
                if(menuCheck(74))
                    return ['flat','check','key'];
                else
                    return null;
            case 'late':
                if(menuCheck(75))
                    return ['flat','check','late'];
                else
                    return null;
            case 'flatManager':
            // return ['flat','flatManager','flatManager'];
                if(menuCheck(323))
                    return ['flat','flatManager','flatManager'];
                else
                    return null;
            case 'counselor':
            // return ['flat','flatManager','counselor'];
                if(menuCheck(340))
                    return ['flat','flatManager','counselor'];
                else
                    return null;
            case 'scoreStatistics':
                if(menuCheck(301))
                    return ['flat','grade','scoreStatistics'];
                else
                    return null;
             case 'ruleStatistics':
                if(menuCheck(303))
                    return ['flat','grade','ruleStatistics'];
                else
                    return null;    
            case 'appraiseStatistics':
                if(menuCheck(304))
                    return ['flat','grade','appraiseStatistics'];
                else
                    return null;  
            case 'scoreStatisticsForCollege':
                if(menuCheck(364))
                    return ['flat','grade','scoreStatisticsForCollege'];
                else
                    return null;
             case 'ruleStatisticsForCollege':
                if(menuCheck(365))
                    return ['flat','grade','ruleStatisticsForCollege'];
                else
                    return null;    
            case 'appraiseStatisticsForCollege':
                if(menuCheck(363))
                    return ['flat','grade','appraiseStatisticsForCollege'];
                else
                    return null;  
            case 'gradeSetting':
                if(menuCheck(62))
                    return ['flat','grade','gradeSetting'];
                else
                    return null;
            case 'ruleSetting':
                if(menuCheck(266))
                    return ['flat','grade','ruleSetting'];
                else
                    return null;
            case 'appraiseSetting':
                if(menuCheck(361))
                    return ['flat','grade','appraiseSetting'];
                else
                    return null;
            case 'floor':
                if(menuCheck(125))
                    return ['data','floor','floor'];
                else
                    return null;
            case 'room':
                if(menuCheck(128))
                    return ['data','floor','room'];
                else
                    return null;
            case 'type':
                if(menuCheck(130))
                    return ['data','floor','type'];
                else
                    return null;
            case 'student':
                if(menuCheck(108))
                    return ['data','collect','student'];
                else
                    return null;
            case 'stay':
                if(menuCheck(129))
                    return ['data','collect','stay'];
                else
                    return null;
            case 'class':
                if(menuCheck(107))
                    return ['data','collect','class'];
                else
                    return null;
            case 'term':
                if(menuCheck(104))
                    return ['data','data','term'];
                else
                    return null;
            case 'userList':
                if(menuCheck(357))
                    return ['data','center','userList'];
                else
                    return null;
           case 'verify':
                if(menuCheck(358))
                    return ['data','center','verify'];
                else
                    return null;
           case 'form':
                if(menuCheck(359))
                    return ['data','center','form'];
                else
                    return null;
            case 'user':
                if(menuCheck(114))
                    return ['admin','admin','user'];
                else
                    return null;
            case 'admin':
                if(menuCheck(111))
                    return ['admin','admin','admin'];
                else
                    return null;
            case 'group':
                if(menuCheck(117))
                    return ['admin','admin','group'];
                else
                    return null;
            case 'role':
                if(menuCheck(123))
                    return ['admin','role','role'];
                else
                    return null;
            case 'template':
                if(menuCheck(124))
                    return ['admin','role','template'];
                else
                    return null;
            case 'menu':
                if(menuCheck(127))
                    return ['admin','role','menu'];
                else
                    return null;
            case 'graduate':
                if(menuCheck(377))
                    return ['graduate','graduate','leaveschool'];
                else
                    return null;
            case 'graduatepeople':
                if(menuCheck(371))
                    return ['graduate','graduate','leaveschoolpeople'];
                else
                    return null;
                    
        }
        return null;
    };
    var check = function () {
        AppConfig.adminId = sessionStorage.adminId;
        AppConfig.token = sessionStorage.token;
        AppConfig.nodeIds = ',' + sessionStorage.nodeIds + ',';
        AppConfig.schoolCode = sessionStorage.schoolCode;
        AppConfig.userName = sessionStorage.userName;
        AppConfig.roleName = sessionStorage.roleName;
        AppConfig.roleId = sessionStorage.roleId;
        AppConfig.userAccount = sessionStorage.userAccount;
        AppConfig.isOpenBed = sessionStorage.isOpenBed;
        
        AppConfig.week = sessionStorage.week || 1;
        AppConfig.month = sessionStorage.month || 1;
        AppConfig.day = sessionStorage.day || 1;
        AppConfig.bed = sessionStorage.bed || 1;
        AppConfig.pass = sessionStorage.pass || 1;
        AppConfig.photo = sessionStorage.photo || 1;
        AppConfig.role = sessionStorage.role || 1;
        AppConfig.takephoto = sessionStorage.takephoto || 1;
        AppConfig.check = sessionStorage.check || 1;
        if(AppConfig.adminId && AppConfig.token && AppConfig.nodeIds && AppConfig.schoolCode && AppConfig.userName && AppConfig.roleName && AppConfig.roleId && AppConfig.userAccount){
            return true;
        }
        else return false;
    }
    var menuCheck = function(menu){
        if(AppConfig.nodeIds.length < 2) $location.path('/login');
        // console.log(AppConfig.nodeIds);
        return new RegExp(',' + menu + ',' ).test(AppConfig.nodeIds);
    }
    return {
        check:check,
        transform:transform,
        menuCheck:menuCheck
    }
}]);
