angular.module('flatpcApp')
.factory('StudentService',['$http', 'AppConfig',function($http, AppConfig){
    var getStudent = function(studentid){
        var url = AppConfig.WEB_ROOT + 'apartment/floor/get_student_message/?student_key=' + studentid + '&token=123';
        return $http.get(url);
    }
    var getList = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/tmessage/get_list/?'
        + 'schoolcode=' + AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.name?('&name='+param.name):'')
        + (param.studentnumber?('&studentnumber='+param.studentnumber):'')
        + (param.collegeid?('&collegeid='+param.collegeid):'')
        + (param.classid?('&classid='+param.classid):'')
        + (param.orderfield?('&orderfield='+param.orderfield):'')
        + (param.ordertype?('&ordertype='+param.ordertype):'');
        return $http.get(url);
    }
    var addStudent = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/tmessage/add_student/';
        return $http.get(url,param);
    }
    var editStudent = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/tmessage/edit_student/';
        return $http.get(url,param);
    }
    var delStudent = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/tmessage/del_student/';
        return $http.get(url,param);
    }
    var importStudent = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/tmessage/import_student/';
        return $http.post(url,param,{ headers: { 'Content-Type': undefined }});
    }
    var downloadStudent = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/tmessage/download_student_data/?'
        + 'schoolcode='+ AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.name?('&name='+param.name):'')
        + (param.studentnumber?('&studentnumber='+param.studentnumber):'')
        + (param.collegeid?('&collegeid='+param.collegeid):'')
        + (param.classid?('&classid='+param.classid):'');
        return $http.get(url);
    }
    var getImport = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/tmessage/get_import_list/?'
        + 'schoolcode='+ AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&epage=' + (param.epage || 1) + '&pagesize=' + (param.pagesize || 10)
        + (param.orderfield?('&orderfield='+param.orderfield):'')
        + (param.ordertype?('&ordertype='+param.ordertype):'');
        return $http.get(url,param);
    }
    var downloadImport = function(param){
        var url = AppConfig.WEB_ROOT + 'stmessage/tmessage/export_error/?importId = ' + param
        + "&token=" + AppConfig.token;
        return $http.get(url);
    }
    var uploadImg = function(param){
        var url = AppConfig.WEB_ROOT + '/stmessage/tmessage/upload_img/';
        param.token = param.token || '213';
        return $http.get(url,param);
    }
    var getListByName = function (param) {
        var url = AppConfig.WEB_ROOT + 'stmessage/tmessage/search_list/?'
        + 'schoolcode='+ AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&keyword=' + (param.keyword || "") + '&collegeid=' + (param.collegeid || "") + '&classid=' + (param.classid || "");
        return $http.get(url);
    }
    var getListWithBed = function (param) {
        var url = AppConfig.WEB_ROOT + 'stmessage/tmessage/search_bed_list/?'
        + 'schoolcode='+ AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&keyword=' + (param.keyword || "") + '&collegeid=' + (param.collegeid || "") + '&classid=' + (param.classid || "");
        return $http.get(url);
    }
    var getListWithBedByFlat = function (param) {
        var url = AppConfig.WEB_ROOT + 'stmessage/tmessage/student_room_message/?'
        + 'schoolcode='+ AppConfig.schoolCode + '&token=' + AppConfig.token
        + '&keyword=' + (param.keyword || "") + '&flatid=' + (param.flatid || "");
        return $http.get(url);
    }
    return {
        getStudent:getStudent,//获取学生详细信息
        getList:getList,//获取学生列表
        addStudent:addStudent,//新增学生
        editStudent:editStudent,//编辑学生
        delStudent:delStudent,//删除学生
        importStudent:importStudent,//导入学生数据
        downloadStudent:downloadStudent,//下载学生数据
        getImport:getImport,//获取导入数据列表
        downloadImport:downloadImport, //下载错误数据
        uploadImg:uploadImg,
        getListByName:getListByName,
        getListWithBed:getListWithBed,
        getListWithBedByFlat:getListWithBedByFlat
    }
}]);