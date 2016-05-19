angular.module('flatpcApp')
.directive('tree', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.click(function(event){
                var even = event || window.event; 
                var a = even.target;
                if(a.tagName == 'A'){
                    if($(a).hasClass('branch')){
                        var n = a.parentNode.className;
                        if(/open/.test(n)){
                            $(a).siblings("ul").slideUp("fast",function(){$(a.parentNode).removeClass('open')});
                        }
                        else {
                            $(a).siblings("ul").slideDown("fast",function(){$(a.parentNode).addClass('open')});
                        }
                    }
                        iElement.find("a.active").removeClass("active");
                        $(a).addClass("active");
                    
                }
            })
        }
    };
});