angular.module('flatpcApp')
.controller('CollegeCtrl', ['$scope','AppConfig','$rootScope','CollegeService','StudentService'
,function($scope,AppConfig,$rootScope,CollegeService,StudentService) {
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
    $scope.show = function(type,item,school,college){
        $scope.media.title = (school || item.name) 
        + (type > 0?'-':'') + (college || item.collegeName ||'') 
        + (type > 1?'-':'') + (item.className || '');
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
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                
            $rootScope.loading = false;
        });
    }
    else {
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
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            //console.log(data.data);
            $rootScope.loading = false;
        })
    }
}]);