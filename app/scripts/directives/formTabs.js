angular.module('flatpcApp')
.directive('formTabs', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.click(function(){
                var e = event.target;
                if($(e).attr('data-role')){
                    if($(e).attr('data-role') == 'next'){
                        var i = $(e).closest('li.active').index();
                        iElement.find('.form-tabs-container>li.active').removeClass('active');
                        iElement.find('.form-tabs-container>li').eq(i+1).addClass('active');
                        iElement.find('.form-tabs-nav>li').eq(i+1).addClass('active');
                    }else{
                        var i = $(e).closest('li.active').index();
                        iElement.find('.form-tabs-container>li.active').removeClass('active');
                        iElement.find('.form-tabs-container>li').eq(i-1).addClass('active');
                        iElement.find('.form-tabs-nav>li').eq(i).removeClass('active');
                    }
                }
            });
            scope.resetForm = function(fun){
                iElement.closest('.info-card').addClass('show');
                iElement.find('.form-tabs-container>li.active').removeClass('active');
                iElement.find('.form-tabs-container>li').eq(0).addClass('active');
                iElement.find('.form-tabs-nav>li.active').removeClass('active');
                iElement.find('.form-tabs-nav>li').eq(0).addClass('active');
                if(fun && typeof fun == 'function') fun();
            }
        }
    };
});