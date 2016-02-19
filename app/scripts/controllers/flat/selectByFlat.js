angular.module('flatpcApp')
.controller('FlatCtrl', ['$scope', 'AppConfig','$rootScope','StudentService','FlatService','$filter',
function($scope,AppConfig,$rootScope,StudentService,FlatService,$filter) {
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
    $scope.loadInfo = function(studentid){
        if(studentid.length<1) 
            return null;
        $rootScope.loading = true;
        return StudentService.getStudent('11481_201234005').success(function(data){
            console.log(data);
            $scope.student = data.data;
            $rootScope.loading = false;
        }).error(function(){
            $rootScope.loading = false;
        })
    }
    
    function refresh(flatid){
        FlatService.getFlat(flatid).success(function(data){
            data.list.floorList = data.list.floorList || [];
            data.list.floorList.forEach(function(list){
                list.roomList = list.roomList || [];
                list.roomList =  $filter('sliceArray')(list.roomList);
            });
            $scope.flat = data.list;
            console.log(data.list);
            $rootScope.loading = false;
        })
    }
}])
