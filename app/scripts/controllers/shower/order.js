'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:formCtrl
 * @description
 * # formCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('orderCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '浴室预定','预约处理','处理中心'
    ];
    //跳转到什么地方去
    $scope.parent = "order";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.FRAME + "index.php?m=Order&c=Manager&a=orderSearch&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);