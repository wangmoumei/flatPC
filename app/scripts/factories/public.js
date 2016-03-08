angular.module('flatpcApp')
.factory('PublicService',['$http', 'AppConfig',function($http, AppConfig){
    var imgUpload = function(param){
        var url = AppConfig.WEB_ROOT + 'public/uploadfile/upload_img/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url);
    }
    return {
        imgUpload:imgUpload
    }
}]);