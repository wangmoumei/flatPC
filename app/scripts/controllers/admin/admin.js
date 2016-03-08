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
        status:0,
        adminid:'',
        admintypeid:'',
        username:'',
        password:'',
        useraccount:'',
        schooltype:'',
        schoolnumber:'',
        roleid:'',
        universityid:''
    }
    
    AdminService.getDictionary().success(function (data) {
        
        console.log(data);
        if(data.code == 0){
                $scope.dic = data.list;
                refresh();
        }
        else
            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
    });
    function refresh(){
        $rootScope.loading = true;
        return AdminService.getList().success(function(data){
            if(data.code == 0){
                $scope.admins = data.list;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            $rootScope.loading = false;
        });
    }
  }]);
