angular.module('flatpcApp')
  .controller('HeaderCtrl', ['$scope','$rootScope',function($scope,$rootScope) {
        $scope.switch = function(t,name){
            $rootScope.frame = t?true:false;
            $rootScope.sysMenu[0] = name;
            $rootScope.sysMenu[1] = name;
        }
    }]);