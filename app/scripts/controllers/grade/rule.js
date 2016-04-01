'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @违章设置
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('RuleCtrl', ['$scope','AppConfig','$rootScope', 'RuleService','FlatService','RoomService','$filter',
function($scope,AppConfig,$rootScope,RuleService,FlatService,RoomService,$filter) {
    //基础的页码、排序等等选项
    $scope.media = {
        epage:1,
        pageCount:1,
        recordCount:0,
        pagesize:10,
        campusid:'',
        liveareaid:'',
        flatid:'',
        search:'',
        orderfield:'',
        ordertype:'',
        starttime:new Date(new Date() - 1000*60*60*24*30).Format('yyyy-MM-dd'),
        endtime:new Date().Format('yyyy-MM-dd'),
        source:'5'
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
        $scope.media.search = search;
        refresh();
    };
    //初始化树+列表
    if(!$rootScope.treeFlat){
        FlatService.getList(AppConfig.schoolCode).success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                $rootScope.treeFlat = data.data;
                getRule();
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        });
    }
    else {
        getRule();
    }
    //渲染list
    function refresh(){
        $rootScope.loading = true;
        // console.log($scope.media);
        RuleService.getListByFlat($scope.media).success(function(data){
            
            // console.log(data.data);
            if(data.code == 0){
                $scope.list = data.data.list;
                $scope.media.recordCount = data.data.recordCount;
                $scope.media.pageCount = data.data.pageCount;
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
        })
    }
    
    //查看详情
    $scope.work = {};
    $scope.detail = function(work){
        $scope.work = work;
        return null;
    };
    $scope.editSave = function () {
        $rootScope.loading = true;
        RuleService.editCheck({
            token:AppConfig.token,
            schoolcode:AppConfig.schoolCode,
            lllegalid:$scope.work.lllegalId,
            memo:$scope.work.memo,
            itemid:$scope.work.itemid,
            checktime:$scope.work.checkTime
        }).success(function (data) {
            $rootScope.loading = false;
            console.log(data);
            if(data.code == 0){
                swal("提示", "修改成功！", "success"); 
                refresh();
            }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
        })
    }
    $scope.delete = function(fun){       
        swal({   
            title: "确认删除",   
            text: "真的要删除吗？",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "删除",   
            cancelButtonText: "取消",   
            closeOnConfirm: false 
        }, 
        function(){   
            $rootScope.loading = true;
            return RuleService.delCheck({
                token:AppConfig.token,
                lllegalId:$scope.work.lllegalId
            }).success(function(data){
                $rootScope.loading = false;
                if(data.code == 0){
                    swal("提示", "删除成功！", "success"); 
                    if(fun && typeof fun == 'function') fun();
                    refresh();
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            });
        });
    }

    //新增登记表单中的二级连选的select
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
    $scope.dataInit = function () {
        $scope.selecter.init();
        $scope.form.student = null;
        $scope.form.room = undefined;
        $scope.form.roomName = '';
        $scope.form.memo = '';
        $scope.form.itemid = '';
        $scope.form.checktime = new Date().Format('yyyy-MM-dd');
    }
    $scope.form = {
        student:null,
        room:undefined,
        roomName:'',
        memo:'',
        itemid:'',
        checktime:new Date().Format('yyyy-MM-dd'),
        studentSearch:function () {
            var that = this;
            if($scope.selecter.flatId.length < 1)return;
            $rootScope.loading = true;
            RoomService.getBedByRoomName({
                roomname:this.roomName,
                flatid:$scope.selecter.flatId
            }).success(function (data) {
                //console.log(data);
                $rootScope.loading = false;
                if(data.code == 0){
                    that.room = data.data;
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                
            })
        },
        bedChoose:function (bed) {
            if(bed){
                this.student = bed;
            }else this.student = null;
        },
        sub:function (fun) {
            if(this.itemid.length < 1)return;
            $rootScope.loading = true;
            var param = {
                token:AppConfig.token,
                schoolcode:AppConfig.schoolCode,
                itemid:this.itemid,
                checktime:this.checktime,
                roomid:this.room.roomId,
                source:4,
                memo:this.memo
            };
            if(this.student)param.bedid = this.student.bedId;
            RuleService.addCheck(param).success(function (data) {
                $rootScope.loading = false;
                // console.log(data);
                if(data.code == 0){
                    swal("提示", "提交成功！", "success"); 
                    refresh();
                    if(fun && typeof fun == 'function') fun();
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            })
        }
    }
    function getRule(fun) {
        if(!$rootScope.treeRule)
            return RuleService.getList().success(function(data){
                if(data.code == 0){
                    $rootScope.treeRule = data.data;
                    refresh();
                }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                }
            });
        else{
            refresh();
        }
    }
    
    $scope.download = function () {
        $rootScope.loading = true;
        RuleService.download($scope.media).success(function (data) {
            console.log(data);            
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
}]);
