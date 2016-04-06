'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('GroupCtrl', ['$scope','$rootScope','UserService','RoleService','AppConfig',
  function ($scope,$rootScope,UserService,RoleService,AppConfig) {
    $scope.media = {
        type:1,
        status:1,
        groupid:'',
        maxaccount:'',
        listorder:'',
        roleids:'',
        useraccount:'',
        roleList:'',
        title:''
    }
        
    $scope.show = function (type,item) {
        $scope.media.status = 0;
        $scope.media.groupid = item.groupId;
        $scope.media.maxaccount = item.maxAccount;
        $scope.media.listorder = item.listOrder;
        $scope.media.title = item.title;
        $scope.media.useraccount = item.userAccount;
        $scope.media.roleList = ',';
        item.roleList.forEach(function (role) {
            console.log(role.roleId);
            $scope.media.roleList += role.roleId + ',';
        })
            
       
        setRole();
    }
    $scope.add = function () {
        $scope.media.status = 1;
        $scope.media.groupid = '';
        $scope.media.maxaccount = 0;
        $scope.media.listorder = 0;
        $scope.media.title = '';
        $scope.media.useraccount = '';
        $scope.media.roleList = ',';
        setRole();
    }
    function setRole() {
        console.log($scope.media.roleList)
        $scope.roles.forEach(function (role) {
            role.checked = new RegExp(',' + role.roleId + ',').test($scope.media.roleList);
        })
    }
    
    $scope.addSave = function () {
        $rootScope.loading = true;
        var roleids = '';
        $scope.roles.forEach(function (role) {
            if(role.checked)
             roleids+= role.roleId +  ',';
        })
        if(roleids.length>0)
            roleids = roleids.substring(0,roleids.length-1);
        return UserService.addGroup({
            token:AppConfig.token,
            maxaccount:$scope.media.maxaccount,
            listorder:$scope.media.listorder,
            roleids:roleids,
            useraccount:$scope.media.useraccount,
            title:$scope.media.title,
            schoolcode:AppConfig.schoolCode
        }).success(function(data){
            if(data.code == 0){
                swal("提示","添加成功！", "success"); 
                refresh();
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
        });
    }
    
    $scope.editSave = function () {
        $rootScope.loading = true;
        var roleids = '';
        $scope.roles.forEach(function (role) {
            if(role.checked)
             roleids+= role.roleId +  ',';
        })
        if(roleids.length>0)
            roleids = roleids.substring(0,roleids.length-1);
        return UserService.editGroup({
            token:AppConfig.token,
            maxaccount:$scope.media.maxaccount,
            listorder:$scope.media.listorder,
            roleids:roleids,
            useraccount:$scope.media.useraccount,
            title:$scope.media.title,
            groupid:$scope.media.groupid
        }).success(function(data){
            if(data.code == 0){
                swal("提示"," 修改成功！", "success"); 
                refresh();
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
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
            return UserService.delGroup({
                token:AppConfig.token,
                groupid:$scope.media.groupid
            }).success(function(data){
                if(data.code == 0){
                    swal("提示"," 删除成功！", "success"); 
                    refresh();
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                $rootScope.loading = false;
            });
                
        });
        
    }
    
    
    RoleService.getList({
        token:AppConfig.token,
        type:1,
        schoolcode:AppConfig.schoolCode
    }).success(function (data) {
        if(data.code == 0){
            $scope.roles = data.data.list;
            data.data.list.forEach(function (role) {
                role.checked = false;
            })
            refresh();
        }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
        else
            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
    })
    
    

    function refresh(){
        $rootScope.loading = true;
        return UserService.getGroupList().success(function(data){
            if(data.code == 0){
                $rootScope.treeGroup = data.list;
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
