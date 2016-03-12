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
    }]);