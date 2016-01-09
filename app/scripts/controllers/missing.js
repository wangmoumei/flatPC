angular.module('flatpcApp')
  .controller('MissingCtrl', function ($scope, $rootScope) {
    $rootScope.otherwise = true;
    $rootScope.loading = false;
  });