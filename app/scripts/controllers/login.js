'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('LoginCtrl',['$scope', 'PublicService','$rootScope','AppConfig','$location','authority',function($scope, PublicService,$rootScope,AppConfig,$location,authority) {
        $rootScope.loading = false;
        $rootScope.loginSwitch = false;
        $scope.media = {
            user:'',
            pass:'',
            code:'',
            rem:false
        }
        $scope.login = function () {
            if($scope.media.user.length > 0 && $scope.media.pass.length > 0 && $scope.media.code.length > 0){
                $rootScope.loading = true;
                PublicService.login({
                    useraccount:$scope.media.user,
                    password:$scope.media.pass,
                    code:$scope.media.code
                }).success(function (data) {
                    $rootScope.loading = false;
                    if(data.code == 0){
                        localStorage.adminId = data.data.adminId;
                        localStorage.token = data.data.token;
                        localStorage.nodeIds = data.data.nodeIds;
                        localStorage.schoolCode = data.data.schoolCode;
                        localStorage.userName = data.data.userName;
                        localStorage.roleName = data.data.roleName;
                        localStorage.roleId = data.data.roleId;
                        localStorage.userAccount = data.data.userAccount;
                        localStorage.isOpenBed = data.data.isOpenBed;
                        // if(AppConfig.adminId && AppConfig.token && AppConfig.nodeIds && AppConfig.schoolCode && AppConfig.userName && AppConfig.roleName && AppConfig.roleId && AppConfig.userAccount){
                        //     $location.path('/index');
                        //     $rootScope.loginSwitch = true;
                        // }
                        if(authority.check()){
                            $rootScope.treeFlat = null;
                            $rootScope.treeCollege = null;
                            $rootScope.treeTerm = null;
                            $rootScope.treeGrade = null;
                            $rootScope.treeType = null;
                            $rootScope.treeGroup = null;
                            $rootScope.treeMenu = null;
                            
                            
                            location.href = '#index';
                            $rootScope.loginSwitch = true;
                        }
                        
                    }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                })
            }
            
        }
    }]);
