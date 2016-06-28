'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:formCtrl
 * @description
 * # formCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('hutiaoCtrl', ['$scope','$rootScope',function($scope,$rootScope) {
        //存储列表头到frame.html中
    $scope.menus = [
        '公寓管理','日常调换宿','相互调宿'
    ];
    //跳转到什么地方去
    $scope.parent = "flat";
    $rootScope.loading = false;
    var a = document.createElement('a');
    a.href = "http://baidu.com";
    a.target="page-frame";
    a.click();
}]);