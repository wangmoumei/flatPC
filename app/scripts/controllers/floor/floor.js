angular.module('flatpcApp')
.controller('FloorCtrl', ['$scope','AppConfig','$rootScope','FlatService',function($scope,AppConfig,$rootScope,FlatService) {
    $scope.media = {
        status:0,
        type:0,
        title:'',
        campusTitle:'',
        campusId:'',
        areaTitle:'',
        liveAreaId:'',
        flatTitle:'',
        flatId:'',
        listOrder:1
    };
    $scope.show = function(type,item,college,campus,liveArea){
        $scope.media.status = 0;
        $scope.media.type = type;
        
        $scope.media.title = college || item.title || '';
        
        $scope.media.campusTitle = campus || item.title || '';
        $scope.media.campusId = item.campusId || '';
        
        $scope.media.areaTitle = liveArea || item.title || '';
        $scope.media.liveAreaId = item.liveAreaId || '';
        
        $scope.media.flatTitle = item.title || '';
        $scope.media.flatId = item.flatId || '';
        
        $scope.media.listOrder=item.listOrder || 1;
    }
    
    $scope.add = function(type,item,campus){
        $scope.media.status = 1;
        $scope.media.type = type;
        
        $scope.media.title = item.title || '';
        
        $scope.media.campusTitle = campus || (type > 1 ? item.title : '');
        $scope.media.campusId = item.campusId || '';
        
        $scope.media.areaTitle = type > 2 ? item.title : '';
        $scope.media.liveAreaId = item.liveAreaId || '';
        
        $scope.media.flatTitle = '';
        $scope.media.flatId = '';
        
        $scope.media.listOrder= 1;
    }
    $scope.addSave = function(){
        $rootScope.loading = true;
        (function(){
            if($scope.media.type == 1){
                return FlatService.addCampus({
                    token:'',
                    schoolcode:AppConfig.schoolCode,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.campusTitle
                })
            }else if($scope.media.type == 2){
                return FlatService.addArea({
                    token:'',
                    schoolcode:AppConfig.schoolCode,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.areaTitle,
                    campusid:$scope.media.campusId
                })
            }else if($scope.media.type == 3){
                return FlatService.addFlat({
                    token:'',
                    schoolcode:AppConfig.schoolCode,
                    campusid:$scope.media.campusId,
                    areaid:$scope.media.areaId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.flatTitle
                })
            }
        })().then(function(){
            $rootScope.loading = false;
            swal("提示", "添加成功！", "success"); 
            refresh();
        })
    }
    $scope.editSave = function(){
        $rootScope.loading = true;
        (function(){
            if($scope.media.type == 1){
                return FlatService.editCampus({
                    token:'',
                    campusid:$scope.media.campusId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.campusTitle
                }).success(function(){
                    $rootScope.loading = false;
                })
            }else if($scope.media.type == 2){
                return FlatService.editArea({
                    token:'',
                    areaid:$scope.media.areaId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.areaTitle
                }).success(function(){
                    $rootScope.loading = false;
                })
            }else if($scope.media.type == 3){
                return FlatService.editFlat({
                    token:'',
                    flatid:$scope.media.flatId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.flatTitle
                }).success(function(){
                    $rootScope.loading = false;
                })
            }
        })().then(function(){
             $rootScope.loading = false;
            swal("提示", "修改成功！", "success"); 
            refresh();
        })
    }
    $scope.delete = function(){
        swal({   
                title: "确认删除",   
                text: "真的要删除吗？",   
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#DD6B55",   
                confirmButtonText: "删除",   
                cancelButtonText: "取消",   
                closeOnConfirm: false 
            }, 
            function(){   
                $rootScope.loading = true;
                (function(){
                    if($scope.media.type == 1){
                        return FlatService.delCampus({
                            token:'',
                            campusid:$scope.media.campusId
                        })
                    }else if($scope.media.type == 2){
                        return FlatService.delArea({
                            token:'',
                            areaid:$scope.media.areaId
                        })
                    }else if($scope.media.type == 3){
                        return FlatService.delFlat({
                            token:'',
                            flatid:$scope.media.flatId
                        })
                    }
                })().then(function(){
                    $rootScope.loading = false;
                    swal("提示", "删除成功！", "success"); 
                    $scope.media.type=0;
                    refresh();
                })
                
        });
        
    }
    
    $rootScope.loading = false;
    if(!$rootScope.treeFlat){
        refresh().then(function(){$scope.show(1,$rootScope.treeFlat.cmpusList[0])});
    }
    else {
        $scope.show(1,$rootScope.treeFlat.cmpusList[0])
    }
    function refresh(){
        return FlatService.getList(AppConfig.schoolCode).success(function(data){
            //console.log(data);
            $rootScope.treeFlat = data.data;
        });
    }
}]);