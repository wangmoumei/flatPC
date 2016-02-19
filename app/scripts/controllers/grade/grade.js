angular.module('flatpcApp')
.controller('GradeCtrl', ['$scope','AppConfig','$rootScope', 'FlatService','TermService',
function($scope,AppConfig,$rootScope,FlatService,TermService) {
    
    $scope.media = {
        flatid:'',
        yearIndex:0,
        termIndex:0,
        week:0
    }
    
    if(!$rootScope.treeTerm)
        TermService.getList().success(function(data){
            console.log(data);
            $rootScope.treeTerm = data.data;
            getFlat();
        }); 
    else {
        getFlat();
    }
    
    function getFlat() {
       if(!$rootScope.treeFlat){
            FlatService.getList(AppConfig.schoolCode).success(function(data){
                console.log(data);
                $rootScope.treeFlat = data.data;
                init();
            });
        }
        else
        {
            init();
        }
    }
    
    function init() {
        
    }

    $scope.weekList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    $scope.detail = function(){
        $('.info-card').addClass('show');
    }
    $scope.initCard = function(e){
        //$rootScope.loading = true;
        console.log('do something');
    }
    $rootScope.loading = false;
    /*$scope.myChart.setOption({
        series : [
            {
                data:[48, 49, 57, 41, 30, 50, 39]
            },
            {
                data:[67, 38, 48, 57, 49, 68, 55]
            },
            {
                data:[69, 47, 55, 38, 62, 55, 37]
            }
        ]
    }); */
}]);