'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.factory('authority', ['$rootScope','AppConfig','$location',function ($rootScope,AppConfig,$location) {
    
    var transform = function(name){
        
        name = name || "";
        switch (name){
            case "login":
                return null;
                break;
            case "index":
                if($rootScope.sysMenu){
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
                        if(menuCheck(12)){
                            menus.push('role');
                        }else if(menuCheck(13)){
                            menus.push('admin');
                        }else menus.push(' ');
                    }
                    menus.push(' ')
                    return menus;
                }
                break;
            case 'flat':
                if(menuCheck(18))
                    return ['flat','flat','flat'];
                else
                    $location.path('/index');
                break;
            case 'college':
                if(menuCheck(19))
                    return ['flat','flat','college'];
                else
                    $location.path('/index');
                break;
            case 'live':
                if(menuCheck(27))
                    return ['flat','flat','live'];
                else
                    $location.path('/index');
                break;
            case 'change':
                if(menuCheck(28))
                    return ['flat','flat','change'];
                else
                    $location.path('/index');
                break;
            case 'quit':
                if(menuCheck(29))
                    return ['flat','flat','quit'];
                else
                    $location.path('/index');
                break;
            case 'check':
                if(menuCheck(30))
                    return ['flat','flat','check'];
                else
                    $location.path('/index');
                break;
            case 'grade':
                if(menuCheck(60))
                    return ['flat','grade','grade'];
                else
                    $location.path('/index');
                break;
            case 'visit':
                if(menuCheck(73))
                    return ['flat','check','visit'];
                else
                    $location.path('/index');
                break;
            case 'key':
                if(menuCheck(74))
                    return ['flat','check','key'];
                else
                    $location.path('/index');
                break;
            case 'late':
                if(menuCheck(75))
                    return ['flat','check','late'];
                else
                    $location.path('/index');
                break;
            case 'scoreStatistics':
                if(menuCheck(61))
                    return ['flat','grade','scoreStatistics'];
                else
                    $location.path('/index');
                break;
            case 'gradeSetting':
                if(menuCheck(62))
                    return ['flat','grade','gradeSetting'];
                else
                    $location.path('/index');
                break;
            case 'floor':
                if(menuCheck(125))
                    return ['data','floor','floor'];
                else
                    $location.path('/index');
                break;
            case 'room':
                if(menuCheck(128))
                    return ['data','floor','room'];
                else
                    $location.path('/index');
                break;
            case 'type':
                if(menuCheck(130))
                    return ['data','floor','type'];
                else
                    $location.path('/index');
                break;
            case 'student':
                if(menuCheck(108))
                    return ['data','collect','student'];
                else
                    $location.path('/index');
                break;
            case 'stay':
                if(menuCheck(129))
                    return ['data','collect','stay'];
                else
                    $location.path('/index');
                break;
            case 'class':
                if(menuCheck(107))
                    return ['data','collect','class'];
                else
                    $location.path('/index');
                break;
            case 'term':
                if(menuCheck(104))
                    return ['data','data','term'];
                else
                    $location.path('/index');
                break;
            case 'user':
                if(menuCheck(114))
                    return ['admin','admin','user'];
                else
                    $location.path('/index');
                break;
            case 'admin':
                if(menuCheck(111))
                    return ['admin','admin','admin'];
                else
                    $location.path('/index');
                break;
            case 'group':
                if(menuCheck(117))
                    return ['admin','admin','group'];
                else
                    $location.path('/index');
                break;
            case 'role':
                if(menuCheck(123))
                    return ['admin','role','role'];
                else
                    $location.path('/index');
                break;
            case 'template':
                if(menuCheck(124))
                    return ['admin','role','template'];
                else
                    $location.path('/index');
                break;
            case 'menu':
                if(menuCheck(127))
                    return ['admin','role','menu'];
                else
                    $location.path('/index');
                break;
        }
        if(AppConfig.nodeIds.length < 2) $location.path('/login');
        return null;
    };
    var check = function () {
        AppConfig.adminId = localStorage.adminId;
        AppConfig.token = localStorage.token;
        AppConfig.nodeIds = ',' + localStorage.nodeIds + ',';
        AppConfig.schoolCode = localStorage.schoolCode;
        AppConfig.userName = localStorage.userName;
        AppConfig.roleName = localStorage.roleName;
        AppConfig.roleId = localStorage.roleId;
        AppConfig.userAccount = localStorage.userAccount;
        AppConfig.isOpenBed = localStorage.isOpenBed;
        if(AppConfig.adminId && AppConfig.token && AppConfig.nodeIds && AppConfig.schoolCode && AppConfig.userName && AppConfig.roleName && AppConfig.roleId && AppConfig.userAccount){
            return true;
        }
        else return false;
    }
    var menuCheck = function(menu){
        if(AppConfig.nodeIds.length < 2) $location.path('/login');
        return new RegExp(',' + menu + ',' ).test(AppConfig.nodeIds);
    }
    return {
        check:check,
        transform:transform,
        menuCheck:menuCheck
    }
}]);
