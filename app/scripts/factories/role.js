angular.module('flatpcApp')
.factory('RoleService',['$http', 'AppConfig',function($http, AppConfig){
    var getList = function(param){
        var url = AppConfig.WEB_ROOT + 'rolemanage/roles/get_list/?schoolcode='+AppConfig.schoolCode
        +'&token='+AppConfig.token
        +('&type=' + param.type || 1)
        +(param.epage?'&epage='+param.epage:'')
        +(param.pagesize?'&pagesize='+param.pagesize:'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var addRole = function(param){
        param.token = param.token || AppConfig.token;
        var url = AppConfig.WEB_ROOT + 'accountmanage/Roles/add/';
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
    var editRole = function(param){
        param.token = param.token || AppConfig.token;
        var url = AppConfig.WEB_ROOT + 'accountmanage/Roles/edit/';
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
    var delRole = function(param){
        param.token = param.token || AppConfig.token;
        var url = AppConfig.WEB_ROOT + 'accountmanage/Roles/del/';
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
    var changeRole = function(param){
        param.token = param.token || AppConfig.token;
        var url = AppConfig.WEB_ROOT + 'accountmanage/Roles/edit_status/';
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
    var setRole = function(param){
        param.token = param.token || AppConfig.token;
        var url = AppConfig.WEB_ROOT + 'accountmanage/Roles/edit_nodes/';
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
    var getMenuList = function(param){
        var url = AppConfig.WEB_ROOT + 'rolemanage/setups/get_list/?'
        +'token='+AppConfig.token
        +(param.isschool?'&isschool='+param.isschool:'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var addMenu = function(param){
        var url = AppConfig.WEB_ROOT + 'rolemanage/setups/add/';
        param.token = param.token || AppConfig.token;
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
    var editMenu = function(param){
        var url = AppConfig.WEB_ROOT + 'rolemanage/setups/edit/';
        param.token = param.token || AppConfig.token;
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
    var delMenu = function(param){
        var url = AppConfig.WEB_ROOT + 'rolemanage/setups/del/';
        param.token = param.token || AppConfig.token;
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
    var changeMenu = function(param){
        var url = AppConfig.WEB_ROOT + 'rolemanage/setups/edit_status/';
        param.token = param.token || AppConfig.token;
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
        addRole:addRole,
        editRole:editRole,
        delRole:delRole,
        changeRole:changeRole,
        setRole:setRole,
        getMenuList:getMenuList,
        addMenu:addMenu,
        editMenu:editMenu,
        delMenu:delMenu,
        changeMenu:changeMenu
    }
}]);