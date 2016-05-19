'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('MenuSettingCtrl', ['$scope','$rootScope','RoleService','$filter',
    function ($scope,$rootScope,RoleService,$filter) {
    $scope.media = {
        type:0,
        status1:1,
        isschool:2,
        isSchool:true,
        pid:0,
        listorder:1,
        title:'',
        level:1,
        remark:'',
        status:true,
        nodeid:'',
        title0:'',
        title1:'',    
        title2:'',
        title3:'',
        title4:''  
    }
    $scope.show = function (type,item,pid,remark0,remark1,remark2,remark3,remark4) {
        $scope.media.type = type;
        $scope.media.status1 = 0;
        $scope.media.pid = pid || 0;
        $scope.media.title0 = remark0 || '';
        $scope.media.title1 = remark1 || '';
        $scope.media.title2 = remark2 || '';
        $scope.media.title3 = remark3 || '';
        $scope.media.title4 = remark4 || '';
        console.log(item);
        $scope.media.nodeid = item.nodeId || '';
        $scope.media.title = item.title || '';
        $scope.media.status = item.status?false:true;
        $scope.media.level = (item.type+1) || 1;
        $scope.media.remark = item.remark || '';
        $scope.media.isSchool = item.isSchool?true:false;
        $scope.media.listorder = item.listOrder || 1;
    }
    $scope.add = function (type,pid,remark0,remark1,remark2,remark3,remark4) {
        $scope.media.type = type;
        $scope.media.status1 = 1;
        $scope.media.title0 = remark0 || '';
        $scope.media.title1 = remark1 || '';
        $scope.media.title2 = remark2 || '';
        $scope.media.title3 = remark3 || '';
        $scope.media.title4 = remark4 || '';
        
        $scope.media.title = '';
        $scope.media.pid = pid || 0;
        $scope.media.nodeid = '';
        $scope.media.title = '';
        $scope.media.status = true;
        $scope.media.level = type + 1;
        $scope.media.remark = '';
        $scope.media.isSchool = true;
        $scope.media.listorder = 1;
    }
    
    $scope.addSave = function () {
        $rootScope.loading = true;
        return RoleService.addMenu({
            pid:$scope.media.pid,
            title:$scope.media.title,
            level:$scope.media.level,
            remark:$scope.media.remark,
            status:$scope.media.status?0:1,
            isschool:$scope.media.isSchool?1:0,
            listorder:$scope.media.listorder
        }).success(function(data){
            console.log(data);
            $rootScope.loading = false;
            if(data.code == 0){
            //    console.log(data);
               swal("提示","添加成功！", "success"); 
               refresh();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        });
    }
    $scope.editSave = function () {
        $rootScope.loading = true;
        return RoleService.editMenu({
            nodeid:$scope.media.nodeid,
            title:$scope.media.title,
            level:$scope.media.level,
            remark:$scope.media.remark,
            status:$scope.media.status?0:1,
            isschool:$scope.media.isSchool?1:0,
            listorder:$scope.media.listorder
        }).success(function(data){
            console.log(data);
            $rootScope.loading = false;
            if(data.code == 0){
            //    console.log(data);
               swal("提示","修改成功！", "success"); 
               refresh();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        });
    }
    $scope.delete = function () {
        
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
           return RoleService.delMenu({
                nodeid:$scope.media.nodeid
            }).success(function(data){
                $rootScope.loading = false;
                if(data.code == 0){
                // console.log(data);
                refresh();
                swal("提示","删除成功！", "success"); 
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            });
        });
    }
    
    
    
    
    refresh();
    
    function refresh(){
        $rootScope.loading = true;
        return RoleService.getMenuList($scope.media).success(function(data){
            console.log(data);
            $rootScope.loading = false;
            if(data.code == 0){
               $scope.list = data.list;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        });
    }
  }]);
