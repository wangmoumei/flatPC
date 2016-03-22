angular.module('flatpcApp')
.controller('CollegeCtrl', ['$scope','AppConfig','$rootScope','CollegeService','StudentService','$filter'
,function($scope,AppConfig,$rootScope,CollegeService,StudentService,$filter) {
     //基础的页码、排序等等选项
    $scope.media = {
        epage:1,
        pageCount:1,
        recordCount:1,
        pagesize:10,
        name:'',
        studentnumber:'',
        collegeid:'',
        classid:'',
        search:0,
        orderfield:'',
        ordertype:'',
        title:''
    }
    //换页
    $scope.setPage = function(n){
        if($scope.media.epage + n >0 && $scope.media.epage + n <= $scope.media.pageCount){
            $scope.media.epage += n;
            refresh();
        } 
    };
    //调整每页显示量
    $scope.setPageSize = function(n){
        $scope.media.pagesize = n;
        refresh();
    }
    //排序
    $scope.setOrder = function(name){
        if($scope.media.orderfield == name)
        {
            $scope.media.ordertype = $scope.media.ordertype=="asc"?"desc":"asc";
        }else{
            $scope.media.orderfield = name;
            $scope.media.ordertype = "asc";
        }
        refresh();
    }
    //调整查询规则，按学院或者班级查询
    $scope.show = function(type,item,college){
        $scope.media.title = (item.name || '') + (college || item.collegeName ||'') + (type > 1?'-':'') + (item.className || '');
        $scope.media.collegeid = item.collegeId || "";
        $scope.media.classid = item.classId || "";
        refresh();
    };
    //检索功能
    $scope.search = function(search){
        $scope.media.name = $scope.media.search?'':search;
        $scope.media.studentnumber = $scope.media.search?search:'';
        refresh();
    };
    if(!$rootScope.treeCollege){
        CollegeService.getList(AppConfig.schoolCode).success(function(data){
            if(data.code == 0){
                $rootScope.treeCollege = data.data;
                $scope.show(0,$rootScope.treeCollege[0]);
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                
            $rootScope.loading = false;
        });
    }
    else {
        $scope.show(0,$rootScope.treeCollege[0]);
        $rootScope.loading = false;
    }
    $scope.student = {};
    $scope.loadInfo = function(studentid){
        if(!studentid || studentid.length<1) 
            return null;
        $rootScope.loading = true;
        return StudentService.getStudent(studentid).success(function(data){
            if(data.code == 0){
                $scope.student = data.data;
                $rootScope.loading = false;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            console.log(data);
            
        })
    }
    function refresh() {
        $rootScope.loading = true;
        StudentService.getListWithBedByClass($scope.media).success(function (data) {
            if(data.code == 0){
                $scope.studentList = data.data.list;
                $scope.media.recordCount = data.data.recordCount;
                $scope.media.pageCount = data.data.pageCount;
                $scope.media.inRoomNum = data.data.inRoomNum;
                $scope.media.notRoomNum = data.data.notRoomNum;
                $scope.option.legend.data = $filter('ObjToArray')(data.data.distribution,'flatName') || [];
                $scope.option.series[0].data = [];
                data.data.distribution.forEach(function (item) {
                    $scope.option.series[0].data.push({
                        value:item.number,
                        name:item.flatName
                    })
                })
                console.log($scope.option);
                $scope.myChart.setOption($scope.option); 
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            //console.log(data.data);
            $rootScope.loading = false;
        })
    }
}]);