'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('RuleStatisticsCtrl', ['$scope','$rootScope','FlatService','AppConfig','$filter','RuleService',
  function ($scope,$rootScope,FlatService,AppConfig,$filter,RuleService) {
    
    
    $scope.media = {
        tab:1,
        setTab:function(n) {
            this.tab = n;
            refresh();
            
        },
        type:0,
        flatid:'',
        liveareaid:'',
        campusid:'',
        data:[],
        starttime:new Date(new Date() - 1000*60*60*24*30).Format('yyyy-MM-dd'),
        endtime:new Date().Format('yyyy-MM-dd'),
        sub:function () {
            refresh();
            
        },
        getTotal: function () {
            var sum = 0;
            try {
                for(var i=0;i <$scope.list.length;i++){
                    sum += $scope.list[i].total;
                }
            } catch (error) {
                
            }
            return sum;
        }
    }
    $scope.show = function (type,item,campus,liveArea) {
        $scope.media.type = type;
        item = item || {};
        $scope.media.flatid = item.flatId || '';
        $scope.media.liveareaid = item.liveAreaId || '';
        $scope.media.campusid = item.campusId || '';
        $scope.media.title = (item.title + (campus?('-' + campus):'') + (liveArea?('-' + liveArea):'')) || '';
        // console.log(item);
        refresh();
    }
    // $rootScope.loading = false;
    function refresh() {
        $rootScope.loading = true;
        if($scope.media.tab == 1){
            RuleService.getStatistics($scope.media).success(function (data) {
                $rootScope.loading = false;
                if(data.code == 0){
                    $scope.data = data.list;
                    if($scope.media.type == 3){
                        data.list.floorList = data.list.floorList || [];
                        data.list.floorList.forEach(function(list){
                            list.roomList = list.roomList || [];
                            list.roomList =  $filter('sliceArray')(list.roomList);
                        });
                        $scope.flat = data.list;
                        $scope.list = [];
                    }else{
                        $scope.list = data.list;
                        $scope.flat = [];
                    }
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            })
        }else{
            RuleService.getStatisticsData($scope.media).success(function (data) {
                if(data.code == 0){
                    $scope.media.data = data.list;
                    chartInit();
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            })
        }
        
    }
    function chartInit() {
        // console.log($scope.option);
        if($scope.media.flatid){
            // $scope.option.legend.data=['楼栋'];
            $scope.option.series = [
                {
                    name:'楼栋',
                    type:'line',
                    smooth :false,
                    symbol :'triangle',
                    symbolSize :10,
                    data:$filter('ObjToArray')($scope.media.data,'total') || []
                }
            ];
        }
        else if($scope.media.liveareaid){
            // $scope.option.legend.data=['生活区'];
            $scope.option.series=[
                {
                    name:'生活区',
                    type:'line',
                    smooth :false,
                    symbol :'circle',
                    symbolSize :10,
                    data:$filter('ObjToArray')($scope.media.data,'total') || []
                }
            ];
        }
        else if($scope.media.campusid){
            // $scope.option.legend.data=['校区'];
            $scope.option.series=[
                {
                    name:'校区',
                    type:'line',
                    smooth :false,
                    symbol :'diamond',
                    symbolSize :10,
                    data:$filter('ObjToArray')($scope.media.data,'total') || []
                }
            ];
        }else{
            // $scope.option.legend.data=['全校'];
            $scope.option.series=[
                {
                    name:'全校',
                    type:'line',
                    smooth :false,
                    symbol :'rect',
                    symbolSize :10,
                    data:$filter('ObjToArray')($scope.media.data,'total') || []
                }
            ];
        }
        $scope.option.xAxis[0].data=$filter('ObjToArray')($scope.media.data,'date') || [];
        $scope.option.yAxis[0].name = "违章数";
        $scope.resetChart(function () {
            $scope.myChart.setOption($scope.option); 
        });
        $rootScope.loading = false;
    }
    if(!$rootScope.treeFlat){
        FlatService.getList(AppConfig.schoolCode).success(function(data){
            // console.log(data);
            $rootScope.treeFlat = data.data;
            
            if(data.code == 0){
                $scope.show(0,data.data);
            }else if(data.code == 4037){
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                location.href="#login";$rootScope.loading = false;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        });
    }else{
       $scope.show(0,$rootScope.treeFlat);
    }

    $scope.download = function () {
        $rootScope.loading = true;
        RuleService.downloadStatistics($scope.media).success(function (data) {
            // console.log(data);            
            $rootScope.loading = false;
            if(data.code == 0){
                location.href = data.data.fileUrl;
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
    }
    $scope.loadInfo = function (room) {
        // alert(room.roomId);
        $rootScope.loading = true;
        return RuleService.getStatisticsData({
            starttime:$scope.media.starttime,
            endtime:$scope.media.endtime,
            roomid:room.roomId,
        }).success(function (data) {
            $rootScope.loading = false;
            if(data.code == 0){
                $scope.roomChart.option.yAxis[0].name = "违章数";
                $scope.media.data = data.list;
                $scope.roomChart.option.series = [
                    {
                        name:room.roomNum + '寝室',
                        type:'line',
                        smooth :false,
                        symbol :'triangle',
                        symbolSize :10,
                        data:$filter('ObjToArray')($scope.media.data,'total') || []
                    }
                ];
                $scope.roomChart.option.xAxis[0].data=$filter('ObjToArray')($scope.media.data,'date') || [];
                $scope.roomChart.resetChart(function () {
                    $scope.roomChart.myChart.setOption($scope.roomChart.option); 
                });
            }else if(data.code == 4037){
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        location.href="#login";$rootScope.loading = false;
                    }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
    }
  }]);
