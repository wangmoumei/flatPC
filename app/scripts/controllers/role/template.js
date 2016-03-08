'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('RoleTemplateCtrl', ['$scope','$rootScope','UserService','$filter',function ($scope,$rootScope,UserService,$filter) {
    $scope.media = {
        type:1,
        status:0,
        groupid:'',
        maxaccount:'',
        listorder:'',
        roleids:'',
        usesid:'',
        title:''
    }
    

    refresh();

    function refresh(){
        $rootScope.loading = true;
        return UserService.getGroupList().success(function(data){
            
            $rootScope.loading = false;
            if(data.code == 0){
                $scope.groups = data.list;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        });
    }
  }]);
