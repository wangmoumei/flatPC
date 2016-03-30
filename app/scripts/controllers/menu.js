angular.module('flatpcApp')
  .controller('MenuCtrl', ['$scope','$rootScope','AppConfig',function ($scope,$rootScope,AppConfig) {
    $rootScope.loading = false;
    $scope.switch = {
        week : AppConfig.week==1?false:true,
        month : AppConfig.month==1?false:true,
        day : AppConfig.day==1?false:true,
        bed : AppConfig.bed==1?false:true,
        pass : AppConfig.pass==1?false:true,
        photo : AppConfig.photo==1?false:true,
        takephoto : AppConfig.takephoto==1?false:true,
        check : AppConfig.check==1?false:true,
        role :  AppConfig.role==1?false:true,
    }
  }]);