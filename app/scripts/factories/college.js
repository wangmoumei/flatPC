angular.module('flatpcApp')
.factory('CollegeService',['$http', 'AppConfig',function($http, AppConfig){
    var getList = function(schoolcode){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/get_list/?schoolcode='+schoolcode+'&token=123';
        return $http.get(url);
    }
    var getGrade = function(){
        var grades = [];
        var now = new Date().getFullYear();
        for(var i = 2012 ; i < now + 3 ; i++ ){
            grades.push(i+'级');
        }
        return grades;
    }
    var addCollege = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/add_college/';
        return $http.get(url,param);
    }
    var editCollege = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/edit_college/';
        return $http.get(url,param);
    }
    var delCollege = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/del_college/';
        return $http.get(url,param);
    }
    var addClass = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/add_class/';
        return $http.get(url,param);
    }
    var editClass = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/edit_class/';
        return $http.get(url,param);
    }
    var delClass = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/del_class/';
        return $http.get(url,param);
    }
    return {
        getList:getList,
        addCollege:addCollege,
        editCollege:editCollege,
        delCollege:delCollege,
        addClass:addClass,
        editClass:editClass,
        delClass:delClass,
        getGrade:getGrade
    }
}]);