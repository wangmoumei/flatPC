angular.module('flatpcApp')
.factory('RuleService',['$http', 'AppConfig',function($http, AppConfig){
    var getList = function(){
        var url = AppConfig.WEB_ROOT + 'evaluation/llsetups/get_type_list/?schoolcode='+AppConfig.schoolCode+'&token=' + AppConfig.token;
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var addRule = function(param){
        var url = AppConfig.WEB_ROOT + 'evaluation/llsetups/add_type/';
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
    var editRule = function(param){
        var url = AppConfig.WEB_ROOT + 'evaluation/llsetups/edit_type/';
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
    var delRule = function(param){
        var url = AppConfig.WEB_ROOT + 'evaluation/llsetups/del_type/';
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
        addRule:addRule,
        editRule:editRule,
        delRule:delRule,
    }
}]);