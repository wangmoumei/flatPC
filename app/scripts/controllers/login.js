angular.module('flatpcApp')
  .controller('LoginCtrl', function ($scope, $state,AppConfig,$rootScope) {
    $scope.login = true;
    $rootScope.loading = false;
  });