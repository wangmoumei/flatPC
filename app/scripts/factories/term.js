angular.module('flatpcApp')
.factory('TermService',['$http', 'AppConfig',function($http, AppConfig){
    var getList = function(){
        var url = AppConfig.WEB_ROOT + 'basesetup/timesetup/get_list/?schoolcode='+AppConfig.schoolcode+'&token=123';
        return $http.get(url);
    }
    var addYear = function(param){
        var url = AppConfig.WEB_ROOT + 'basesetup/timesetup/add_school_year/';
        return $http.get(url,param);
    }
    var editYear = function(param){
        var url = AppConfig.WEB_ROOT + 'basesetup/timesetup/edit_school_year/';
        return $http.get(url,param);
    }
    var delYear = function(param){
        var url = AppConfig.WEB_ROOT + 'basesetup/timesetup/del_school_year/';
        return $http.get(url,param);
    }
    var addTerm = function(param){
        var url = AppConfig.WEB_ROOT + 'basesetup/timesetup/add_semester/';
        return $http.get(url,param);
    }
    var editTerm = function(param){
        var url = AppConfig.WEB_ROOT + 'basesetup/timesetup/edit_semester/';
        return $http.get(url,param);
    }
    var delTerm = function(param){
        var url = AppConfig.WEB_ROOT + 'basesetup/timesetup/del_semester/';
        return $http.get(url,param);
    }
    return {
        getList:getList,
        addYear:addYear,
        editYear:editYear,
        delYear:delYear,
        addTerm:addTerm,
        editTerm:editTerm,
        delTerm:delTerm
    }
}]);