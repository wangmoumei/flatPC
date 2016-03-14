'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('StatisticsCtrl', ['$scope','$rootScope','FlatService','AppConfig','GradeService','$filter','TermService',
  function ($scope,$rootScope,FlatService,AppConfig,GradeService,$filter,TermService) {
    
    
    $scope.media = {
        schoolyearid:'',
        semesterid:'',
        flatid:'',
        liveareaid:'',
        campusid:'',
        data:[],
        getYear:function(n) {
            var that = this;
            this.semesterid = '';
            $rootScope.treeTerm.forEach(function (year,i) {
                year.semesterList.forEach(function (term,j) {
                    if(term.isCurrent){
                        that.schoolyearid = year.schoolYearId;
                        if(n)
                            return;
                        else refresh();
                        return;
                    }
                    if(i == $rootScope.treeTerm.length - 1 && j == year.semesterList.length - 1){
                        that.schoolyearid = $rootScope.treeTerm[0].schoolYearId;
                        if(n)
                            return;
                        else refresh();
                        return;
                    }
                })
            })
        },
        getTerm:function(n) {
            var that = this;
            $rootScope.treeTerm.forEach(function (year,i) {
                year.semesterList.forEach(function (term,j) {
                    if(term.isCurrent){
                        that.schoolyearid = year.schoolYearId;
                        that.semesterid = term.semesterId;
                        if(n)
                            return;
                        else refresh();
                        return;
                    }
                    if(i == $rootScope.treeTerm.length - 1 && j == year.semesterList.length - 1){
                        that.schoolyearid = $rootScope.treeTerm[0].schoolYearId;
                        that.semesterid = $rootScope.treeTerm[0].semesterList[0].semesterId;
                        if(n)
                            return;
                        else refresh();
                        return;
                    }   
                })
            })
        }
    }
    $scope.show = function (item,campus,liveArea) {
        $scope.media.flatid = item.flatId || '';
        $scope.media.liveareaid = item.liveAreaId || '';
        $scope.media.campusid = item.campusId || '';
        $scope.media.title = (item.title + (campus?('-' + campus):'') + (liveArea?('-' + liveArea):'')) || '';
        // console.log($scope.media);
        refresh();
    }
    function refresh() {
        if($scope.media.semesterid || $scope.media.schoolyearid){
            $rootScope.loading = true;
            GradeService.getStatistics($scope.media).success(function (data) {
                if(data.code == 0){
                    $scope.media.data = data.list;
                    chartInit();
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            })
        }
        else
            $rootScope.loading = false;
    }
    function chartInit() {
        if($scope.media.flatid){
            // $scope.option.legend.data=['楼栋'];
            $scope.option.series = [
                {
                    name:'楼栋',
                    type:'line',
                    smooth :false,
                    symbol :'triangle',
                    symbolSize :10,
                    data:$filter('ObjToArray')($scope.media.data,'score') || []
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
                    data:$filter('ObjToArray')($scope.media.data,'score') || []
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
                    data:$filter('ObjToArray')($scope.media.data,'score') || []
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
                    data:$filter('ObjToArray')($scope.media.data,'score') || []
                }
            ];
        }
        $scope.option.xAxis[0].data=$filter('ObjToArray')($scope.media.data,'currentWeek') || [];
        $scope.myChart.setOption($scope.option); 
        $rootScope.loading = false;
    }
    if(!$rootScope.treeFlat){
        FlatService.getList(AppConfig.schoolCode).success(function(data){
            // console.log(data);
            $rootScope.treeFlat = data.data;
            
            if(data.code == 0){
                getTerm();
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        });
    }else{
        getTerm();
    }
    function getTerm(){
        if(!$rootScope.treeTerm)
            TermService.getList().success(function(data){
                
                if(data.code == 0){
                    $rootScope.treeTerm = data.data;
                    $scope.media.getYear(1);
                    $scope.show($rootScope.treeFlat || {});
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            });
        else{
            $scope.media.getYear(1);
            $scope.show($rootScope.treeFlat || {});
        }
    } 
    $scope.download = function () {
        $rootScope.loading = true;
        GradeService.downloadStatistics($scope.media).success(function (data) {
            console.log(data);            
            $rootScope.loading = false;
            if(data.code == 0){
                location.href = data.data.fileUrl;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
    }
  }]);
