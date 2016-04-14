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
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
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
        param.token = param.token || AppConfig.token;
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
    
    var getManagerList = function(param){
        var url = AppConfig.WEB_ROOT + 'management/flatadmin/get_list_flat/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.useraccount?('&useraccount='+param.useraccount):'')
        + (param.username?('&username='+param.username):'')
        + (param.jobnumber?('&jobnumber='+param.jobnumber):'')
        + (param.flatid?('&flatid='+param.flatid):'')
        + (param.liveareaid?('&liveareaid='+param.liveareaid):'')
        + (param.campusid?('&campusid='+param.campusid):'')
        + (param.orderfield?('&orderfield='+param.orderfield):'')
        + (param.ordertype?('&ordertype='+param.ordertype):'');
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var addManager = function(param){
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'management/flatadmin/add_flat_admin/';
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
    var editManager = function(param){
        param.token = param.token || AppConfig.token;
        param.schoolcode = param.schoolcode || AppConfig.schoolCode;
        var url = AppConfig.WEB_ROOT + 'management/flatadmin/edit_flat_admin/';
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
    var delManager = function(param){
        param.token = param.token || AppConfig.token;
        var url = AppConfig.WEB_ROOT + 'Managerdata/school/del_Manager/';
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
        downloadExcel:downloadExcel,
        getManagerList:getManagerList,
        addManager:addManager,
        editManager:editManager,
        delManager:delManager
    }
}]);