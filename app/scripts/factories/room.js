angular.module('flatpcApp')
.factory('RoomService',['$http', 'AppConfig',function($http, AppConfig){
    var getList = function(flatid){
        var url = AppConfig.WEB_ROOT + 'flatdata/rooms/get_rooms_list/?flatid=' + flatid + '&token=123';
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var addFloor = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/rooms/add_floor/';
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
    var editFloor = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/rooms/edit_floor/';
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
    var delFloor = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/rooms/del_floor/';
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
    var addRoom = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/rooms/add_room/';
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
    var editRoom = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/rooms/edit_room/';
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
    var delRoom = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/rooms/del_room/';
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
    var multiAdd = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/rooms/batch_add_room/';
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
    var getTypeList = function(){
        var url = AppConfig.WEB_ROOT + '/flatdata/types/get_type_list/?schoolcode=' + AppConfig.schoolCode + '&token=123';
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    var addType = function(param){
        var url = AppConfig.WEB_ROOT + '/flatdata/types/add_type/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url);
    }
    var editType = function(param){
        var url = AppConfig.WEB_ROOT + '/flatdata/types/edit_type/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url);
    }
    var delType = function(param){
        var url = AppConfig.WEB_ROOT + '/flatdata/types/del_type/';
        return $http({
            url:url,
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params:param
        }).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });//.get(url);
    }
    var getListByName = function(param){
        var url = AppConfig.WEB_ROOT + 'flatdata/rooms/get_empty_beds/?flatid=' + (param.flatid || "") 
        + '&token=' + (param.token || AppConfig.token) + '&roomname=' + (param.flatid || "");
        return $http.get(url).error(function (error) {
            swal("提示", "网络错误！", "error"); 
        });
    }
    return {
        getList:getList,  //寝室列表
        addFloor:addFloor,
        editFloor:editFloor,
        delFloor:delFloor,
        addRoom:addRoom,
        editRoom:editRoom,
        delRoom:delRoom,
        multiAdd:multiAdd,
        getTypeList:getTypeList,
        addType:addType,
        editType:editType,
        delType:delType,
        getListByName:getListByName
    }
}]);