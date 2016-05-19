angular.module('flatpcApp')
.factory('PublicService',['$http', 'AppConfig',function($http, AppConfig){
    var imgUpload = function(param){
        var url = AppConfig.WEB_ROOT + 'public/uploadfile/upload_img/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': undefined
            },
            data:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url);
    }
    var login = function(param){
        var url = AppConfig.WEB_ROOT + 'public/login/login/';
        
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var loginMessage = function(param){
        var url = AppConfig.WEB_ROOT_MESSAGE + 'message/account/pcaccountlogin/';
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
    var logout = function(param){
        var url = AppConfig.WEB_ROOT + 'public/login/login_out/?token=' + AppConfig.token || '';
        
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var password = function(param){
        var url = AppConfig.WEB_ROOT + 'public/login/edit_password/';
        
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var session = function(param){
        var url = AppConfig.WEB_ROOT + 'public/login/get_sessionid/';
        
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    return {
        imgUpload:imgUpload,
        login:login,
        logout:logout,
        password:password,
        session:session,
        loginMessage:loginMessage
    }
}]);