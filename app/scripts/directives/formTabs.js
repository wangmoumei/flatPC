angular.module('flatpcApp')
.directive('formTabs', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.click(function(event){
                var even =window.event ||  event; 
                var e = even.target;
                if(e.className == 'form-tabs-point') e = e.parentNode;
                if($(e).attr('data-role')){
                    var i = 0,role = $(e).attr('data-role');
                    if(role == 'next'){
                        i = $(e).closest('li.active').index();
                        iElement.find('.form-tabs-container>li').eq(i+1).addClass('active').siblings().removeClass('active');
                        iElement.find('.form-tabs-nav>li').eq(i+1).addClass('active');
                    }else if(role == 'prev'){
                        i = $(e).closest('li.active').index();
                        iElement.find('.form-tabs-container>li').eq(i-1).addClass('active').siblings().removeClass('active');
                        iElement.find('.form-tabs-nav>li').eq(i).removeClass('active');
                    }else if(role == 'transfer'){
                        if($(e).attr('data-transfer')){
                            if(scope.$eval($(e).attr('data-transfer'))){
                               i = $(e.parentNode).index();
                               iElement.find('.form-tabs-container>li').eq(i).addClass('active').siblings().removeClass('active');
                               
                            }
                        }
                    }
                }
            });
            scope.resetForm = scope.resetForm || function(str,fun){
                var e;
                if(str && typeof str == 'string') e = $(str);
                else e = iElement;
                if(!e.hasClass("info-card"))
                    e = e.closest('.info-card');
                e.addClass('show');
                e.find('.form-tabs-container>li').eq(0).addClass('active').siblings().removeClass('active');
                e.find('.form-tabs-nav>li').eq(0).addClass('active').siblings().removeClass('active');
                if(str && typeof str == 'function') str();
                if(fun && typeof fun == 'function') fun();
            }
            
        }
    };
});