'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('GradeSettingCtrl', ['$scope','AppConfig','$rootScope', 'GradeService',
function($scope,AppConfig,$rootScope,GradeService) {
    $scope.media = {
        tab:1,
        setTab:function (n) {
            this.tab = n;
        },
        on:false
    };
}]);