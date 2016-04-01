angular.module('flatpcApp')
.directive('chart', ['$filter',function($filter) {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            
            var option = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:[]
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        // dataView : {show: true, readOnly: false},
                        //magicType : {show: true, type: ['line', 'bar']},
                        //restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        name : '日期',
                        boundaryGap : false,
                        data : []
                    }
                ],
                yAxis : [
                    {
                        name : '打分',
                        type : 'value',
                        //max : 100
                    }
                ],
                series : []
            };
            var myChart = echarts.init(iElement.get(0),'macarons');
            if(iAttrs.chart.length > 0){
                
                scope[iAttrs.chart] = scope[iAttrs.chart] || {}
                scope[iAttrs.chart].option = option;
                scope[iAttrs.chart].myChart = myChart;
                scope[iAttrs.chart].resetChart = function (fun) {
                    scope[iAttrs.chart].myChart = echarts.init(iElement.get(0),'macarons');
                    // console.log(scope[iAttrs.chart].myChart);
                    if(fun && typeof fun == 'function') fun();
                }
            }else {
                if(!scope.option){
                    scope.option = option;
                }
                scope.myChart = myChart;
                scope.resetChart = function (fun) {
                    scope.myChart = echarts.init(iElement.get(0),'macarons');
                    if(fun && typeof fun == 'function') fun();
                }
            }
            
            
        }
    };
}]);