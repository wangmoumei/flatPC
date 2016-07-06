'use strict';

angular.module('flatpcApp')
.controller('reportnoticeCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '数据中心','预报到管理','棉被预定'
    ];
    //跳转到什么地方去
    $scope.parent = "flat";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.REPORT + "index.php?m=Admin&c=Reserve&a=index";
    a.target="page-frame";
    a.click();
}]);