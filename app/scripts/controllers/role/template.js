'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('RoleTemplateCtrl', ['$scope','$rootScope','RoleService','AppConfig',function ($scope,$rootScope,RoleService,AppConfig) {
    $scope.media = {
        type:0,
        status:0,
        epage:1,
        pageCount:1,
        recordCount:1,
        pagesize:30
    }
    //换页
    $scope.setPage = function(n){
        if($scope.media.epage + n >0 && $scope.media.epage + n <= $scope.media.pageCount){
            $scope.media.epage += n;
            refresh();
        } 
    };
    //调整每页显示量
    $scope.setPageSize = function(n){
        $scope.media.pagesize = n;
        refresh();
    }
    

    refresh();

    function refresh(){
        $rootScope.loading = true;
        return RoleService.getList($scope.media).success(function(data){
            
            $rootScope.loading = false;
            if(data.code == 0){
                $scope.list = data.data.list || [];
                $scope.media.recordCount = data.data?data.data.recordCount:0;
                $scope.media.pageCount = data.data?data.data.pageCount:0;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        });
    }
    
    $scope.role = {
        title:'',
        remark:'',
        status:true,
        roleid:'',
        nodeids:null
    }
    $scope.roleInit = function (item) {
        if(item){
            $scope.media.status = 0;
            $scope.role.roleid = item.roleId;
            $scope.role.title = item.title;
            $scope.role.remark = item.remark;
            $scope.role.status = item.status ?false:true;
            $scope.role.nodeids = item.nodeIds;
        }else{
            $scope.media.status = 1;
            $scope.role.title = '';
            $scope.role.remark = '';
            $scope.role.status = true;
        }
        return function () {
            
        }
    }
    $scope.addSave = function () {
        $rootScope.loading = true;
        RoleService.addRole({
            token:AppConfig.token,
            title:$scope.role.title,
            remark:$scope.role.remark,
            type:0,
            status:$scope.role.status?0:1
        }).success(function (data) {
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "添加成功！", "success"); 
                refresh();
            }else{
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            }
        })
    }
    $scope.editSave = function () {
        $rootScope.loading = true;
        RoleService.editRole({
            token:AppConfig.token,
            title:$scope.role.title,
            remark:$scope.role.remark,
            roleid:$scope.role.roleid,
            status:$scope.role.status?0:1
        }).success(function (data) {
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "修改成功！", "success"); 
                refresh();
            }else{
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            }
        })
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
                RoleService.delRole({
                    token:AppConfig.token,
                    roleid:$scope.role.roleid
                }).success(function (data) {
                    $rootScope.loading = false;
                    if(data.code == 0){
                        swal("提示", "删除成功！", "success"); 
                        refresh();
                    }else{
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    }
                })
                
        });
        
    }
  }]);
