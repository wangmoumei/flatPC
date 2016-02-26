angular.module('flatpcApp')
.controller('VisitCtrl', ['$scope','AppConfig','$rootScope', 'FlatService','CheckInService','$filter','StudentService',
function($scope,AppConfig,$rootScope,FlatService,CheckInService,$filter,StudentService) {
    //基础的页码、排序等等选项
    $scope.media = {
        epage:1,
        pageCount:1,
        recordCount:1,
        pagesize:10,
        name:'',
        studentnumber:'',
        campusid:'',
        liveareaid:'',
        flatid:'',
        search:0,
        orderfield:'',
        ordertype:''
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
    //调整查询规则，按学区、生活区或者楼栋查询
    $scope.show = function(type,item){
        $scope.media.campusid = item.campusId || "";
        $scope.media.liveareaid = item.liveAreaId || "";
        $scope.media.flatid = item.flatId || "";

        refresh();
    };
    //检索功能
    $scope.search = function(search){
        $scope.media.name = $scope.media.search?'':search;
        $scope.media.studentnumber = $scope.media.search?search:'';
        refresh();
    };
    //初始化树+列表
    if(!$rootScope.treeFlat){
        FlatService.getList(AppConfig.schoolCode).success(function(data){
            $rootScope.treeFlat = data.data;
            $rootScope.loading = false;
            refresh();
        });
    }
    else {
        refresh();
    }
    //渲染list
    function refresh(){
        $rootScope.loading = true;
        console.log($scope.media);
        CheckInService.getVisitList($scope.media).success(function(data){
            $scope.list = data.data.list;
            $scope.media.recordCount = data.data.recordCount;
            $scope.media.pageCount = data.data.pageCount;
            console.log(data.data);
            $rootScope.loading = false;
        })
    }
    
    //查看详情
    $scope.work = {};
    $scope.detail = function(work){
        $scope.work = work;
        return null;
    }
    
    $scope.dataInit = function () {
        $scope.selecter.init();
    }
    
    //二级连选的select
    $scope.selecter = {
        campusId:'',
        liveAreaId:'',
        liveAreaList:[],
        flatId:'',
        flatList:[],
        campusSelecter : function(){
            //用campusId获取liveAreaList
            if(this.campusId){
                //this.liveAreaId = '';
                //this.flatId = '';
                this.flatList = [];
                var campus = this.campusId?$filter('filter')($rootScope.treeFlat.cmpusList,{campusId:this.campusId}):[];
                this.liveAreaList = (campus.length>0 && campus[0].liveAreaList) ? campus[0].liveAreaList : [];
            }
        },
        liveAreaSelecter : function(){
            //用liveAreaId获取flatList
            if(this.liveAreaId){
                //this.flatId = '';
                var liveArea = this.liveAreaId?$filter('filter')(this.liveAreaList,{liveAreaId:this.liveAreaId}):[];
                this.flatList = (liveArea.length>0 && liveArea[0].flatList)?liveArea[0].flatList : [];
            }
        },
        
        init : function(){

            
            this.liveAreaList = [];
            this.flatList=[];
            this.campusSelecter();
            this.liveAreaSelecter();
            
            
        }
    }
    
    $scope.form = {
        student:null,
        studentName:'',
        studentList:null,
        studentSearch:function () {
            var that = this;
            $rootScope.loading = true;
            StudentService.getListByName({
                keyword:this.studentName,
                collegeid:$scope.selecter.collegeId,
                classid:$scope.selecter.classId
            }).success(function (data) {
                //console.log(data);
                $rootScope.loading = false;
                that.studentList = data.list;
            })
        },
        studentChoose:function (student) {
            this.student = student;
        },
        sub:function () {
            $rootScope.loading = true;
            CheckInService.addLive({
                token:AppConfig.token,
                schoolcode:AppConfig.schoolCode,
                bedid:this.bed.bedId,
                studentkey:this.student.studentKey,
                adminid:'',
                memo:this.memo
            }).success(function (data) {
                $rootScope.loading = false;
                console.log(data);
                swal("提示", "提交成功！", "success"); 
                refresh();
            })
        }
    }
}]);