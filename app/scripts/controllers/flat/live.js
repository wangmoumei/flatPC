angular.module('flatpcApp')
.controller('LiveCtrl', ['$scope','AppConfig','$rootScope', 'FlatService',function($scope,AppConfig,$rootScope,FlatService) {
    if(!$rootScope.treeFlat){
        FlatService.getList(AppConfig.schoolCode).success(function(data){
            console.log(data);
            $rootScope.treeFlat = data.data;
            $rootScope.loading = false;
        });
    }
    else {
        
        $rootScope.loading = false;
    }
    
}]);