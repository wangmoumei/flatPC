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
            if(data.code == 0){
                $scope.student = data.data;
                $rootScope.loading = false;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            console.log(data);
            
        })
    }
    
    function refresh(flatid){
        FlatService.getFlat(flatid).success(function(data){
            if(data.code == 0){
                data.list.floorList = data.list.floorList || [];
                data.list.floorList.forEach(function(list){
                    list.roomList = list.roomList || [];
                    list.roomList =  $filter('sliceArray')(list.roomList);
                });
                $scope.flat = data.list;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            console.log(data.list);
            $rootScope.loading = false;
        })
    }
}])
