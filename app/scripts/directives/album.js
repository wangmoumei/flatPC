angular.module('flatpcApp')
.directive('album', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.find('li').click(function(){
                if($(this).hasClass('album-plus')){
                    $(this).find('input').get(0).click();
                }else{
                    iElement.find('.album-frame').addClass('show-frame').html('<div>'+$(this).html()+'</div>');
                    iElement.find('.album-frame-off').show();
                }
            });
            iElement.find('.album-frame-off').click(function(){
                iElement.find('.album-frame').removeClass('show-frame');
                $(this).hide();
            });
        }
    };
});