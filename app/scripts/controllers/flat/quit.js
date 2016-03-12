angular.module('flatpcApp')
.controller('QuitCtrl', ['$scope','AppConfig','$rootScope', 'FlatService','DailyService','$filter','CollegeService','RoomService',"StudentService",
function($scope,AppConfig,$rootScope,FlatService,DailyService,$filter,CollegeService,RoomService,StudentService) {
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
    $scope.show = function(type,item,campusId,liveAreaId){
        $scope.media.campusid = item.campusId || "";
        $scope.media.liveareaid = item.liveAreaId || "";
        $scope.media.flatid = item.flatId || "";
        
        switch(type){
            case 0:
                $scope.selecter.campusId = "";
                $scope.selecter.liveAreaId = "";
                $scope.selecter.flatId = "";
                break;
            case 1:
                $scope.selecter.campusId = item.campusId;
                $scope.selecter.liveAreaId = "";
                $scope.selecter.flatId = "";
                break;
            case 2:
                $scope.selecter.campusId = campusId;
                $scope.selecter.liveAreaId = item.liveAreaId;
                $scope.selecter.flatId = "";
                break;
            case 3:
                $scope.selecter.campusId = campusId;
                $scope.selecter.liveAreaId = liveAreaId;
                $scope.selecter.flatId = item.flatId;
                break;
        }
        
        refresh();
    };
    //调整查询规则，计划中、已审批、已取消、已驳回
    $scope.setStatus = function(status){
        $scope.media.status = status;
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
        DailyService.getQuitList($scope.media).success(function(data){
            if(data.code == 0){
                $scope.list = data.data.list;
                $scope.media.recordCount = data.data.recordCount;
                $scope.media.pageCount = data.data.pageCount;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error");
            
            //console.log(data.data);
            $rootScope.loading = false;
        })
    }
    
    //查看详情
    $scope.work = {};
    $scope.detail = function(work){
        $scope.work = work;
        $scope.work.returnMessage  = "";
        $scope.returnSwitch = false;
        return null;
    }
    //驳回理由 Dom操控
    $scope.returnSwitch = false;
    $scope.returnSwitchChange = function(){
        $scope.returnSwitch = !$scope.returnSwitch;
    }
    //审批
    $scope.passWork = function(fun){
        swal({   
            title: "确认",   
            text: "确定要通过这条申请吗？",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#2772ee",   
            confirmButtonText: "确定",   
            cancelButtonText: "取消",   
            closeOnConfirm: false 
        }, 
        function(){   
            rootScope.loading = true;
            DailyService.passQuit({
                token:AppConfig.token,
                exitroomid:$scope.work.exitRoomId || '',
                adminid:AppConfig.adminId
            }).success(function(data){
                if(data.code == 0){
                    swal("提示", "审批成功！", "success"); 
                    refresh();
                    if(fun && typeof fun == 'function')fun();
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error");
                
                $rootScope.loading = false;
            });
        });
        
    }
    //驳回
    $scope.returnWork = function(fun){
        $rootScope.loading = true;
        DailyService.backQuit({
            token:AppConfig.token,
            exitroomid:$scope.work.exitRoomId || '',
            backmessage:$scope.work.returnMessage,
            adminid:AppConfig.adminId
        }).success(function(data){
            if(data.code == 0){
                swal("提示", "驳回成功！", "success"); 
                refresh();
                if(fun && typeof fun == 'function')fun();
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error");
            
            $rootScope.loading = false;
        });
    }
    //取消
    $scope.cancelWork = function(fun){
        swal({   
            title: "确认关闭",   
            text: "确定要取消掉这条申请吗？",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "确定",   
            cancelButtonText: "取消",   
            closeOnConfirm: false 
        }, 
        function(){   
            $rootScope.loading = true;
            DailyService.cancelQuit({
                token:AppConfig.token,
                exitroomid:$scope.work.exitRoomId || '',
                adminid:AppConfig.adminId
            }).success(function(data){
                if(data.code == 0){
                    swal("提示", "已取消！", "success"); 
                    refresh();
                    if(fun && typeof fun == 'function')fun();
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error");
                
                $rootScope.loading = false;
            });
        });
        
    }
    
    //二级连选的select
    $scope.selecter = {
        collegeId:"",
        classList:[],
        classId:'',
        collegeSelecter : function(){
            //用collegeId获取classList
            if(this.collegeId){
                this.classId = '';
                var college = this.collegeId?$filter('filter')($rootScope.treeCollege[0].collegeList,{collegeId:this.collegeId}):[];
                this.classList = (college.length>0 && college[0].classList)?college[0].classList : [];
                
                //console.log(this.classList);
            }
        },
        
        init : function(){
            //将select置空
            this.collegeId = "";
            this.classId = "";
            this.classList = [];
        }
    }
    $scope.dataInit = function(){
        if(!$rootScope.treeCollege){
            CollegeService.getList(AppConfig.schoolCode).success(function(data){
                
                if(data.code == 0){
                    $rootScope.treeCollege = data.data;
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error");
            });
        }
        $scope.selecter.init();
        $scope.form.student = null;
        $scope.form.studentName = '';
        $scope.form.studentList = null;
    }
    $scope.form = {
        student:null,
        studentName:'',
        studentList:null,
        studentSearch:function () {
            var that = this;
            $rootScope.loading = true;
            StudentService.getListWithBed({
                keyword:this.studentName,
                collegeid:$scope.selecter.collegeId,
                classid:$scope.selecter.classId
            }).success(function (data) {
                //console.log(data);
                $rootScope.loading = false;
                if(data.code == 0){
                    that.studentList = data.list;
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error");
                
            })
        },
        studentChoose:function (student) {
            this.student = student;
        },
        sub:function (fun) {
            $rootScope.loading = true;
            DailyService.addQuit({
                token:AppConfig.token,
                schoolcode:AppConfig.schoolCode,
                bedid:this.student.bedId,
                studentkey:this.student.studentKey,
                adminid:AppConfig.adminId,
                memo:this.memo
            }).success(function (data) {
                $rootScope.loading = false;
                if(data.code == 0){
                    swal("提示", "提交成功！", "success"); 
                    refresh();
                    if(fun && typeof fun == 'function')fun();
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error");
                console.log(data);
            })
        }
    }
}]);