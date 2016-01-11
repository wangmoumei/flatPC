angular.module('flatpcApp')
.directive('tabs', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.find('.page-tabs-nav li').click(function(){
                iElement.find('.page-tabs-container>li.active').removeClass('active');
                iElement.find('.page-tabs-nav>li.active').removeClass('active');
                iElement.find('.page-tabs-container>li').eq($(this).addClass('active').index()).addClass('active');
            });
        }
    };
});