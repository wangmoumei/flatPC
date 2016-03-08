'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('RoleCtrl', ['$scope','$rootScope','RoleService','$filter',function ($scope,$rootScope,RoleService,$filter) {
    $scope.media = {
        type:1,
        status:0,
        epage:1,
        pageCount:1,
        recordCount:1,
        pagesize:30
    }
    //换页
    $scope.setPage = function(n){
        if($scope.media.epage + n >0 && $scope.media.epage + n <= $scope.media.pageCount){
            $scope.media.epage += n;
            refresh();
        } 
    };
    //调整每页显示量
    $scope.setPageSize = function(n){
        $scope.media.pagesize = n;
        refresh();
    }

    refresh();

    function refresh(){
        $rootScope.loading = true;
        return RoleService.getList($scope.media).success(function(data){
            console.log(data);
            
            $rootScope.loading = false;
            if(data.code == 0){
               $scope.list = data.data?data.data.list:[] || [];
                
                $scope.media.recordCount = data.data?data.data.recordCount:0;
                $scope.media.pageCount = data.data?data.data.pageCount:0;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        });
    }
    
    
    $scope.role = {
        title:'',
        remark:'',
        type:1,
        status:1
    }
    
    
  }]);
