'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('SpotCtrl', ['$scope','$rootScope','GradeService','$filter','TermService','FlatService','RoleService','AppConfig',
  function ($scope,$rootScope,GradeService,$filter,TermService,FlatService,RoleService,AppConfig) {
    $scope.form = {
        status:0,
        starttime:new Date().Format('yyyy-MM-dd'),
        endtime:new Date().Format('yyyy-MM-dd'),
        title:'',
        nature:'',
        checkid:'',
        flatis:[],
        tableid:'',
        removeFlat:function(index){
            this.flats.splice(index,1);
            if(this.flats.length < 1){
                this.addFlat();
            }
        },
        addFlat:function () {
            // for (var index = 0; index < flatis.length; index++) {
            //     flatis[index];
            //  } 
            var flat = {
                campusId:$scope.media.campusid || '',
                campusList:$rootScope.treeFlat,
                liveAreaId:$scope.media.liveareaid || '',
                liveAreaList:[],
                flatId:$scope.media.flatid || '',
                flatList:[],
            }
            $scope.selecter.flatSelecter(flat);
            this.flats.push(flat);
        },
        getFlat:function(){
            var ids = [],check = function(id){
                for(var i=0;i < ids.length;i++){
                    if(id.length < 1 || ids[i] == id)return false;
                }
                return true;
            };
            this.flats.forEach(function (flat) {
                if(check(flat.flatId))
                    ids.push(flat.flatId);
            })
            ids = ids.length>0?ids.toString():"";
            return ids;
        },
        getRole:function(){
            var ids = [];
            $scope.roles.forEach(function (role) {
                if(role.checked)
                    ids.push(role.roleId);
            })
            ids = ids.length>0?ids.toString():"";
            return ids;
        },
        timeCheck:function (n) {
            if(new Date(this.starttime) > new Date(this.endtime)){
                try{
                    if(n){
                        this.starttime = this.endtime;
                    }else{
                        this.endtime = this.starttime;
                    }
                    $scope.$digest();
                }
                catch(e){
                    this.starttime = new Date().Format('yyyy-MM-dd');
                    this.endtime = new Date().Format('yyyy-MM-dd');
                }
            }
        }
    }
    $scope.dataInit = function (item) {
        $scope.form.status= item.checkId ? 1 : 0;
        $scope.form.title= item.title || '';
        $scope.form.itemaccount=item.itemAccount || '';
        $scope.form.nature=item.nature || '普通';
        $scope.form.starttime=item.startTime || new Date().Format('yyyy-MM-dd');
        $scope.form.endtime= item.endTime || new Date().Format('yyyy-MM-dd');
        $scope.form.checkid=item.checkId || '';
        $scope.form.roleids="," + (item.roleIds || '') + ',';
        $scope.roles.forEach(function (role) {
            $scope.roles.forEach(function (role) {
                role.checked = new RegExp(',' + role.roleId + ',').test($scope.form.roleids);
            })
        });
        $scope.form.flats = item.flatIds || [];
        if(item.flatIds && item.flatIds.length>0){
            $scope.form.flats.forEach(function (flat) {
                $scope.selecter.flatSelecter(flat);
            })
        }else{
            $scope.form.addFlat();
        }
        $scope.form.semesterid= item.semesterId || $scope.media.semesterid || '';
        $scope.form.tableid = "" +  (item.tableId || '');
        $scope.selecter.termSelecter();
    }
    //二级连选的select
    $scope.selecter = {
        campusSelecter : function(flat){
            //用campusId获取liveAreaList
            if(flat.campusId){
                flat.liveAreaId = '';
                flat.flatId = '';
                flat.flatList = [];
                var campus = flat.campusId?$filter('filter')($rootScope.treeFlat.cmpusList,{campusId:flat.campusId}):[];
                flat.liveAreaList = (campus.length>0 && campus[0].liveAreaList) ? campus[0].liveAreaList : [];
            }
        },
        liveAreaSelecter : function(flat){
            //用liveAreaId获取flatList
            if(flat.liveAreaId){
                flat.flatId = '';
                var liveArea = flat.liveAreaId?$filter('filter')(flat.liveAreaList,{liveAreaId:flat.liveAreaId}):[];
                flat.flatList = (liveArea.length>0 && liveArea[0].flatList)?liveArea[0].flatList : [];
            }
        },
        flatSelecter : function(flat){
            //用 flatId或liveAreaId 反向获取 campusId、liveAreaId、liveAreaList和flatList

            for(var i=0;i < $rootScope.treeFlat.cmpusList.length;i++){
                if($rootScope.treeFlat.cmpusList[i].liveAreaList && (flat.flatId || flat.liveAreaId))
                    for(var j=0;j < $rootScope.treeFlat.cmpusList[i].liveAreaList.length;j++){
                        if($rootScope.treeFlat.cmpusList[i].liveAreaList[j].flatList && flat.flatId)
                            for(var k=0;k <$rootScope.treeFlat.cmpusList[i].liveAreaList[j].flatList.length;k++){
                                if($rootScope.treeFlat.cmpusList[i].liveAreaList[j].flatList[k].flatId == flat.flatId){
                                    flat.campusId = $rootScope.treeFlat.cmpusList[i].campusId;
                                    flat.liveAreaList = $rootScope.treeFlat.cmpusList[i].liveAreaList;
                                    flat.liveAreaId = $rootScope.treeFlat.cmpusList[i].liveAreaList[j].liveAreaId;
                                    flat.flatList= $rootScope.treeFlat.cmpusList[i].liveAreaList[j].flatList;
                                    return;
                                }
                            }
                        else if(flat.liveAreaId && flat.liveAreaId == $rootScope.treeFlat.cmpusList[i].liveAreaList[j].liveAreaId){
                            flat.campusId = $rootScope.treeFlat.cmpusList[i].campusId;
                            flat.liveAreaList = $rootScope.treeFlat.cmpusList[i].liveAreaList;
                            flat.liveAreaId = $rootScope.treeFlat.cmpusList[i].liveAreaList[j].liveAreaId;
                            flat.flatList= $rootScope.treeFlat.cmpusList[i].liveAreaList[j].flatList;
                            return;
                        }
                    }
                else if(flat.campusId && flat.campusId == $rootScope.treeFlat.cmpusList[i].campusId){
                    flat.campusId = $rootScope.treeFlat.cmpusList[i].campusId;
                    flat.liveAreaList = $rootScope.treeFlat.cmpusList[i].liveAreaList;
                    flat.liveAreaId = '';
                    flat.flatList= [];
                    return;
                }else return;
            }
        },
        termList:[],
        schoolYearId:'',
        termSelecter:function(){
            this.schoolYearId = this.schoolYearId || $scope.media.schoolyearid || "";
            if($scope.form.semesterid){
                for(var i=0;i < $rootScope.treeTerm.length;i++){
                    if($rootScope.treeTerm[i].semesterList){
                        for(var j=0;j < $rootScope.treeTerm[i].semesterList.length;j++){
                            if($rootScope.treeTerm[i].semesterList[j].semesterId == $scope.form.semesterid){
                                this.termList = $rootScope.treeTerm[i].semesterList;
                                this.schoolYearId = $rootScope.treeTerm[i].schoolYearId;
                                return;
                            }
                        }
                    }
                }
            }else if(this.schoolYearId){
                var yearList = $filter('filter')($rootScope.treeTerm,{schoolYearId:this.schoolYearId});
                this.termList = (yearList.length>0 && yearList[0].semesterList)?yearList[0].semesterList : [];
            }else{
                for(var i = 0;i < $rootScope.treeTerm.length;i ++){
                    for(var j = 0; j < $rootScope.treeTerm[i].semesterList.length ; j ++ ){
                        if(($rootScope.treeTerm[i].semesterList[j].isCurrent) || (i == $rootScope.treeTerm.length-1 && j == $rootScope.treeTerm[i].semesterList.length-1)){
                            this.termList = $rootScope.treeTerm[i].semesterList;
                            this.schoolYearId = $rootScope.treeTerm[i].schoolYearId;
                            $scope.form.semesterid = $rootScope.treeTerm[i].semesterList[j].semesterId;
                        }
                    }
                }
            }
        }
    }
    

	$scope.ableShow = false;
	$scope.checkQbMenu =function(){
	    $scope.ableShow = false;
	}
    $scope.checSjbMenu =function(){
	    $scope.ableShow = false;
	}
    $scope.checkZdMenu =function(){
	    $scope.ableShow = true;
	}

    
    $scope.addSave = function (fun) {
        var flatids = $scope.form.getFlat(),roleids = $scope.form.getRole();
        if(flatids.length < 0 || roleids.length < 0|| $scope.form.starttime.length < 0|| $scope.form.endtime.length < 0|| $scope.form.title.length < 0|| $scope.form.tableid.length < 0|| $scope.form.semesterid.length < 0)return;
        $rootScope.loading = true;
        GradeService.addSpot({
            starttime:$scope.form.starttime,
            endtime:$scope.form.endtime,
            title:$scope.form.title,
            nature:$scope.form.nature,
            keyword:$scope.form.keyword || "test",
            tableid:$scope.form.tableid,
            semesterid:$scope.form.semesterid,
            flatids:flatids,
            roleids:roleids
        }).success(function (data) {
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "添加成功！", "success"); 
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
    $scope.editSave = function (fun) {
        var flatids = $scope.form.getFlat(),roleids = $scope.form.getRole();
        if(flatids.length < 0 || roleids.length < 0|| $scope.form.starttime.length < 0|| $scope.form.endtime.length < 0|| $scope.form.title.length < 0|| $scope.form.tableid.length < 0|| $scope.form.semesterid.length < 0)return;
        $rootScope.loading = true;
        GradeService.editSpot({
            checkid:$scope.form.checkid,
            starttime:$scope.form.starttime,
            endtime:$scope.form.endtime,
            title:$scope.form.title,
            nature:$scope.form.nature,
            keyword:$scope.form.keyword || "test",
            tableid:$scope.form.tableid,
            semesterid:$scope.form.semesterid,
            flatids:flatids,
            roleids:roleids
        }).success(function (data) {
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "保存成功！", "success"); 
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
    // $scope.delete = function (fun) {
    //     swal({   
    //         title: "确认删除",   
    //         text: "真的要删除吗？",   
    //         type: "warning",   
    //         showCancelButton: true,   
    //         confirmButtonColor: "#DD6B55",   
    //         confirmButtonText: "删除",   
    //         cancelButtonText: "取消",   
    //         closeOnConfirm: false 
    //     }, 
    //     function(){   
    //         $rootScope.loading = true;
    //         return GradeService.delSpot({
    //             adminid:$scope.form.adminid
    //         }).success(function (data) {
    //             $rootScope.loading = false;
    //             if(data.code == 0){
    //                 swal("提示", "删除成功！", "success"); 
    //                 refresh();
    //                 if(fun && typeof fun == 'function') fun();
    //             }else if(data.code == 4037){
    //                         swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
    //                         location.href="#login";$rootScope.loading = false;
    //                     }
    //             else
    //                 swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
    //         })
    //     });
    // }
    $scope.setSpot = function (item) {
        $rootScope.spot = item;
        location.href = "#gradeForSpot";
    }
    //基础的页码、排序等等选项
    $scope.media = {
        epage:1,
        pageCount:1,
        recordCount:1,
        pagesize:10,
        semesterid:'',
        schoolyearid:'',
        orderfield:'',
        ordertype:'',
        dateCheck:function(item){
            var now = new Date();
            if(new Date(item.startTime) < now && new Date(item.endTime) > now){
                return true;
            }else{
                return false;
            }
        }
    }
    //换页
    $scope.setPage = function(n){
        if($scope.media.epage + n >0 && $scope.media.epage + n <= $scope.media.pageCount){
            $scope.media.epage += n;
            refresh(1);
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
    $scope.show = function(type,item){
        $scope.media.semesterid = item.semesterId || 0;
        $scope.media.schoolyearid = item.schoolYearId || 0;
        refresh();
    };
    GradeService.getSettingList({type:3}).success(function(data){
        if(data.code == 0){
            $scope.tables = data.data;
            if($rootScope.treeTerm)
                getFlat();
            else {
                TermService.getList().success(function(data){
                    if(data.code == 0){
                        $rootScope.treeTerm = data.data;
                        getFlat();
                    }else if(data.code == 4037){
                            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                            location.href="#login";$rootScope.loading = false;
                        }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                });
            }
        }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
            swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        }
    });
    
    function getFlat(){
        if(!$rootScope.treeFlat){
            FlatService.getList().success(function(data){
                if(data.code == 0){
                    $rootScope.treeFlat = data.data;
                    getRole();
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            });
        }
        else {
            getRole();
        }
    }
    function getRole() {
        RoleService.getList({
            token:AppConfig.token,
            type:1,
            schoolcode:AppConfig.schoolCode
        }).success(function (data) {
            if(data.code == 0){
                $scope.roles = data.data.list;
                refresh();
            }else if(data.code == 4037){
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                location.href="#login";
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
    }
    function refresh(n) {
        if(!n)$scope.media.epage=1;
        $rootScope.loading = true;
        GradeService.getSpotList($scope.media).success(function (data) {
            if(data.code == 0){
                $scope.list = data.list.dataList;
                $scope.media.recordCount = data.list?data.list.recordCount:0;
                $scope.media.pageCount = data.list?data.list.pageCount:0;
            }else if(data.code == 4037){
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                location.href="#login";$rootScope.loading = false;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            $rootScope.loading = false;
        })
    }
  }]);
