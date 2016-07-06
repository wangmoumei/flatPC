'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:formCtrl
 * @description
 * # formCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('kuaichaCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '公寓管理','公寓管理','快速查询'
    ];
    //跳转到什么地方去
    $scope.parent = "flat";
    $rootScope.loading = false;
    var a = document.createElement('a');
   a.href = AppConfig.FRAME + "index.php?m=Apartment&c=QuickSearch&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);
