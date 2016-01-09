angular.module('flatpcApp')
.controller('ListCtrl', function($scope, $state,AppConfig,$rootScope) {
    $scope.name = $state.current.name;
    $rootScope.loading = false;
    console.log($scope.name);
});