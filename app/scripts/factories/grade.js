angular.module('flatpcApp')
.factory('GradeService',['$http', 'AppConfig',function($http, AppConfig){
    var getListByFlat = function (param) {
        var url = AppConfig.WEB_ROOT + 'evaluation/hygienegrade/get_list/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&flatid=' + (param.flatid || "") + '&semesterid=' + (param.semesterid || "")
        + '&currentweek=' + (param.currentweek || "");
        return $http.get(url);
    };
    var setGrade = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolcode;
        param.adminid = param.adminid || AppConfig.adminid;
        var url = AppConfig.WEB_ROOT + 'evaluation/hygienegrade/add_room_score/';
        return $http.get(url,param);
    };
    var editGrade = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolcode;
        param.adminid = param.adminid || AppConfig.adminid;
        var url = AppConfig.WEB_ROOT + 'evaluation/hygienegrade/edit_room_score/';
        return $http.get(url,param);
    };
    var getGrade = function (param) {
        var url = AppConfig.WEB_ROOT + 'evaluation/hygienegrade/get_room_message/?token='+ AppConfig.token
        + '&roomscoreid=' + param.roomscoreid;
        return $http.get(url);
    };
    var getGradeImgs = function (param) {
        var url = AppConfig.WEB_ROOT + 'evaluation/hygienegrade/get_pictures/?token='+ AppConfig.token
        + '&roomid=' + param.roomid + '&currentweek=' + param.currentweek + '&semesterid=' + param.semesterid;
        return $http.get(url);
    };
    var uploadImg = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolcode;
        param.adminid = param.adminid || AppConfig.adminid;
        var url = AppConfig.WEB_ROOT + 'evaluation/hygienegrade/upload_picture/';
        return $http.get(url,param);
    };
    var setBedGrade = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolcode;
        param.adminid = param.adminid || AppConfig.adminid;
        var url = AppConfig.WEB_ROOT + 'evaluation/hygienegrade/add_bed_score/';
        return $http.get(url,param);
    };
    var editBedGrade = function (param) {
        param.token = param.token || AppConfig.token;
        var url = AppConfig.WEB_ROOT + 'evaluation/hygienegrade/edit_bed_score/';
        return $http.get(url,param);
    };
    var getBedGrade = function (param) {
        var url = AppConfig.WEB_ROOT + 'evaluation/hygienegrade/get_bed_message/?token='+ AppConfig.token
        + '&roomscoreid=' + param.roomscoreid;
        return $http.get(url);
    };
    var getList = function(param){
        var url = AppConfig.WEB_ROOT + 'evaluation/hygienegrade/score_search/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&semesterid=' + (param.semesterid || '') + '&currentweek=' + (param.currentweek || '')
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.floorid?('&floorid='+param.floorid):'')
        + (param.liveareaid?('&liveareaid='+param.liveareaid):'')
        + (param.campusid?('&campusid='+param.campusid):'')
        + (param.studentnumber?('&studentnumber='+param.studentnumber):'')
        + (param.name?('&name='+param.name):'')
        + (param.roomname?('&roomname='+param.roomname):'')
        + (param.orderfield?('&orderfield='+param.orderfield):'')
        + (param.ordertype?('&ordertype='+param.ordertype):'');
        return $http.get(url);
    };
    var download = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolcode;
        var url = AppConfig.WEB_ROOT + 'evaluation/hygienegrade/score_search_export/';
        return $http.get(url,param);
    };
    var getTopList = function(param){
        var url = AppConfig.WEB_ROOT + 'evaluation/hygienegrade/ranking_list/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&semesterid=' + (param.semesterid || '') + '&currentweek=' + (param.currentweek || '')
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.liveareaid?('&liveareaid='+param.liveareaid):'')
        + (param.campusid?('&campusid='+param.campusid):'')
        + (param.tobed?('&tobed='+param.tobed):'');
        return $http.get(url);
    };
    var downloadTopList = function (param) {
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolcode;
        var url = AppConfig.WEB_ROOT + 'evaluation/hygienegrade/score_search_export/';
        return $http.get(url,param);
    };
    return {
        getListByFlat:getListByFlat,
        setGrade:setGrade,
        editGrade:editGrade,
        getGrade:getGrade,
        getGradeImgs:getGradeImgs,
        uploadImg:uploadImg,
        setBedGrade:setBedGrade,
        editBedGrade:editBedGrade,
        getBedGrade:getBedGrade,
        getList:getList,
        download:download,
        getTopList:getTopList,
        downloadTopList:downloadTopList
    }
}]);