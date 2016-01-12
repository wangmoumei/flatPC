angular.module('flatpcApp')
.directive('infoCard', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.find('.info-card-close').click(function(){
                iElement.removeClass('show');
            });
        }
    };
});