angular.module('flatpcApp')
.controller('CollegeCtrl', ['$scope','AppConfig','$rootScope','CollegeService',function($scope,AppConfig,$rootScope,CollegeService) {
    if(!$rootScope.treeCollege){
        CollegeService.getList(AppConfig.schoolCode).success(function(data){
            console.log(data);
            $rootScope.treeCollege = data.data;
            $rootScope.loading = false;
        });
    }
    else {
        $rootScope.loading = false;
    }
    
}]);