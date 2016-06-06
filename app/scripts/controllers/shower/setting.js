'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:formCtrl
 * @description
 * # formCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('settingCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '浴室预定','相关设置','设置中心'
    ];
    //跳转到什么地方去
    $scope.parent = "setting";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.FRAME + "index.php?m=Setting&c=Manager&a=bathroomList&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}]);