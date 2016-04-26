'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('UserListCtrl', ['$scope','$rootScope',function($scope,$rootScope) {
    $scope.menus = [
        '数据中心','用户中心','用户列表'
    ];
    $scope.parent = "data";
    $rootScope.loading = false;
    var a = document.createElement('a');
    a.href = "http://code.houqinbao.com/flat/computeSetting.html";
    a.target="page-frame";
    a.click();
}]);