angular.module('flatpcApp')
.factory('FlatService',['$http', 'AppConfig',function($http, AppConfig){
    var getList = function(schoolcode){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/get_floor_list/?schoolcode='+AppConfig.schoolCode+'&token=' + AppConfig.token;
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var getFlat = function(flatid){
        var url = AppConfig.WEB_ROOT + 'apartment/floor/index/?flatid=' + flatid + '&token=' + AppConfig.token;
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var addCampus = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/add_campus/';
        console.log(param);
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.post(url,param,{'Content-Type':'application/x-www-form-urlencoded'});
    }
    var editCampus = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/edit_campus/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.post(url,param,{'Content-Type':'application/x-www-form-urlencoded'});
    }
    var delCampus = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/del_campus/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.post(url,param,{'Content-Type':'application/x-www-form-urlencoded'});
    }
    var addArea = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/add_livearea/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.post(url,param,{'Content-Type':'application/x-www-form-urlencoded'});
    }
    var editArea = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/edit_livearea/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.post(url,param,{'Content-Type':'application/x-www-form-urlencoded'});
    }
    var delArea = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/del_livearea/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.post(url,param,{'Content-Type':'application/x-www-form-urlencoded'});
    }
    var addFlat = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/add_flat/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.post(url,param,{'Content-Type':'application/x-www-form-urlencoded'});
    }
    var editFlat = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/edit_flat/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.post(url,param,{'Content-Type':'application/x-www-form-urlencoded'});
    }
    var delFlat = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/school/del_flat/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.post(url,param,{'Content-Type':'application/x-www-form-urlencoded'});
    }
    var getImport = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/roommessage/get_import_list/?'
        + 'schoolcode='+ AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.orderfield?('&orderfield='+param.orderfield):'')
        + (param.ordertype?('&ordertype='+param.ordertype):'');
        return $http.get(url,param);
    }
    var downloadImport = function(param){
        var url = AppConfig.WEB_ROOT + '/stmessage/roommessage/export_error/?importid=' + param
        + "&token=" + AppConfig.token;
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var importFlat = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/roommessage/import_data/';
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
    var downloadExcel = function(){
        var url = AppConfig.WEB_ROOT + 'stmessage/roommessage/sample_table/?schoolcode='+AppConfig.schoolCode+'&token=' + AppConfig.token;
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    };
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