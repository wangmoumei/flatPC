angular.module('flatpcApp')
  .controller('AsideCtrl', ['$scope', '$state','$rootScope',function($scope, $state,$rootScope) {
        $scope.name = $state.current.name;
        console.log($scope.name);
        $scope.switch = function(name){
            $rootScope.sysMenu[1] = name;
        }
    }]);