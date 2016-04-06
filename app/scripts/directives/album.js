angular.module('flatpcApp')
.directive('album', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.find('ul').click(function(){
                var even = arguments.callee.caller.arguments[0] || window.event; 
                var e = even.target;
                // alert(e.tagName);
                if(e.tagName != 'LI' && e.tagName != 'I'){
                    e = $(e).closest('li').get(0);
                }
                if($(e).hasClass('album-item')){
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
}).directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  }
});