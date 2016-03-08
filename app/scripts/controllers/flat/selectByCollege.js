angular.module('flatpcApp')
.controller('CollegeCtrl', ['$scope','AppConfig','$rootScope','CollegeService',function($scope,AppConfig,$rootScope,CollegeService) {
    if(!$rootScope.treeCollege){
        CollegeService.getList(AppConfig.schoolCode).success(function(data){
            if(data.code == 0){
                $rootScope.treeCollege = data.data;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                
            $rootScope.loading = false;
        });
    }
    else {
        $rootScope.loading = false;
    }
    
}]);