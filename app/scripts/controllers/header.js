'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('HeaderCtrl', ['$scope','$rootScope','PublicService','AppConfig',
  function($scope,$rootScope,PublicService,AppConfig) {
        $scope.switch = function(t,name){
            $rootScope.frame = t?true:false;
            $rootScope.sysMenu[0] = name;
            $rootScope.sysMenu[1] = name;
        }
        $scope.logout = function () {
            PublicService.logout({
                adminId:AppConfig.adminId || 1
            }).success(function (data) {
                $rootScope.loading = false;
                    if(data.code == 0){
                        localStorage.adminId = "";
                        localStorage.token = "";
                        localStorage.nodeIds = "";
                        localStorage.schoolCode = "";
                        localStorage.userName = "";
                        localStorage.roleName = "";
                        localStorage.roleId = "";
                        localStorage.userAccount = "";
                        localStorage.isOpenBed = "";
                        location.href = '#login';
                    }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            })
        }
        $scope.media = {
            old:'',
            newPassword:'',
            confirm:'',
            name:AppConfig.userName
        }
        $scope.editSave = function (fun) {
            if($scope.media.old.length > 0 && $scope.media.newPassword.length > 0 && $scope.media.confirm.length > 0)
            {
                if($scope.media.old == $scope.media.newPassword){
                    swal("提示","新密码和旧密码不可以相同！", "error"); 
                    return;
                }else if($scope.media.confirm != $scope.media.newPassword){
                    swal("提示","两次输入的密码不相同！", "error"); 
                    return;
                }else{
                    $rootScope.loading = true;
                    PublicService.password({
                        adminid:AppConfig.adminId,
                        password:$scope.media.old,
                        newpassword:$scope.media.newPassword,
                        renewpassword:$scope.media.confirm
                    }).success(function (data) {
                        $rootScope.loading = false;
                            if(data.code == 0){
                                swal("提示","修改成功！", "success"); 
                                if(fun && typeof fun == 'function') fun();
                            }
                            else
                                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    })
                }
            }
        }
    }]);