angular.module('flatpcApp')
  .controller('AsideCtrl', function($scope, $state,AppConfig) {
        $scope.name = $state.current.name;
        console.log($scope.name);
    });