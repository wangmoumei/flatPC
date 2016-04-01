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
    var getListByRoom = function (param) {
        var url = AppConfig.WEB_ROOT + 'evaluation/lllegal/get_special/?schoolcode='+AppConfig.schoolCode+'&token=' + AppConfig.token
        + '&specialid=' + (param.specialid||'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var checkByRoom = function(param){
        var url = AppConfig.WEB_ROOT + 'evaluation/lllegal/special/';
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
    var getListByFlat = function (param) {
        console.log(param);
        var url = AppConfig.WEB_ROOT + 'evaluation/lllegal/get_list/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + '&enddate=' + (param.endtime || new Date().Format('yyyy-MM-dd')) 
        + '&startdate=' + (param.starttime || new Date().Format('yyyy-MM-dd'))
        + (param.campusid?('&campusid='+param.campusid):'')
        + (param.liveareaid?('&liveareaid='+param.liveareaid):'')
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.search?('&roomname='+param.search):'')
        + (param.source>-1?('&source='+param.source):'')
        + (param.orderfield?('&orderfield='+param.orderfield):'')
        + (param.ordertype?('&ordertype='+param.ordertype):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var addCheck = function(param){
        var url = AppConfig.WEB_ROOT + 'evaluation/lllegal/add/';
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
    var editCheck = function(param){
        var url = AppConfig.WEB_ROOT + 'evaluation/lllegal/edit/';
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
    var delCheck = function(param){
        var url = AppConfig.WEB_ROOT + 'evaluation/lllegal/del/';
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
    var download = function (param) {
        var url = AppConfig.WEB_ROOT + 'evaluation/lllegal/get_list_export/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + '&enddate=' + (param.endtime || new Date().Format('yyyy-MM-dd')) 
        + '&startdate=' + (param.starttime || new Date().Format('yyyy-MM-dd'))
        + (param.campusid?('&campusid='+param.campusid):'')
        + (param.liveareaid?('&liveareaid='+param.liveareaid):'')
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.search?('&roomname='+param.search):'')
        + (param.source>-1?('&source='+param.source):'')
        + (param.orderfield?('&orderfield='+param.orderfield):'')
        + (param.ordertype?('&ordertype='+param.ordertype):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var getStatistics = function(param){
        param.type = param.type || 0;
        var url = "";
        // console.log(param);
        switch (param.type) {
            case 0:
            case '0':
            case 1:
            case '1':
            case 2:
            case '2':
                url = AppConfig.WEB_ROOT + 'evaluation/llstatistics/get_list/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + (param.campusid?'&campusid='+param.campusid :'' ) + (param.liveareaid?'&liveareaid='+param.liveareaid :'' )
                + '&startdate=' + (param.starttime || new Date().Format('yyyy-MM-dd'))
                + '&enddate=' + (param.endtime || new Date().Format('yyyy-MM-dd'));
                break;
            case 3:
                url = AppConfig.WEB_ROOT + 'evaluation/llstatistics/get_room_list/?'
                + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
                + (param.flatid?'&flatid='+param.flatid :'' )
                + '&startdate=' + (param.starttime || new Date().Format('yyyy-MM-dd'))
                + '&enddate=' + (param.endtime || new Date().Format('yyyy-MM-dd'));
                break;
            default:
                break;
        }
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    var getStatisticsData = function(param){
        var url = "";
        url = AppConfig.WEB_ROOT + 'evaluation/llstatistics/get_date_list/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&startdate=' + (param.starttime || new Date().Format('yyyy-MM-dd'))
        + '&enddate=' + (param.endtime || new Date().Format('yyyy-MM-dd'))
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.liveareaid?('&liveareaid='+param.liveareaid):'')
        + (param.campusid?('&campusid='+param.campusid):'')
        + (param.roomid?('&roomid='+param.roomid):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    var downloadStatistics = function(param){
        var url = "";
        url = AppConfig.WEB_ROOT + 'evaluation/llstatistics/get_date_export/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&startdate=' + (param.starttime || new Date().Format('yyyy-MM'))
        + '&enddate=' + (param.endtime || new Date().Format('yyyy-MM'))
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.liveareaid?('&liveareaid='+param.liveareaid):'')
        + (param.campusid?('&campusid='+param.campusid):'')
        + (param.roomid?('&roomid='+param.roomid):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
    return {
        getList:getList,
        addRule:addRule,
        editRule:editRule,
        delRule:delRule,
        getListByRoom:getListByRoom,
        checkByRoom:checkByRoom,
        getListByFlat:getListByFlat,
        addCheck:addCheck,
        editCheck:editCheck,
        delCheck:delCheck,
        download:download,
        getStatistics:getStatistics,
        getStatisticsData:getStatisticsData,
        downloadStatistics:downloadStatistics
    }
}]);