angular.module('flatpcApp')
.factory('DailyService',['$http', 'AppConfig',function($http, AppConfig){
    var getLiveList = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/occupancy/get_list/?'
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
    var addLive = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/occupancy/add_occupancy/';
        return $http.get(url,param);
    }
    var backLive = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/occupancy/back/';
        return $http.get(url,param);
    }
    var passLive = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/occupancy/pass/';
        return $http.get(url,param);
    }
    var cancelLive = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/occupancy/cancel/';
        return $http.get(url,param);
    }
    var getChangeList = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/transfer/get_list/?'
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
    var addChange = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/transfer/add_occupancy/';
        return $http.get(url,param);
    }
    var backChange = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/transfer/back/';
        return $http.get(url,param);
    }
    var passChange = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/transfer/pass/';
        return $http.get(url,param);
    }
    var cancelChange = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/transfer/cancel/';
        return $http.get(url,param);
    }
    var getQuitList = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/exitroom/get_list/?'
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
    var addQuit = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/exitroom/add_occupancy/';
        return $http.get(url,param);
    }
    var backQuit = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/exitroom/back/';
        return $http.get(url,param);
    }
    var passQuit = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/exitroom/pass/';
        return $http.get(url,param);
    }
    var cancelQuit = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/exitroom/cancel/';
        return $http.get(url,param);
    }
    var getCheckList = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/occupancy/get_list/?'
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
    
    return {
        getLiveList:getLiveList,
        addLive:addLive,
        backLive:backLive,
        passLive:passLive,
        cancelLive:cancelLive,
        getChangeList:getChangeList,
        addChange:addChange,
        backChange:backChange,
        passChange:passChange,
        cancelChange:cancelChange,
        getQuitList:getQuitList,
        addQuit:addQuit,
        backQuit:backQuit,
        passQuit:passQuit,
        cancelQuit:cancelQuit,
        getCheckList:getCheckList
    }
}]);