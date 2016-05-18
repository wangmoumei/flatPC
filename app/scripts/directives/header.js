//菜单点击事件
$(document).click(function(event){
    var a = event.target;
    $(".user-nav").removeClass("active");
    if(a && a.parentNode && a.parentNode.parentNode.className && a.parentNode.parentNode.className == "user-nav"){
        $(a.parentNode.parentNode).addClass("active");
    }
})
angular.module('flatpcApp')
.directive('headerNavbar', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            var lst1 = iElement.find(".top-navigation").get(0).getElementsByTagName("li"),
                lst2 = iElement.find(".top-navigation").get(1).getElementsByTagName("li");
            var topResize = function(){
                iElement.find(".top-navigation li.toggle").removeClass("toggle");
                if(iElement.find(".top-navigation li a.more").length>0){
                    $(iElement.find(".top-navigation li a.more").get(0).parentNode).remove();
                }
                var toggles = localStorage.toggles || "";
                if(toggles.length>0){
                    toggles.split(",").forEach(function(val){
                        
                        for(var i=0;i < lst1.length;i++){
                            if($(lst1[i]).attr("data-toggle")==val){
                                $(lst1[i]).addClass("toggle");
                                $(lst2[i]).addClass("toggle");
                            }
                        }
                    })
                }
                var boxWidth = parseInt(iElement.css("width")),
                itemWidth = parseInt(iElement.find(".top-navigation").eq(0).css("width"));
                if(boxWidth - 370 < itemWidth){
                    for(var i=lst1.length-1;i>=0;i--){
                        if(!$(lst1[i]).hasClass("toggle")){
                            $(lst1[i]).addClass("toggle");
                            $(lst2[i]).addClass("toggle");
                            itemWidth = parseInt(iElement.find(".top-navigation").eq(0).css("width"));
                            if(boxWidth - 370 >= itemWidth)break;
                        }
                    }
                }
                if(iElement.find(".top-navigation li.toggle").length>0){
                    iElement.find(".top-navigation").eq(0).find("ul").append('<li ><a class="more">全部</a></li>');
                }
            }
            window.onresize = topResize;
            scope.topResize = topResize;
            topResize();
            iElement.click(function(event){
                var ele = event.target;
                if(ele.className == "more" && !iElement.hasClass("toggle-show")){
                    iElement.addClass("toggle-show")
                }else{
                    iElement.removeClass("toggle-show");
                }
            })
            iElement.find(".page-navbar-close").click(function(){
                iElement.removeClass("toggle-show");
                
            })
        }
    };
});