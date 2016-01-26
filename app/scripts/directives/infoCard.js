angular.module('flatpcApp')
.directive('infoCard', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.find('.info-card-close').click(function(){
                iElement.removeClass('show');
            });
            scope.showCard = scope.showCard || function(str,fun){
                var node = typeof str == "string" || (typeof str == 'object' && str.selecter)?$(str):$('.info-card').eq(0);
                function show(){node.addClass('show');}
                if(typeof str == 'object'){
                    if(str.before){
                        if(str.before.then){
                            str.before.then(function(){
                                show();
                            })
                        }
                    }
                }else{
                    show();
                    if(typeof str == 'function'){
                        str(node);
                    }
                }
                if(fun && typeof fun == 'function')
                    fun(node);
            };
        }
    };
});