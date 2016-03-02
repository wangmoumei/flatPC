angular.module('flatpcApp')
.directive('album', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.find('ul').click(function(){
                var e = event.target;
                if(e.tagName != 'LI'){
                    e = $(e).closest('li').get(0);
                }
                if($(e).hasClass('album-plus')){
                    $(e).find('input').get(0).click();
                }else{
                    iElement.find('.album-frame').addClass('show-frame').html('<div>'+$(e).html()+'</div>');
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