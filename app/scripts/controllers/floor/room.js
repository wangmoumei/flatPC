angular.module('flatpcApp')
.controller('RoomCtrl', ['$scope', 'AppConfig','$rootScope','RoomService','FlatService','$filter',
function($scope,AppConfig,$rootScope,RoomService,FlatService,$filter) {
    if(!$rootScope.treeFlat){
        FlatService.getList(AppConfig.schoolCode).success(function(data){
            //console.log(data);
            $rootScope.treeFlat = data.data;
            refresh('11481_1_1_1_1_1');
        });
    }
    else {
        refresh('11481_1_1_1_1_1');
    }
    
    function refresh(flatid){
        RoomService.getList(flatid).success(function(data){
            data.data.floorList.forEach(function(list){
                list.roomList =  $filter('sliceArray')(list.roomList);
            });
            $scope.flat = data.data;
            console.log(data.data);
            $rootScope.loading = false;
        })
    }
}])