angular.module('flatpcApp')
.directive('frameLoad', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.get(0).onload=function(){
                
                if(scope.loaded){
                    scope.loaded();
                }
            }
        }
    };
});