angular.module('flatpcApp')
.factory('UserService',['$http', 'AppConfig',function($http, AppConfig){
    var getList = function(param){
        var url = AppConfig.WEB_ROOT + 'accountmanage/users/get_list/?schoolcode=' + AppConfig.schoolCode
        +'&token='+AppConfig.token
        + (param && param.groupid?('&groupid=' + param.groupid):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var addUser = function(param){
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'accountmanage/users/add/';
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
    var editUser = function(param){
        param.token = param.token || AppConfig.token;
        var url = AppConfig.WEB_ROOT + 'accountmanage/users/edit/';
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
    var delUser = function(param){
        param.token = param.token || AppConfig.token;
        var url = AppConfig.WEB_ROOT + 'accountmanage/users/del/';
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
    var getGroupList = function(param){
        var url = AppConfig.WEB_ROOT + 'accountmanage/usergroups/get_list/?schoolcode='+AppConfig.schoolCode
        +'&token='+AppConfig.token;
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var addGroup = function(param){
        var url = AppConfig.WEB_ROOT + 'accountmanage/usergroups/add/';
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
    var editGroup = function(param){
        var url = AppConfig.WEB_ROOT + 'accountmanage/usergroups/edit/';
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
    var delGroup = function(param){
        var url = AppConfig.WEB_ROOT + 'accountmanage/usergroups/del/';
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
    return {
        getList:getList,
        addUser:addUser,
        editUser:editUser,
        delUser:delUser,
        getGroupList:getGroupList,
        addGroup:addGroup,
        editGroup:editGroup,
        delGroup:delGroup
    }
}]);