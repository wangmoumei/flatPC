'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('AdminCtrl', ['$scope','$rootScope','AdminService','$filter',
  function ($scope,$rootScope,AdminService,$filter) {
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
        admintypename:''
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
        if(!item.adminId)return;
        $scope.media.status = 0;
        $scope.media.adminid = item.adminId;
        $scope.media.admintypename = admin.adminTypeName;
        $scope.media.admintypeid = admin.adminTypeId;
        $scope.media.username = item.userName;
        $scope.media.useraccount = item.userAccount;
        $scope.media.roleid = item.roleId;
        $scope.media.schooltype = item.schoolType;
        $scope.media.schoolnumber = item.schoolNumber;
        $scope.media.universityid = item.universityid;
    }
    $scope.add = function (type,item) {
        $scope.media.status = 1;
        $scope.media.adminid = "";
        $scope.media.password = "";
        $scope.media.password1 = "";
        $scope.media.admintypename = item.adminTypeName;
        $scope.media.admintypeid = item.adminTypeId;
        $scope.media.username = "";
        $scope.media.useraccount = "";
        $scope.media.roleid = "";
        $scope.media.schooltype = "";
        $scope.media.schoolnumber = "";
        $scope.media.universityid = "";
    }
    $scope.addSave = function () {
        if(!$scope.media.admintypeid){
            return;
        }
        $rootScope.loading = true;
        if($scope.media.password!=$scope.media.password1){
            swal("提示","两次密码不一致！", "error"); 
            return;
        }
        return AdminService.addAdmin({
            password : $scope.media.password,
            admintypeid : $scope.media.admintypeid,
            username : $scope.media.username,
            useraccount : $scope.media.useraccount,
            roleid : 2,
            schooltype : $scope.media.schooltype,
            schoolnumber : $scope.media.schoolnumber,
            universityid : $scope.media.universityid
        }).success(function(data){
            if(data.code == 0){
                swal("提示","添加成功！", "success"); 
                $scope.media.status = 0;
                $scope.media.adminid = data.adminId;
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
        if(!$scope.media.adminid){
            return;
        }
        $rootScope.loading = true;
        return AdminService.editAdmin({
            adminid : $scope.media.adminid,
            username : $scope.media.username,
            //useraccount : $scope.media.useraccount,
            roleid : 2,
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
            return AdminService.delAdmin({
                adminid : $scope.media.adminid
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
    
    refresh().then(function () {
        if($scope.admins[0]){
            $scope.add(2,$scope.admins[0]);
        }
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
  }]);
