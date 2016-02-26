angular.module('flatpcApp')
.controller('GradeCtrl', ['$scope','AppConfig','$rootScope', 'FlatService','TermService','$filter','GradeService',
function($scope,AppConfig,$rootScope,FlatService,TermService,$filter,GradeService) {
    
    $scope.media = {
        flatid:'',
        yearIndex:0,
        termIndex:0,
        week:0,
        weekList:[],
        setWeek:function (week) {
            this.week = week;
        },
        setYear:function (n) {
            n = n || 1;
            if(n < 0){
                if(this.termIndex > 0){
                    this.termIndex--;
                }else{
                    if(this.yearIndex < $rootScope.treeTerm.length - 1){
                        this.yearIndex++;
                        this.termIndex = $rootScope.treeTerm[this.yearIndex].semesterList.length-1;
                    }
                }
            }else{
                if(this.yearIndex < $rootScope.treeTerm.length - 1){
                    this.termIndex++;
                }else{
                    if(this.yearIndex > 0){
                        this.yearIndex --;
                        this.termIndex = 0;
                    }
                }
            }
        },
        getYear:function (n) {
            n = n || 0;
            if(!$rootScope.treeTerm) return {};
            if( n < 0){
                if(this.termIndex > 0){
                    return {
                        year:$rootScope.treeTerm[this.yearIndex].year,
                        term:$rootScope.treeTerm[this.yearIndex].semesterList[this.termIndex-1].semesterName
                    }
                }else{
                    if(this.yearIndex < $rootScope.treeTerm.length - 1){
                        return {
                            year:$rootScope.treeTerm[this.yearIndex+1].year,
                            term:$rootScope.treeTerm[this.yearIndex+1].semesterList[$rootScope.treeTerm[this.yearIndex+1].semesterList.length-1].semesterName
                        }
                    }else{
                        return {
                            year:null,
                            term:null
                        }
                    }
                }
            }else{
                if(this.termIndex < $rootScope.treeTerm[this.yearIndex].semesterList.length - 1){
                    return {
                        year:$rootScope.treeTerm[this.yearIndex].year,
                        term:$rootScope.treeTerm[this.yearIndex].semesterList[this.termIndex+1].semesterName
                    }
                }else{
                    if(this.yearIndex > 0){
                        return {
                            year:$rootScope.treeTerm[this.yearIndex-1].year,
                            term:$rootScope.treeTerm[this.yearIndex-1].semesterList[0].semesterName
                        }
                    }else{
                        return {
                            year:null,
                            term:null
                        }
                    }
                }
            }
        },
        title:'',
        show:function (flat,liveArea,campus) {
            this.title = campus.title + ' - ' +  liveArea.title + ' - ' +  flat.title;
            this.flatid = flat.flatId;
        }
    }
    
    if(!$rootScope.treeTerm)
        TermService.getList().success(function(data){
            console.log(data);
            $rootScope.treeTerm = data.data;
            getFlat();
        }); 
    else {
        getFlat();
    }
    
    function getFlat() {
       if(!$rootScope.treeFlat){
            FlatService.getList(AppConfig.schoolCode).success(function(data){
                console.log(data);
                $rootScope.treeFlat = data.data;
                init();
            });
        }
        else
        {
            init();
        }
    };
    function init() {
        for(var i = 0;i < $rootScope.treeTerm.length;i ++){
            for(var j = 0; j < $rootScope.treeTerm[i].semesterList.length ; j ++ ){
                if($rootScope.treeTerm[i].semesterList[j].isCurrent){
                    $scope.media.yearIndex = i;
                    $scope.media.termIndex = j;
                    $scope.media.week = $rootScope.treeTerm[i].semesterList[j].currentWeek;
                    $scope.media.weekList  = $filter('sliceWeek')($rootScope.treeTerm[i].semesterList[j]);
                    //console.log($scope.media.weekList);
                    break;
                }
            }
        }
        if($rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0].flatId){
            $scope.media.title = $rootScope.treeFlat.cmpusList[0].title + ' - ' +  $rootScope.treeFlat.cmpusList[0].liveAreaList[0].title + ' - ' +  $rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0].title;
            $scope.media.flatid = $rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0].flatId;
            refresh();
        }
    };
    function refresh() {
        $rootScope.loading = true;
        GradeService.getListByFlat({
            flatid:$scope.media.flatid,
            semesterid:$rootScope.treeTerm[$scope.media.yearIndex].semesterList[$scope.media.termIndex].semesterId,
            currentweek:$scope.media.week
        }).success(function (data) {
            $rootScope.loading = false;
            data.list.floorList = data.list.floorList || [];
            data.list.floorList.forEach(function(list){
                list.roomList = list.roomList || [];
                list.roomList =  $filter('sliceArray')(list.roomList);
            });
            $scope.flat = data.list;
            console.log(data);
        })
    };
    $scope.detail = function(){
        $('.info-card').addClass('show');
    }
    $scope.initCard = function(e){
        //$rootScope.loading = true;
        console.log('do something');
    }
    
    /*$scope.myChart.setOption({
        series : [
            {
                data:[48, 49, 57, 41, 30, 50, 39]
            },
            {
                data:[67, 38, 48, 57, 49, 68, 55]
            },
            {
                data:[69, 47, 55, 38, 62, 55, 37]
            }
        ]
    }); */
}]);