'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:formCtrl
 * @description
 * # formCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('formCtrl', ['$scope','$rootScope',function($scope,$rootScope) {
        //存储列表头到frame.html中
    $scope.menus = [
        '系统设置','帐号管理'
    ];
    //跳转到什么地方去
    $scope.parent = "data";
    $rootScope.loading = false;
    var a = document.createElement('a');
    a.href = "http://baidu.com";
    a.target="page-frame";
    a.click();
}]);