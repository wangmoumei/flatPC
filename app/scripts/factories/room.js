angular.module('flatpcApp')
.factory('RoomService',['$http', 'AppConfig',function($http, AppConfig){
    var getListByFlat = function(flatid){
        var url = AppConfig.WEB_ROOT + 'apartment/floor/index/?flatid=' + flatid + '&token=123';
        return $http.get(url);
    }
    return {
        getListByFlat:getListByFlat
    }
}]);