angular.module('flatpcApp')
  .controller('MissingCtrl', ['$scope','$rootScope',function ($scope, $rootScope) {
    $rootScope.otherwise = true;
    $rootScope.loading = false;
  }]);