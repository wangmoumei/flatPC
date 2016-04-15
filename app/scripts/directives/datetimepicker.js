angular.module('flatpcApp')
.directive('datetimepicker', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.val(new Date().Format("yyyy-MM-dd hh:mm"));
            iElement.datetimepicker({
                format: "yyyy-mm-dd hh:ii",
                language:'zh-CN',
                autoclose: true,
                todayBtn: true,
                pickerPosition:'top-right'
            });
        }
    };
})
.directive('datepicker', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.val(new Date().Format("yyyy-MM-dd"));
            iElement.datetimepicker({
                format: "yyyy-mm-dd",
                language:'zh-CN',
                autoclose: true,
                todayBtn: true,
                startView:'year',
                minView:'month',
                pickerPosition:'top-right'
            });
            if(iAttrs.change){
                iElement.datetimepicker({
                    format: "yyyy-mm-dd",
                    language:'zh-CN',
                    autoclose: true,
                    todayBtn: true,
                    startView:'year',
                    minView:'month',
                    pickerPosition:'top-right'
                }).on('changeDate', function(ev){
                    scope.$eval(iAttrs.change);
                });
            }else{
                iElement.datetimepicker({
                    format: "yyyy-mm-dd",
                    language:'zh-CN',
                    autoclose: true,
                    todayBtn: true,
                    startView:'year',
                    minView:'month',
                    pickerPosition:'top-right'
                });
            }
        }
    };
})
.directive('monthpicker', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.val(new Date().Format("yyyy-MM"));
            iElement.datetimepicker({
                format: "yyyy-mm",
                language:'zh-CN',
                autoclose: true,
                todayBtn: true,
                startView:'year',
                minView:'year',
                pickerPosition:'top-right'
            });
        }
    };
})
.directive('yearpicker', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            iElement.val(new Date().getFullYear() );
            iElement.datetimepicker({
                format: "yyyy",
                language:'zh-CN',
                autoclose: true,
                todayBtn: true,
                startView:'decade',
                minView:'decade',
                pickerPosition:'top-right'
            });
        }
    };
});