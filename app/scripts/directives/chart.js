angular.module('flatpcApp')
.directive('chart', ['$filter',function($filter) {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            if(!scope.option){
                scope.option = {
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
                            name : '周数',
                            boundaryGap : false,
                            data : []
                        }
                    ],
                    yAxis : [
                        {
                            name : '打分',
                            type : 'value',
                            max : 100
                        }
                    ],
                    series : []
                };
                scope.myChart = echarts.init(iElement.get(0),'macarons');
                
            }
        }
    };
}]);