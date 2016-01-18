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
        }
    };
});