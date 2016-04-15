'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @日打分项
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('GradeSettingForDayCtrl', ['$scope','AppConfig','$rootScope', 'GradeService',
function($scope,AppConfig,$rootScope,GradeService) {
    $scope.media = {
        status:1,
        type:0,
        tableid:0,
        tableTitle:'',
        isopen:true,
        title:'',
        listorder:1,
        typeid:0,
        itemid:0,
        number:'',
        fid:0,
        standardtype:0,
        fullmark:0,
        typeTitle:'',
        parentTitle:'',
        passvalue:0,
        bettervalue:0,
        passcontinuity:0,
        passnumber:0,
        isLeaf:false
    };
    $scope.show = function(type,item,obj,category,option){
        $scope.media.status = 0;
        $scope.media.type = type;
        
        if((type == 2 && option) || type == 3){
            $scope.media.isLeaf = true;
        }else{
            $scope.media.isLeaf = false;
        }
        $scope.media.tableTitle = obj || item.title || '';
        $scope.media.typeTitle = type>1?category.title || item.title: item.title || '';
        $scope.media.parentTitle = option || item.title || '';
        
        $scope.media.tableid = item.tableId || 0;
        $scope.media.isopen = (item.isOpen || 0)?true:false;
        $scope.media.typeid = item.typeId || 0;
        $scope.media.number = item.number || 0;
        $scope.media.fid = item.fid || 0;
        $scope.media.fullmark=item.fullMark || 0;
        $scope.media.standardtype=(item.standardType || (category?category.standardType || 0:0))  + '';
        $scope.media.listorder=item.listOrder || 1;
        $scope.media.title=item.title || '';
        $scope.media.itemid=item.itemId || 0;
        $scope.media.passvalue=item.passValue || 0;
        $scope.media.bettervalue=item.betterValue || 0;
        $scope.media.passcontinuity=item.passContinuity || 0;
        $scope.media.passnumber=item.passNumber || 0;
    }
    $scope.add = function(type,item,obj,category){
        $scope.media.status = 1;
        $scope.media.type = type;
        
        $scope.media.tableTitle = type?(obj || (item?item.title:"") || ''):"";
        $scope.media.typeTitle = type?(category==1?item.title:(category.title||item.title||'')):"";
        $scope.media.parentTitle = type?(type==2?'' : item.title):"";
        
        $scope.media.tableid = 0;
        $scope.media.isopen = true;
        $scope.media.number = 0;
        $scope.media.fid = type?(item.itemId || 0):0;
        $scope.media.typeid = type?(item.typeId || category.typeId || 0):0;
        $scope.media.fullmark=0;
        $scope.media.standardtype=0 + '';
        $scope.media.listorder= 0;
        $scope.media.title='';
        $scope.media.itemid=0;
        $scope.media.passvalue=0;
        $scope.media.bettervalue=0;
        $scope.media.passcontinuity=0;
        $scope.media.passnumber=0;
        
        if((type == 2 && category==1) || type == 3){
            $scope.media.isLeaf = true;
            $scope.media.standardtype=(type==2?item.standardType:category.standardType)+ '';
        }else{
            $scope.media.isLeaf = false;
        }
    }
    $scope.addSave = function(){
        
        $rootScope.loading = true;
        (function () {
            if($scope.media.type){
                return GradeService.addSetting({
                    token:AppConfig.token,
                    schoolcode:AppConfig.schoolCode,
                    typeid:$scope.media.typeid,
                    fid:$scope.media.fid,
                    number:$scope.media.number,
                    title:$scope.media.isLeaf?$scope.media.title:$scope.media.parentTitle,
                    fullmark:$scope.media.fullmark,
                    listorder:$scope.media.listorder,
                    standardtype:$scope.media.standardtype
                })
            }else
                return GradeService.addSettingTable({
                    token:AppConfig.token,
                    schoolcode:AppConfig.schoolCode,
                    type:1,
                    title:$scope.media.tableTitle,
                    isopen:$scope.media.isopen?1:0,
                    listorder:$scope.media.listorder
                })
        })().success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "添加成功！", "success"); 
                refresh();
                $scope.media.status = 0;
                $scope.media.tableid = data.data.tableId || 0;
                $scope.media.itemid = data.data.itemId || 0;
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
    }
    $scope.editSave = function(){
        $rootScope.loading = true;
        (function () {
            if($scope.media.type){
                if($scope.media.type>1){
                    return GradeService.editSetting({
                        token:AppConfig.token,
                        itemid:$scope.media.itemid,
                        title:$scope.media.isLeaf?$scope.media.title:$scope.media.parentTitle,
                        fullmark:$scope.media.fullmark,
                        number:$scope.media.number,
                        standardtype:$scope.media.standardtype,
                        listorder:$scope.media.listorder
                    })
                }else{
                    return GradeService.editSettingType({
                        token:AppConfig.token,
                        typeid:$scope.media.typeid,
                        standardtype:$scope.media.standardtype,
                        passvalue:$scope.media.passvalue,
                        bettervalue:$scope.media.bettervalue,
                        passcontinuity:$scope.media.passcontinuity,
                        passnumber:$scope.media.passnumber
                    })
                }
                
            }else{
                return GradeService.editSettingTable({
                    token:AppConfig.token,
                    isopen:$scope.media.isopen?1:0,
                    title:$scope.media.tableTitle,
                    tableid:$scope.media.tableid,
                    listorder:$scope.media.listorder
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
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
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
                (function () {
                    if($scope.media.type)
                        return GradeService.delSetting({
                            token:AppConfig.token,
                            itemid:$scope.media.itemid
                        })
                    else
                        return GradeService.delSettingTable({
                            token:AppConfig.token,
                            tableid:$scope.media.tableid
                        })
                })().success(function(data){
                    $rootScope.loading = false;
                    if(data.code == 0){
                        swal("提示", "删除成功！", "success"); 
                        $scope.media.type=0;
                        $scope.media.status=1;
                        refresh();
                    }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                })
                
        });
    }
    

    refresh(true);

    function refresh(option){
        if(!option) $rootScope.treeDay = undefined;
        $rootScope.loading = true;
        return GradeService.getSettingList({
            type:1
        }).success(function(data){
            console.log(data);
            if(data.code == 0){
                $scope.day = data.data;
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
            
        });
    }
}]);