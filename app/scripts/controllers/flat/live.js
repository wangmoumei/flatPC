angular.module('flatpcApp')
.controller('LiveCtrl', ['$scope','AppConfig','$rootScope', 'FlatService','DailyService','$filter','CollegeService',
function($scope,AppConfig,$rootScope,FlatService,DailyService,$filter,CollegeService) {
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
        ordertype:'',
        status:-1
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
    //调整查询规则，计划中、已审批、已取消、已驳回
    $scope.setStatus = function(status){
        $scope.media.status = status || -1;
        refresh();
    }
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
        DailyService.getLiveList($scope.media).success(function(data){
            $scope.liveList = data.data.list;
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
        $scope.work.returnMessage  = "";
        return null;
    }
    //驳回理由 Dom操控
    $scope.returnSwitch = false;
    $scope.returnSwitchChange = function(){
        $scope.returnSwitch = !$scope.returnSwitch;
    }
    //审批
    $scope.passWork = function(){
        $rootScope.loading = true;
        DailyService.passLive({
            token:'',
            occupancyid:$scope.work.occupancyId || '',
            adminid:''
        }).success(function(data){
            swal("提示", "审批成功！", "success"); 
            refresh();
            $rootScope.loading = false;
        });
    }
    //驳回
    $scope.returnWork = function(){
        $rootScope.loading = true;
        DailyService.backLive({
            token:'',
            occupancyid:$scope.work.occupancyId || '',
            backmessage:$scope.work.returnMessage,
            adminid:''
        }).success(function(data){
            swal("提示", "驳回成功！", "success"); 
            refresh();
            $rootScope.loading = false;
        });
    }
    //取消
    $scope.cancelWork = function(){
        $rootScope.loading = true;
        DailyService.cancelLive({
            token:'',
            occupancyid:$scope.work.occupancyId || '',
            adminid:''
        }).success(function(data){
            swal("提示", "已取消！", "success"); 
            refresh();
            $rootScope.loading = false;
        });
    }
    
    //二级连选的select
    $scope.selecter = {
        collegeId:"",
        classList:[],
        classId:'',
        collegeSelecter : function(){
            //用collegeId获取classList
            this.classId = '';
            var college = this.collegeId?$filter('filter')($rootScope.treeCollege[0].collegeList,{collegeId:this.collegeId}):[];
            this.classList = (college.length>0 && college[0].classList)?college[0].classList : [];
            console.log(this.classList);
        },
        classSelecter : function(){
            //用classId反向获取collegeId和classList
            var college = $rootScope.treeCollege[0].collegeList;
            for(var i=0;i<college.length;i++){
                var list = this.classId?$filter('filter')(college[i].classList,{classId:this.classId}):[];
                if(list.length > 0){
                    this.collegeId = college[i].collegeId;
                    this.classList = college[i].classList;
                    break;
                }
            }
        },
        campusId:'',
        liveAreaId:'',
        liveAreaList:[],
        flatId:'',
        flatList:[],
        campusSelecter : function(){
            //用liveAreaId获取liveAreaList
            this.liveAreaId = '';
            this.flatId = '';
            this.flatList = [];
            var campus = this.campusId?$filter('filter')($rootScope.treeFlat.cmpusList,{campusId:this.campusId}):[];
            this.liveAreaList = (campus.length>0 && campus[0].liveAreaList)?campus[0].liveAreaList : [];
        },
        liveAreaSelecter : function(){
            //用liveAreaId获取flatList
            this.flatId = '';
            var liveArea = this.liveAreaId?$filter('filter')(this.liveAreaList,{liveAreaId:this.liveAreaId}):[];
            this.flatList = (liveArea.length>0 && liveArea[0].flatList)?liveArea[0].flatList : [];
            //console.log(this.flatList);
        },
        
        init : function(){
            //将select置空
            this.collegeId = "";
            this.classId = "";
            this.classList = [];
            this.campusId = $scope.media.campusid || '';
            this.liveAreaId = $scope.media.liveareaid || "";
            this.liveAreaList = [];
            this.flatId = $scope.media.flatid || '';
            this.flatList=[];
        }
    }
    $scope.dataInit = function(){
        $scope.selecter.init();
    }
    $scope.chooseStudent = function(){
        if(!$rootScope.treeCollege)
            CollegeService.getList(AppConfig.schoolCode).success(function(data){
                $rootScope.treeCollege = data.data;
                $scope.media.title = data.data[0].name;
                refresh();
            });
    }
}]);