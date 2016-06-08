angular.module('flatpcApp')
.controller('FloorCtrl', ['$scope','AppConfig','$rootScope','FlatService',function($scope,AppConfig,$rootScope,FlatService) {
    $scope.media = {
        status:1,
        type:0,
        title:'',
        campusTitle:'',
        campusId:'',
        areaTitle:'',
        liveAreaId:'',
        flatTitle:'',
        sex:'',
        flatId:'',
        listOrder:1,
        menuCheck : function () {
            switch (this.type){
                case 0:
                    //return this.status?$rootScope.menuCheck():$rootScope.menuCheck();
                    break;
                case 1:
                    //新增和编辑校区
                    return this.status?$rootScope.menuCheck(137):$rootScope.menuCheck(138);
                     break;
                case 2:
                    //新增和编辑生活区
                    return this.status?$rootScope.menuCheck(224):$rootScope.menuCheck(225);
                     break;
                case 3:
                    //新增和编辑楼栋
                    return this.status?$rootScope.menuCheck(227):$rootScope.menuCheck(228);
                     break;
            }
            return false;
        }
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
        $scope.media.sex =item.sex || '';
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
        //默认选中为楼栋性别男
        $scope.media.sex='0';
        $scope.media.listOrder= 1;
    }
    $scope.addSave = function(){
        $rootScope.loading = true;
        (function(){
            
            if($scope.media.type == 1){
                return FlatService.addCampus({
                    token:AppConfig.token,
                    schoolcode:AppConfig.schoolCode,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.campusTitle
                })
            }else if($scope.media.type == 2){
                return FlatService.addArea({
                    token:AppConfig.token,
                    schoolcode:AppConfig.schoolCode,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.areaTitle,
                    campusid:$scope.media.campusId
                })
            }else if($scope.media.type == 3){
                return FlatService.addFlat({
                    token:AppConfig.token,
                    schoolcode:AppConfig.schoolCode,
                    campusid:$scope.media.campusId,
                    areaid:$scope.media.liveAreaId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.flatTitle,
                    sex:$scope.media.sex
        
                })
            }
        })().success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "添加成功！", "success"); 
                refresh();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            }
        })
    }
    $scope.editSave = function(){
        $rootScope.loading = true;
        (function(){
            if($scope.media.type == 1){
                return FlatService.editCampus({
                    token:AppConfig.token,
                    campusid:$scope.media.campusId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.campusTitle
                })
            }else if($scope.media.type == 2){
                return FlatService.editArea({
                    token:AppConfig.token,
                    areaid:$scope.media.liveAreaId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.areaTitle
                })
            }else if($scope.media.type == 3){
                return FlatService.editFlat({
                    token:AppConfig.token,
                    flatid:$scope.media.flatId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.flatTitle,
                    sex:$scope.media.sex
                })
            }
        })().success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "修改成功！", "success"); 
                refresh();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            }
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
                            token:AppConfig.token,
                            campusid:$scope.media.campusId
                        })
                    }else if($scope.media.type == 2){
                        return FlatService.delArea({
                            token:AppConfig.token,
                            areaid:$scope.media.liveAreaId
                        })
                    }else if($scope.media.type == 3){
                        return FlatService.delFlat({
                            token:AppConfig.token,
                            flatid:$scope.media.flatId
                        })
                    }
                })().success(function(data){
                    $rootScope.loading = false;
                    if(data.code == 0){
                        swal("提示", "删除成功！", "success"); 
                        refresh();
                    }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    }
                })
                
        });
        
    }
    
    
    if(!$rootScope.treeFlat){
        refresh().then(function(){$scope.show(1,$rootScope.treeFlat.cmpusList[0] || {})});
    }
    else {
        $scope.show(1,$rootScope.treeFlat.cmpusList[0] || {});
        $rootScope.loading = false;
    }
    function refresh(){
        return FlatService.getList(AppConfig.schoolCode).success(function(data){
            //console.log(data);
            if(data.code == 0)
                $rootScope.treeFlat = data.data;
            else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
        });
    }
}]);