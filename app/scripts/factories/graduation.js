angular.module('flatpcApp')
.factory('GraduationService',['$http', 'AppConfig',function($http, AppConfig){
    var getList = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/checkout/get_list/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.campusid?('&campusid='+param.campusid):'')
        + (param.liveareaid?('&areaname='+param.liveareaid):'')
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.collegeid?('&collegeid='+param.collegeid):'')
        + (param.classid?('&classid='+param.classid):'')
        + (param.status?('&status='+param.status):'')
        + (param.orderfield?('&orderfield='+param.orderfield):'')
        + (param.ordertype?('&ordertype='+param.ordertype):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var add = function(param){
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = "";
        if(param.type)
            url = AppConfig.WEB_ROOT + 'apartment/checkout/add_list_exitroom/';
        else
            url = AppConfig.WEB_ROOT + 'apartment/checkout/add_exitroom/';
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
    var check = function(param){
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = "";
        if(param.type)
            url = AppConfig.WEB_ROOT + 'apartment/checkout/add_exitroom/';
        else
            url = AppConfig.WEB_ROOT + 'apartment/checkout/audit_exitroom/';
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
    var importData = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/arrears/import_room_arrears_data/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': undefined
            },
            data:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.post(url,param,{ headers: { 'Content-Type': undefined }});
    }
    var getImport = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/arrears/get_import_list/?'
        + 'schoolcode='+ AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.orderfield?('&orderfield='+param.orderfield):'')
        + (param.ordertype?('&ordertype='+param.ordertype):'');
        return $http.get(url,param);
    }
    var downloadOriginal = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/arrears/room_sample_table/?'
        + 'schoolcode='+ AppConfig.schoolCode + '&token=' + AppConfig.token;
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var downloadImport = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/arrears/export_error/?importid=' + param
        + "&token=" + AppConfig.token;
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var getListByStudent = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/arrears/get_stu_arrears_list/?schoolcode=' + AppConfig.schoolCode
        +'&token='+AppConfig.token
        + (param && param.groupid?('&groupid=' + param.groupid):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var getListByRoom = function(param){
        var url = AppConfig.WEB_ROOT + 'apartment/arrears/get_room_arrears_list/?schoolcode=' + AppConfig.schoolCode
        +'&token='+AppConfig.token
        + (param && param.groupid?('&groupid=' + param.groupid):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var deal = function(param){
        param.token = param.token || AppConfig.token;
        var url = "";
        if(param.type)
            url = AppConfig.WEB_ROOT + 'apartment/arrears/deal_room_arrears/';
        else
            url = AppConfig.WEB_ROOT + 'apartment/arrears/deal_stu_arrears/';
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
        
        importData:importData,
        getImport:getImport,
        downloadOriginal:downloadOriginal,
        downloadImport:downloadImport,
        getListByStudent:getListByStudent,
        getListByRoom:getListByRoom,
        deal:deal,
        getList:getList,
        add:add,
        check:check
    }
}]);