angular.module('flatpcApp')
.directive('inputFile', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            var input = document.createElement("input"),form = document.createElement('form');
            input.type = "file";
            input.name = "file";
            iElement.append(form);
            form.style.display = "none";
            form.appendChild(input);
            iElement.click(function(){
                input.click();
            });
            if(iAttrs.change)
                input.addEventListener("change",function(){
                    var reback= scope.$eval(iAttrs.change);
                    if(reback && reback.then)
                        reback.then(function(){
                            form.reset();
                        });
                })
        }
    };
});