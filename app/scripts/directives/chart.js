angular.module('flatpcApp')
.directive('chart', function() {
    return {
        restrict: 'A',
        link:function(scope,iElement,iAttrs){
            if(!scope.option){
                scope.option = {
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['校区','生活区','楼栋']
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            //magicType : {show: true, type: ['line', 'bar']},
                            //restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : ['第1周','第2周','第3周','第4周','第5周','第6周','第7周']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'校区',
                            type:'line',
                            smooth :false,
                            symbolSize :10,
                            data:[88, 99, 87, 91, 90, 80, 79]
                        },
                        {
                            name:'生活区',
                            type:'line',
                            smooth :false,
                            symbol :'rect',
                            symbolSize :10,
                            data:[77, 88, 78, 87, 89, 98, 95]
                        },
                        {
                            name:'楼栋',
                            type:'line',
                            smooth :false,
                            symbol :'diamond',
                            symbolSize :10,
                            data:[79, 87, 85, 88, 92, 95, 97]
                        }
                    ]
                };
                scope.myChart = echarts.init(iElement.get(0),'macarons');
                scope.myChart.setOption(scope.option); 
            }
        }
    };
});