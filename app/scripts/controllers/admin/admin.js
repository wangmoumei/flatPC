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
        $scope.dic = data.list;
        refresh();
        console.log(data);
    });
    function refresh(){
        $rootScope.loading = true;
        return AdminService.getList().success(function(data){
            
            $scope.admins = data.list;
            $rootScope.loading = false;
        });
    }
  }]);
