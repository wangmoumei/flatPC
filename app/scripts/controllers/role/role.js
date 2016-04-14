'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('RoleCtrl', ['$scope','$rootScope','RoleService','AppConfig','$location','$anchorScroll',
  function ($scope,$rootScope,RoleService,AppConfig,$location,$anchorScroll) {
    $scope.media = {
        type:1,
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
            //console.log(data);
            
            $rootScope.loading = false;
            if(data.code == 0){
               $scope.list = data.data?data.data.list:[] || [];
                
                $scope.media.recordCount = data.data?data.data.recordCount:0;
                $scope.media.pageCount = data.data?data.data.pageCount:0;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
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
            type:1,
            schoolcode:AppConfig.schoolCode,
            status:$scope.role.status?0:1
        }).success(function (data) {
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
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
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
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                }
            })
                
        });
        
    }
    $scope.menuInit = function (item) {
        if(!$rootScope.treeMenu){
            $rootScope.loading = true;
            return RoleService.getMenuList().success(function(data){
                $rootScope.loading = false;
                if(data.code == 0){
                    $rootScope.treeMenu = data.list;
                    $scope.menuInit(item);
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            });
        }else{
            
            $scope.role.type = item.type?true:false;
            $scope.role.roleid = item.roleId;
            $scope.role.nodeids = item.nodeIds;
            console.log($scope.role.nodeids);
            var ids = ',' + (typeof item.nodeIds == 'string'?item.nodeIds:item.nodeIds.toString()) + ',';
            compute($rootScope.treeMenu,function (menu) {
                menu.open = new RegExp(',' + menu.nodeId +',').test(ids);
            });
            // console.log($rootScope.treeMenu);
            return function (show) {
                show();
            }
        }
    }
    $scope.menuChange = function (item) {
        // alert(arguments.length)
        if(item.subNodes)
            compute(item.subNodes,function (menu) {
                menu.open = item.open;
            });
        if(arguments.length > 1){
            if(item.open){
                for(var i= 1;i<arguments.length; i++){
                    arguments[i].open = true;
                }
            }else{
                for(var i = 1; i<arguments.length; i++){
                    for(var j = 1; j<arguments[i].subNodes.length; j++){
                        if(arguments[i].subNodes[j].open) {
                            return;
                        }
                    }
                    arguments[i].open = false;
                }
            }
        }
    }
    $scope.menuReset = function () {
        var ids = ',' + (typeof item.nodeIds == 'string'?item.nodeIds:item.nodeIds.toString()) + ',';
        compute($rootScope.treeMenu,function (menu) {
            menu.open = new RegExp(',' + menu.nodeId +',').test(ids);
        });
    }
    $scope.menuSave = function () {
        var nodeids = "";
        compute($rootScope.treeMenu,function (menu) {
            if(menu.open)
                nodeids += menu.nodeId + ","
        });
        if(nodeids.length>0){
            nodeids = nodeids.substring(0,nodeids.length-1);
        }
        $rootScope.loading = true;
        return RoleService.setRole({
            token:AppConfig.token,
            roleid:$scope.role.roleid,
            nodeids:nodeids
        }).success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                 swal("提示","保存成功！", "success"); 
                 refresh();
                 if($scope.role.roleid == AppConfig.roleId){
                     sessionStorage.nodeIds = nodeids;
                     AppConfig.nodeIds = ',' + sessionStorage.nodeIds + ',';
                 }
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        });
    }
    function compute(list,fun) {
        if(list)
            list.forEach(function (menu) {
                if(fun && typeof fun == 'function')
                    fun(menu);
                if(menu.subNodes){
                    compute(menu.subNodes,fun);
                }
            })
    }
    $scope.goHash = function (x) {
        var newHash = 'menu' + x;
        if ($location.hash() !== newHash) {
            // set the $location.hash to `newHash` and
            // $anchorScroll will automatically scroll to it
            $location.hash('menu' + x);
        } else {
            // call $anchorScroll() explicitly,
            // since $location.hash hasn't changed
            $anchorScroll();
        }
    }
    
    
  }]);
