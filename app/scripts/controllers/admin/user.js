'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('UserCtrl', ['$scope','$rootScope','UserService','$filter',
  function ($scope,$rootScope,UserService,$filter) {
    $scope.form = {
        status:0,
        username:'',
        password:'',
        password1:'',
        useraccount:'',
        phone:'',
        jobnumber:'',
        roleid:'',
        groupid:'',
        adminid:'',
        roleList : []
    }
    $scope.dataInit = function (user) {
        $scope.form.status= user.adminId ? 1 : 0;
        $scope.form.username= user.userName || '';
        $scope.form.password= '';
        $scope.form.password1= '';
        $scope.form.useraccount=user.userAccount || '';
        $scope.form.phone=user.phone || '';
        $scope.form.jobnumber=user.jobNumber || '';
        $scope.form.roleid= '' + user.roleId || '';
        $scope.form.groupid=user.groupId || $scope.media.groupid || '';
        $scope.groupSelect();
        $scope.form.adminid=user.adminId || '';
    }
    $scope.groupSelect = function(){
        if($scope.form.groupid){
            var list = $filter('filter')($rootScope.treeGroup,{ groupId:$scope.form.groupid });
            $scope.form.roleList = list[0].roleList || [];
        }
    }
    $scope.addSave = function (fun) {
        if($scope.form.password != $scope.form.password1)return;
        $rootScope.loading = true;
        UserService.addUser({
            groupid:$scope.form.groupid,
            username:$scope.form.username,
            password:$scope.form.password,
            useraccount:$scope.form.useraccount,
            phone:$scope.form.phone,
            jobnumber:$scope.form.jobnumber,
            roleid:$scope.form.roleid
        }).success(function (data) {
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "添加成功！", "success"); 
                refresh();
                if(fun && typeof fun == 'function') fun();
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
    }
    $scope.editSave = function (fun) {
        $rootScope.loading = true;
        UserService.editUser({
            adminid:$scope.form.adminid,
            groupid:$scope.form.groupid,
            username:$scope.form.username,
            // password:$scope.form.password,
            //useraccount:$scope.form.useraccount,
            phone:$scope.form.phone,
            jobnumber:$scope.form.jobnumber,
            roleid:$scope.form.roleid
        }).success(function (data) {
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "保存成功！", "success"); 
                refresh();
                if(fun && typeof fun == 'function') fun();
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
    }
    $scope.delete = function (fun) {
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
            return UserService.delUser({
                adminid:$scope.form.adminid
            }).success(function (data) {
                $rootScope.loading = false;
                if(data.code == 0){
                    swal("提示", "删除成功！", "success"); 
                    refresh();
                    if(fun && typeof fun == 'function') fun();
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            })
        });
        
    }
    //基础的页码、排序等等选项
    $scope.media = {
        epage:1,
        pageCount:1,
        recordCount:1,
        pagesize:10,
        groupid:'',
        orderfield:'',
        ordertype:'',
        title:''
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
    //排序
    $scope.setOrder = function(name){
        if($scope.media.orderfield == name)
        {
            $scope.media.ordertype = $scope.media.ordertype=="asc"?"desc":"asc";
        }else{
            $scope.media.orderfield = name;
            $scope.media.ordertype = "asc";
        }
        refresh();
    }
    //调整查询规则，按学院或者班级查询
    $scope.show = function(item){
        $scope.media.groupid = item.groupId;
        $scope.media.title = item.title;
        refresh();
    };
    
    
    
    if($rootScope.treeGroup){
        refresh();
    }else{
        UserService.getGroupList().success(function (data) {
            
            if(data.code == 0){
                $rootScope.treeGroup = data.list;
                refresh();
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
        })
    }
    function refresh() {
        $rootScope.loading = true;
        UserService.getList({
            groupid:$scope.media.groupid
        }).success(function (data) {
            if(data.code == 0){
                $scope.list = data.list;
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            $rootScope.loading = false;
        })
    }
  }]);
