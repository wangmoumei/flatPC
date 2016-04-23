angular.module('flatpcApp')
.factory('CollegeService',['$http', 'AppConfig',function($http, AppConfig){
    var getList = function(schoolcode){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/get_list/?schoolcode='+schoolcode+'&token=' + AppConfig.token;
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var getGrade = function(){
        var grades = [];
        var now = new Date().getFullYear();
        for(var i = 2010 ; i < now + 3 ; i++ ){
            grades.push(i+'级');
        }
        return grades;
    }
    var addCollege = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/add_college/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    }
    var editCollege = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/edit_college/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    }
    var delCollege = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/del_college/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    }
    var addClass = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/add_class/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    }
    var editClass = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/edit_class/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    }
    var delClass = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/del_class/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url,param);
    }
    var getListByGrade = function(schoolcode){
        var url = AppConfig.WEB_ROOT + 'stmessage/collegeclass/get_list_class/?schoolcode='+schoolcode+'&token=' + AppConfig.token;
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var getManagerList = function(param){
        var url = AppConfig.WEB_ROOT + 'management/instructor/get_list_instructor/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.useraccount?('&useraccount='+param.useraccount):'')
        + (param.username?('&username='+param.username):'')
        + (param.jobnumber?('&jobnumber='+param.jobnumber):'')
        + (param.collegeid?('&collegeid='+param.collegeid):'')
        + (param.classid?('&classid='+param.classid):'')
        + (param.orderfield?('&orderfield='+param.orderfield):'')
        + (param.ordertype?('&ordertype='+param.ordertype):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var addManager = function(param){
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'management/instructor/add_instructor_admin/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.post(url,param,{'Content-Type':'application/x-www-form-urlencoded'});
    }
    var editManager = function(param){
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'management/instructor/edit_instructor_admin/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.post(url,param,{'Content-Type':'application/x-www-form-urlencoded'});
    }
    var delManager = function(param){
        param.token = param.token || AppConfig.token;
        var url = AppConfig.WEB_ROOT + 'management/instructor/del_instructor_admin/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.post(url,param,{'Content-Type':'application/x-www-form-urlencoded'});
    }
    return {
        getList:getList,
        addCollege:addCollege,
        editCollege:editCollege,
        delCollege:delCollege,
        addClass:addClass,
        editClass:editClass,
        delClass:delClass,
        getGrade:getGrade,
        getListByGrade:getListByGrade,
        getManagerList:getManagerList,
        addManager:addManager,
        editManager:editManager,
        delManager:delManager
    }
}]);