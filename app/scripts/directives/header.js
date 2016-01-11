angular.module('flatpcApp')
.directive('topNav', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.find('li').click(function(){
                iElement.find('.active').removeClass('active');
                $(this).addClass('active');
            })
        }
    };
});