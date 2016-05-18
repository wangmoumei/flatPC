'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('AdminCtrl', ['$scope','$rootScope','AdminService','$filter','$location','$anchorScroll','RoleService','AppConfig',
  function ($scope,$rootScope,AdminService,$filter,$location,$anchorScroll,RoleService,AppConfig) {
    $scope.media = {
        type:1,
        status:1,
        adminid:'',
        admintypeid:'',
        username:'',
        password:'',
        password1:'',
        useraccount:'',
        schooltype:'',
        schoolnumber:'',
        roleid:'',
        universityid:'',
        admintypename:'',
        listorder:1
    }
    
    // AdminService.getDictionary().success(function (data) {
        
    //     console.log(data);
    //     if(data.code == 0){
    //         $scope.dic = data.list;
    //         refresh();
    //     }
    //     else
    //         swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
    // });
    $scope.show = function (type,item,admin) {
        // if(!item.adminId)return;
        $scope.media.type = type;
        $scope.media.status = 0;
        $scope.media.adminid = item.adminId;
        $scope.media.admintypename = item.adminTypeName || admin.adminTypeName || "";
        $scope.media.admintypeid =(item.adminTypeId || admin.adminTypeId || "") + "";
        $scope.media.listorder  =item.listorder ||item.listOrder || 0;
        $scope.media.username = item.userName;
        $scope.media.useraccount = item.userAccount;
        $scope.media.roleid = item.roleId + '';
        $scope.media.schooltype = item.schoolType;
        $scope.media.schoolnumber = item.schoolNumber;
        $scope.media.universityid = item.universityid;
    }
    $scope.add = function (type,item) {
        $scope.media.type = type;
        $scope.media.status = 1;
        $scope.media.adminid = "";
        $scope.media.password = "";
        $scope.media.password1 = "";
        $scope.media.admintypename = item.adminTypeName || "";
        $scope.media.admintypeid = item.adminTypeId || "";
        $scope.media.username = "";
        $scope.media.useraccount = "";
        $scope.media.roleid = "";
        $scope.media.schooltype = "";
        $scope.media.schoolnumber = "";
        $scope.media.universityid = "";
        $scope.media.listorder =1;
    }
    $scope.addSave = function () {
        switch($scope.media.type){
            case 2:
        
                if(!$scope.media.admintypeid){
                    return;
                }
                if($scope.media.password.length < 1  || $scope.media.roleid.length < 1|| $scope.media.username.length < 1|| $scope.media.universityid.length < 1|| $scope.media.schoolnumber.length < 1|| $scope.media.schooltype.length < 1|| $scope.media.useraccount.length < 1){
                    return;
                }
                if($scope.media.password!=$scope.media.password1){
                    swal("提示","两次密码不一致！", "error"); 
                    return;
                }
                if($scope.media.universityid.length>5){
                    swal("提示","学校编码不能大于5", "error"); 
                    return;
                }
                $rootScope.loading = true;
                return AdminService.addAdmin({
                    password : $scope.media.password,
                    admintypeid : $scope.media.admintypeid,
                    username : $scope.media.username,
                    useraccount : $scope.media.useraccount,
                    roleid : $scope.media.roleid,
                    schooltype : $scope.media.schooltype,
                    schoolnumber : $scope.media.schoolnumber,
                    universityid : $scope.media.universityid
                }).success(function(data){
                    if(data.code == 0){
                        swal("提示","添加成功！", "success"); 
                        $scope.media.status = 0;
                        $scope.media.adminid = data.data.adminId;
                        refresh();
                    }else if(data.code == 4037){
                                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                                    location.href="#login";$rootScope.loading = false;
                                }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    $rootScope.loading = false;
                });
            case 1:
                if($scope.media.admintypename.length < 1)return;
                $rootScope.loading = true;
                return AdminService.addAdminGroup({
                    title : $scope.media.admintypename,
                    listorder : $scope.media.listorder
                }).success(function(data){
                    if(data.code == 0){
                        swal("提示","添加成功！", "success"); 
                        $scope.media.status = 0;
                        $scope.media.admintypeid = data.data.adminTypeId;
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
    }
    
    $scope.editSave = function () {
        switch($scope.media.type){
            case 2:
                if(!$scope.media.adminid){
                    return;
                }
                if($scope.media.roleid.length < 1|| $scope.media.username.length < 1|| $scope.media.universityid.length < 1|| $scope.media.schoolnumber.length < 1){
                    return;
                }
                if($scope.media.universityid.length>5){
                    swal("提示","学校编码不能大于5", "error"); 
                    return;
                }
                
                $rootScope.loading = true;
                return AdminService.editAdmin({
                    adminid : $scope.media.adminid,
                    username : $scope.media.username,
                    admintypeid : $scope.media.admintypeid,
                    roleid : $scope.media.roleid,
                    schooltype : $scope.media.schooltype,
                    schoolnumber : $scope.media.schoolnumber,
                    universityid : $scope.media.universityid
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
            case 1:
                if(!$scope.media.admintypeid){
                    return;
                }
                if($scope.media.admintypename.length < 1){
                    return;
                }
                $rootScope.loading = true;
                return AdminService.editAdminGroup({
                    admintypeid : $scope.media.admintypeid,
                    title : $scope.media.admintypename,
                    listorder : $scope.media.listorder,
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
            switch($scope.media.type){
                case 2:
            
                    return AdminService.delAdmin({
                        adminid : $scope.media.adminid
                    }).success(function(data){
                        if(data.code == 0){
                            swal("提示"," 删除成功！", "success"); 
                            $scope.media.status = 1;
                            refresh();
                        }else if(data.code == 4037){
                                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                                    location.href="#login";$rootScope.loading = false;
                                }
                        else
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        $rootScope.loading = false;
                    });
                case 1:
                    return AdminService.delAdminGroup({
                        admintypeid : $scope.media.admintypeid
                    }).success(function(data){
                        if(data.code == 0){
                            swal("提示"," 删除成功！", "success"); 
                            $scope.media.status = 1;
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
        });
        
    }
    RoleService.getList({
        type:2
    }).success(function(data){

        $rootScope.loading = false;
        if(data.code == 0){
            $scope.roleList = data.data?data.data.list:[] || [];
            refresh().then(function () {
                if($scope.admins[0]){
                    $scope.add(2,$scope.admins[0]);
                }
            });
        }else if(data.code == 4037){
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                location.href="#login";$rootScope.loading = false;
            }
        else
            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
    });
    
    function refresh(){
        $rootScope.loading = true;
        return AdminService.getList().success(function(data){
            if(data.code == 0){
                $scope.admins = data.list;
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
        });
    }
    
    //超级管理员角色管理用到的函数
    $scope.roleMedia = {
        type:2,
        status:0,
        epage:1,
        pageCount:1,
        recordCount:1,
        pagesize:30
    }
    //换页
    $scope.setPage = function(n){
        if($scope.roleMedia.epage + n >0 && $scope.roleMedia.epage + n <= $scope.roleMedia.pageCount){
            $scope.roleMedia.epage += n;
            roleRefresh();
        } 
    };
    //调整每页显示量
    $scope.setPageSize = function(n){
        $scope.roleMedia.pagesize = n;
        roleRefresh();
    }

    roleRefresh();

    function roleRefresh(){
        $rootScope.loading = true;
        return RoleService.getList($scope.roleMedia).success(function(data){
            //console.log(data);
            
            $rootScope.loading = false;
            if(data.code == 0){
               $scope.list = data.data?data.data.list:[] || [];
                
                $scope.roleMedia.recordCount = data.data?data.data.recordCount:0;
                $scope.roleMedia.pageCount = data.data?data.data.pageCount:0;
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
            $scope.roleMedia.status = 0;
            $scope.role.roleid = item.roleId;
            $scope.role.title = item.title;
            $scope.role.remark = item.remark;
            $scope.role.status = item.status?false:true;
            $scope.role.nodeids = item.nodeIds;
        }else{
            $scope.roleMedia.status = 1;
            $scope.role.title = '';
            $scope.role.remark = '';
            $scope.role.status = true;
        }
        return function () {
            
        }
    }
    $scope.roleMedia.addSave = function (fun) {
        $rootScope.loading = true;
        RoleService.addRole({
            token:AppConfig.token,
            title:$scope.role.title,
            remark:$scope.role.remark,
            type:2,
            schoolcode:AppConfig.schoolCode,
            status:$scope.role.status?0:1
        }).success(function (data) {
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "添加成功！", "success"); 
                if(fun)fun();
                roleRefresh();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            }
        })
    }
    $scope.roleMedia.editSave = function (fun) {
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
                if(fun)fun();
                roleRefresh();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            }
        })
    }
    $scope.roleMedia.delete = function (fun) {
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
                    if(fun)fun();
                    roleRefresh();
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
        if(!$rootScope.treeMenus){
            $rootScope.loading = true;
            return RoleService.getMenuList({
                isschool:2
            }).success(function(data){
                $rootScope.loading = false;
                if(data.code == 0){
                    $rootScope.treeMenus = data.list;
                    $scope.menuInit(item);
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            });
        }else{
            // console.log(item.type);
            $scope.role.type = item.type?true:false;
            $scope.role.roleid = item.roleId;
            $scope.role.nodeids = item.nodeIds;
            console.log($scope.role.nodeids);
            var ids = ',' + (typeof item.nodeIds == 'string'?item.nodeIds:item.nodeIds.toString()) + ',';
            console.log(ids);
            compute($rootScope.treeMenus,function (menu) {
                menu.open = new RegExp(',' + menu.nodeId +',').test(ids);
            });
            // console.log($rootScope.treeMenus);
            return function (show) {
                show();
            }
        }
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
        compute($rootScope.treeMenus,function (menu) {
            menu.open = new RegExp(',' + menu.nodeId +',').test(ids);
        });
    }
    $scope.menuSave = function () {
        var nodeids = "";
        compute($rootScope.treeMenus,function (menu) {
            if(menu.open)
                nodeids += menu.nodeId + ","
        });
        if(nodeids.length>0){
            nodeids = nodeids.substring(0,nodeids.length-1);
        }
        $rootScope.loading = true;
        return RoleService.setRole({
            roleid:$scope.role.roleid,
            nodeids:nodeids
        }).success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                 swal("提示","保存成功！", "success"); 
                 roleRefresh();
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
  }]);
