angular.module('flatpcApp')
.directive('focus', function($timeout, $parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.focus);
            scope.$watch(model, function(value) {
                if(value) { 
                    $timeout(function() {
                        element[0].focus(); 
                    });
                }
            });
            // to address @blesh's comment, set attribute value to 'false'
            // on blur event:
            element.bind('blur', function() {
                scope.$apply(model.assign(scope, false));
            });
        }
    };
});