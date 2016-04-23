'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('FlatManagerCtrl', ['$scope','$rootScope','FlatService','$filter','RoleService','AppConfig',
  function ($scope,$rootScope,FlatService,$filter,RoleService,AppConfig) {
    $scope.form = {
        status:0,
        username:'',
        password:'',
        password1:'',
        useraccount:'',
        phone:'',
        jobnumber:'',
        roleid:'',
        adminid:'',
        flats : [],
        removeFlat:function(index){
            this.flats.splice(index,1);
            if(this.flats.length < 1){
                this.addFlat();
            }
        },
        addFlat:function () {
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
        }
    }
    $scope.dataInit = function (user) {
        $scope.form.status= user.adminId ? 1 : 0;
        $scope.form.username= user.userName || '';
        $scope.form.password= '';
        $scope.form.password1= '';
        $scope.form.useraccount=user.userAccount || '';
        $scope.form.phone=user.phone || '';
        $scope.form.jobnumber=user.jobNumber || '';
        $scope.form.roleid= '' + (user.roleId || '');
        $scope.form.flats = []
        if(user.flatIds && user.flatIds.length>0){
            user.flatIds.forEach(function (flat) {
                var item = {
                    flatId:flat.flatId
                }
                $scope.selecter.flatSelecter(item);
                $scope.form.flats.push(item);
            })
        }else{
            $scope.form.addFlat();
        }
        $scope.form.adminid=user.adminId || '';
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

        }
    }
    $scope.addSave = function (fun) {
        var ids = $scope.form.getFlat();
        if($scope.form.password.length < 1 || $scope.form.username.length < 1 || $scope.form.jobnumber.length < 1 || $scope.form.phone.length < 1 || $scope.form.roleid.length < 1 || $scope.form.useraccount.length < 1 || ids.length < 1)return;
        if($scope.form.password != $scope.form.password1){
            swal("提示", "两次密码输入不一致", "error"); 
            return;
        }
        $rootScope.loading = true;
        FlatService.addManager({
            username:$scope.form.username,
            password:$scope.form.password,
            useraccount:$scope.form.useraccount,
            phone:$scope.form.phone,
            jobnumber:$scope.form.jobnumber,
            flatids:ids,
            roleid:$scope.form.roleid
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
        var ids = $scope.form.getFlat();
        if($scope.form.username.length < 1 || $scope.form.jobnumber.length < 1 || $scope.form.phone.length < 1 || $scope.form.roleid.length < 1 || $scope.form.useraccount.length < 1 || ids.length < 1)return;
        $rootScope.loading = true;
        FlatService.editManager({
            adminid:$scope.form.adminid,
            username:$scope.form.username,
            flatids:ids,
            phone:$scope.form.phone,
            jobnumber:$scope.form.jobnumber,
            roleid:$scope.form.roleid
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
    //         return FlatService.delManager({
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
    //基础的页码、排序等等选项
    $scope.media = {
        epage:1,
        pageCount:1,
        recordCount:1,
        pagesize:10,
        campusid:'',
        liveareaid:'',
        flatid:'',
        orderfield:'',
        ordertype:'',
        title:''
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
        $scope.media.campusid = item.campusId || '';
        $scope.media.liveareaid = item.liveAreaId || '';
        $scope.media.flatid = item.flatId || '';
        refresh();
    };
    
    
    //初始化树+列表
    if(!$rootScope.treeFlat){
        FlatService.getList().success(function(data){
            $rootScope.loading = false;
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
    function getRole() {
        RoleService.getList({
            token:AppConfig.token,
            type:1,
            schoolcode:AppConfig.schoolCode
        }).success(function (data) {
            $rootScope.loading = false;
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
        if(!n)$scope.media.epage =1;
        $rootScope.loading = true;
        FlatService.getManagerList($scope.media).success(function (data) {
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
