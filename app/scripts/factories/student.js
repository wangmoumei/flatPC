angular.module('flatpcApp')
.factory('StudentService',['$http', 'AppConfig',function($http, AppConfig){
    var getStudent = function(studentid){
        var url = AppConfig.WEB_ROOT + '/apartment/floor/get_student_message/?student_key=' + studentid + '&token=123';
        return $http.get(url);
    }
    return {
        getStudent:getStudent
    }
}]);