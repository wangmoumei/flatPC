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
        $rootScope.loginSwitch = false;
        $scope.media = {
            user:localStorage.username || "",
            pass:'',
            code:'',
            rem:localStorage.remember?true:false,
            sessionid:''
        }
        PublicService.session({
            useraccount:$scope.media.user,
            password:$scope.media.pass,
            code:$scope.media.code
        }).success(function (data) {
            $rootScope.loading = false;
            if(data.code == 0)
                $scope.media.sessionid = data.data.sessionid;
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
        $scope.login = function () {
            if($scope.media.user.length > 0 && $scope.media.pass.length > 0 && $scope.media.code.length > 0){
                $rootScope.loading = true;
                PublicService.login({
                    useraccount:$scope.media.user,
                    password:$scope.media.pass,
                    code:$scope.media.code,
                    sessionid:$scope.media.sessionid
                }).success(function (data) {
                    $rootScope.loading = false;
                    if(data.code == 0){
                        sessionStorage.adminId = data.data.adminId;
                        sessionStorage.token = data.data.token;
                        sessionStorage.nodeIds = data.data.nodeIds;
                        sessionStorage.schoolCode = data.data.schoolCode;
                        sessionStorage.userName = data.data.userName;
                        sessionStorage.roleName = data.data.roleName;
                        sessionStorage.roleId = data.data.roleId;
                        sessionStorage.userAccount = data.data.userAccount;
                        sessionStorage.isOpenBed = data.data.isOpenBed;
                        if($scope.media.rem){
                            localStorage.username = $scope.media.user;
                            localStorage.remember = 1;
                        }
                        else {
                            ocalStorage.username = "";
                            localStorage.remember = 0;
                        }
                        
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
