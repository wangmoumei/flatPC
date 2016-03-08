angular.module('flatpcApp')
.factory('AdminService',['$http', 'AppConfig',function($http, AppConfig){
    var getList = function(param){
        var url = AppConfig.WEB_ROOT + 'accountmanage/admins/get_list/?token='+AppConfig.token;
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var addAdmin = function(param){
        var url = AppConfig.WEB_ROOT + 'accountmanage/Admins/add/';
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
    var editAdmin = function(param){
        var url = AppConfig.WEB_ROOT + 'accountmanage/Admins/edit/';
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
    var delAdmin = function(param){
        var url = AppConfig.WEB_ROOT + 'accountmanage/Admins/del/';
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
    var getDictionary = function () {
        var url = AppConfig.WEB_ROOT + 'public/dictionary/get_list/?schoolcode='+AppConfig.schoolCode;
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    return {
        getList:getList,
        addAdmin:addAdmin,
        editAdmin:editAdmin,
        delAdmin:delAdmin,
        getDictionary:getDictionary
    }
}]);