angular.module('flatpcApp')
.directive('infoCard', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.find('.info-card-close').click(function(){
                iElement.removeClass('show');
            });
            scope.showCard = function(str,fun){
                if(str){
                    if(typeof str == "string"){
                        $(str).addClass('show');
                    }else if(typeof str == 'function')
                        str(iElement);
                }else{
                    $('.info-card').eq(0).addClass('show');
                }
                if(fun && typeof fun == 'function')
                    fun(iElement);
            };
        }
    };
});