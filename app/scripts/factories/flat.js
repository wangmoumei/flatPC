angular.module('flatpcApp')
.factory('FlatService',['$http', 'AppConfig',function($http, AppConfig){
    var getList = function(schoolcode){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/get_floor_list/?schoolcode='+AppConfig.schoolCode+'&token=123';
        return $http.get(url);
    }
    var getFlat = function(flatid){
        var url = AppConfig.WEB_ROOT + 'apartment/floor/index/?flatid=' + flatid + '&token=123';
        return $http.get(url);
    }
    var addCampus = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/add_campus/';
        return $http.get(url,param);
    }
    var editCampus = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/edit_campus/';
        return $http.get(url,param);
    }
    var delCampus = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/del_campus/';
        return $http.get(url,param);
    }
    var addArea = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/add_livearea/';
        return $http.get(url,param);
    }
    var editArea = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/edit_livearea/';
        return $http.get(url,param);
    }
    var delArea = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/del_livearea/';
        return $http.get(url,param);
    }
    var addFlat = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/add_flat/';
        return $http.get(url,param);
    }
    var editFlat = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/edit_flat/';
        return $http.get(url,param);
    }
    var delFlat = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/del_flat/';
        return $http.get(url,param);
    }
    var getImport = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/roommessage/get_import_list/?'
        + 'schoolcode='+ AppConfig.schoolCode + '&token=123'
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.orderfield?('&orderfield='+param.orderfield):'')
        + (param.ordertype?('&ordertype='+param.ordertype):'');
        return $http.get(url,param);
    }
    var downloadImport = function(param){
        var url = AppConfig.WEB_ROOT + '/stmessage/roommessage/export_error/?importId = ' + param
        + "&token=123";
        return $http.get(url);
    }
    var importFlat = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/roommessage/import_data/';
        return $http.post(url,param,{ headers: { 'Content-Type': undefined }});
    }
    var downloadExcel = function(){
        var url = AppConfig.WEB_ROOT + 'stmessage/roommessage/sample_table/?schoolcode='+AppConfig.schoolCode+'&token=123';
        return $http.get(url);
    }
    return {
        getList:getList,
        getFlat:getFlat,
        addCampus:addCampus,
        editCampus:editCampus,
        delCampus:delCampus,
        addArea:addArea,
        editArea:editArea,
        delArea:delArea,
        addFlat:addFlat,
        editFlat:editFlat,
        delFlat:delFlat,
        getImport:getImport,
        downloadImport:downloadImport,
        importFlat:importFlat,
        downloadExcel:downloadExcel
    }
}]);