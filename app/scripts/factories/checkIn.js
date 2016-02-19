angular.module('flatpcApp')
.factory('CheckInService',['$http', 'AppConfig',function($http, AppConfig){
    var getVisitList = function (param) {
        var url = AppConfig.WEB_ROOT + 'register/visitrecord/get_list/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=123'
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.name?('&name='+param.name):'')
        + (param.studentnumber?('&studentnumber='+param.studentnumber):'')
        + (param.campusid?('&campusid='+param.campusid):'')
        + (param.liveareaid?('&liveareaid='+param.liveareaid):'')
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.status>0?('&status='+param.status):'')
        + (param.orderfield?('&orderfield='+param.orderfield):'')
        + (param.ordertype?('&ordertype='+param.ordertype):'');
        return $http.get(url);
    }
    var addVisit = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/occupancy/add_occupancy/';
        return $http.get(url,param);
    }
    return {
        getVisitList:getVisitList,
        addVisit:addVisit
    }
}]);