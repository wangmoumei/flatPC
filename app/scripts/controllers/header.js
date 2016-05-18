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
            $rootScope.frame = false;
            switch(name){
                case 'wechat':
                    if(!$rootScope.menuCheck(318)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    location.href="/index.php?s=/addon/HomePage/HomePage/lists.html";
                    break;
                case 'food':
                    if(!$rootScope.menuCheck(317)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    location.href="/index.php?s=/addon/Dingcan/Dingcan/lists.html";
                    break;
                case 'flat':
                    if(!$rootScope.menuCheck(1)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    break;
                case 'repair':
                    if(!$rootScope.menuCheck(4)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    location.href="/index.php?s=/addon/RepairSystem/RepairSystem/lists.html";
                    break;
                case 'pay':
                    if(!$rootScope.menuCheck(5)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    
                    swal("提示","敬请期待", "info"); 
                    return;
                    
                case 'data':
                    if(!$rootScope.menuCheck(2)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    break;
                case 'admin':
                    if(!$rootScope.menuCheck(3)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    break;
                case 'message':
                    if(!$rootScope.menuCheck(319)){
                        swal("提示","请联系客服电话0571-28256212 开通权限", "info"); 
                        return;
                    }
                    location.href="/messageadmin";
                    break;
            }
            $rootScope.sysMenu[0] = name;
            $rootScope.sysMenu[1] = name;
        }
        $scope.logout = function () {
            PublicService.logout().success(function (data) {
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
                        var form = document.createElement("form");
                        form.target = "test";
                        form.method = "post";
                        form.action = "/index.php?s=/Home/User/logout.html";
                        
                        form.submit();
                        location.href = '#login';
                        
                    }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            })
        }
        var toggles = localStorage.toggles || "";
        $scope.media = {
            old:'',
            newPassword:'',
            confirm:'',
            name:AppConfig.userName,
            wechat:!new RegExp(",wechat,").test(","+toggles+","),
            flat:!new RegExp(",flat,").test(","+toggles+","),
            repair:!new RegExp(",repair,").test(","+toggles+","),
            food:!new RegExp(",food,").test(","+toggles+","),
            pay:!new RegExp(",pay,").test(","+toggles+","),
            data:!new RegExp(",data,").test(","+toggles+","),
            admin:!new RegExp(",admin,").test(","+toggles+","),
            message:!new RegExp(",message,").test(","+toggles+",")
        }
        $scope.change = function name(params) {
            swal("提示","请联系客服电话0571-28256212 修改密码", "info"); 
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
                        token:AppConfig.token,
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
        $scope.toggleSave = function () {
            var str = "";
            if(!$scope.media.wechat)str += "wechat,";
            if(!$scope.media.flat)str += "flat,";
            if(!$scope.media.repair)str += "repair,";
            if(!$scope.media.food)str += "food,";
            if(!$scope.media.pay)str += "pay,";
            if(!$scope.media.data)str += "data,";
            if(!$scope.media.admin)str += "admin,";
            if(!$scope.media.message)str += "message,";
            if(str.length>0){
                localStorage.toggles = str.substring(0,str.length-1);
            }else localStorage.toggles ="";
            if($scope.topResize)$scope.topResize();
        }
    }]);