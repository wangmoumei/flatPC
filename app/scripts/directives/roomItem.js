angular.module('flatpcApp')
.directive('roomItem', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            var timer;
            iElement.mouseover(function () {
                var e = event.target;
                if($(e).hasClass('add-before')){
                    iElement.animate({width:'+=20px'})
                }else if($(e).hasClass('add-after')){
                    iElement.animate({width:'+=20px'})
                }
            });
            iElement.mouseout(function () {
                var e = event.target;
                if($(e).hasClass('add-before')){
                    iElement.animate({width:'-=20px'})
                }else if($(e).hasClass('add-after')){
                    iElement.animate({width:'-=20px'})
                }
            });
            //fx(0,200,function(x){box.style.left=x+"px";},function(){},500,.3)
            function fx(f,t,fn,end,tm,pow){
                var D=Date;
                var d=new D;
                var e;
                var c=tm||240;
                var pow=pow||2;
                return e=setInterval(function (){
                    var z=Math.min(1,(new D-d)/c);
                    (false===fn(+f+(t-f)*Math.pow(z,pow),z)||z==1) && end && end(clearTimeout(e));
                },10);
            }
        }
    };
});