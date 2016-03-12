'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.factory('authority', ['$rootScope','AppConfig',function ($rootScope,AppConfig) {
    
    var transform = function(name){
        
        name = name || "";
        switch (name){
            case "login":
                return $rootScope.sysMenu;
                break;
            case "index":
                return $rootScope.sysMenu;
                break;
            case 'list':
                return $rootScope.sysMenu;
                break;
            case 'list1':
                return $rootScope.sysMenu;
                break;
                
            case 'flat':
                return ['flat','flat','flat'];
                break;
            case 'college':
                return ['flat','flat','college'];
                break;
            case 'live':
                return ['flat','flat','live'];
                break;
            case 'change':
                return ['flat','flat','change'];
                break;
            case 'quit':
                return ['flat','flat','quit'];
                break;
            case 'check':
                return ['flat','flat','check'];
                break;
            case 'grade':
                return ['flat','grade','grade'];
                break;
            case 'visit':
                return ['flat','check','visit'];
                break;
            case 'key':
                return ['flat','check','key'];
                break;
            case 'late':
                return ['flat','check','late'];
                break;
            case 'scoreStatistics':
                return ['flat','grade','scoreStatistics'];
                break;
            case 'gradeSetting':
                return ['flat','grade','gradeSetting'];
                break;
            case 'floor':
                return ['data','floor','floor'];
                break;
            case 'room':
                return ['data','floor','room'];
                break;
            case 'type':
                return ['data','floor','type'];
                break;
            case 'student':
                return ['data','collect','student'];
                break;
            case 'stay':
                return ['data','collect','stay'];
                break;
            case 'class':
                return ['data','collect','class'];
                break;
            case 'term':
                return ['data','data','term'];
                break;
            case 'user':
                return ['admin','admin','user'];
                break;
            case 'admin':
                return ['admin','admin','admin'];
                break;
            case 'group':
                return ['admin','admin','group'];
                break;
            case 'role':
                return ['admin','role','role'];
                break;
            case 'template':
                return ['admin','role','template'];
                break;
            case 'menu':
                return ['admin','role','menu'];
                break;
        }
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
    return {
        check:check,
        transform:transform
    }
}]);
