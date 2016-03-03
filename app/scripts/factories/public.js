angular.module('flatpcApp')
.factory('PublicService',['$http', 'AppConfig',function($http, AppConfig){
    var imgUpload = function(param){
        var url = AppConfig.WEB_ROOT + 'public/uploadfile/upload_img/';
        return $http.get(url);
    }
    return {
        imgUpload:imgUpload
    }
}]);