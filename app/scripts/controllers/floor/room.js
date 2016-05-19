angular.module('flatpcApp')
.controller('RoomCtrl', ['$scope', 'AppConfig','$rootScope','RoomService','FlatService','$filter',
function($scope,AppConfig,$rootScope,RoomService,FlatService,$filter) {
    $scope.media = {
        flatid:'',
        title:'',
        floor:{
            type:0,
            floorid:'',
            floorname:'',
            listorder:0,
            typeid:"",
            floortype:"",
            memo:'',
            floornumber:0,
            roomnumber:0,
            startfloor:1
        },
        room:{
            type:0,
            roomid:'',
            roomname:'',
            listorder:0,
            status:0,
            roomstyle:'',
            typeid:'',
            memo:''
        }
    }
    
    $scope.show = function (flat,liveArea,campus) {
        $scope.media.flatid = flat.flatId;
        $scope.media.title = campus.title + '-' + liveArea.title + '-' + flat.title;
        refresh(flat.flatId);
    }
    
    if(!$rootScope.treeFlat){
        FlatService.getList(AppConfig.schoolCode).success(function(data){
            console.log(data.data);
            if(data.code == 0){
                $rootScope.treeFlat = data.data;
                refresh();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error");
        });
    }
    else {
        refresh();
    }
    
    $scope.floorInit = function (n,floor) {
        $scope.media.floor.type = n;
        if(floor){
            $scope.media.floor.floorid = floor.floorId || "";
            $scope.media.floor.floorname = floor.floorName || "";
            $scope.media.floor.listorder = floor.listOrder || "";
            $scope.media.floor.typeid = floor.typeId || "";
            $scope.media.floor.floortype = floor.floorType || '男';
            $scope.media.floor.memo = floor.memo || "";
        }else{
            $scope.media.floor.floorid = "";
            $scope.media.floor.floorname = "";
            $scope.media.floor.listorder = "";
            $scope.media.floor.typeid = "";
            $scope.media.floor.floortype = '男';
            $scope.media.floor.memo = "";
            $scope.media.floor.floornumber=1;
            $scope.media.floor.roomnumber=1;
            $scope.media.floor.startfloor=1;
        }
        typeInit();
    }
    $scope.floor = {
        addSave:function () {
            if($scope.media.floor.type == 0){
            
                $rootScope.loading = true;
                RoomService.addFloor({
                    token:AppConfig.token,
                    universityid:AppConfig.schoolCode,
                    flatid:$scope.media.flatid,
                    listorder:$scope.media.floor.listorder,
                    typeid:$scope.media.floor.typeid,
                    floortype:$scope.media.floor.floortype,
                    floorname:$scope.media.floor.floorname,
                    memo:$scope.media.floor.memo
                }).success(function(data){
                    // console.log(data);
                    if(data.code == 0 ){
                        swal("提示", "添加成功！", "success"); 
                        refresh($scope.media.flatid);
                    }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error");
                        $rootScope.loading = false;
                    }
                });
            }else if($scope.media.floor.type == 2){
                $rootScope.loading = true;
                RoomService.multiAdd({
                    token:AppConfig.token,
                    flatid:$scope.media.flatid,
                    floornumber:$scope.media.floor.floornumber,
                    roomnumber:$scope.media.floor.roomnumber,
                    typeid:$scope.media.floor.typeid,
                    roomstyle:$scope.media.floor.floortype,
                    startfloor:$scope.media.floor.startfloor
                }).success(function(data){
                    $rootScope.loading = false;
                    if(data.code == 0){
                        swal("提示", "添加成功！", "success");
                        refresh($scope.media.flatid);
                    }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
                    else{
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    }
                });
            }
        },
        editSave:function () {
            
            $rootScope.loading = true;
            RoomService.editFloor({
                token:AppConfig.token,
                floorid:$scope.media.floor.floorid,
                listorder:$scope.media.floor.listorder,
                typeid:$scope.media.floor.typeid,
                floortype:$scope.media.floor.floortype,
                floorname:$scope.media.floor.floorname,
                memo:$scope.media.floor.memo
            }).success(function(data){
                $rootScope.loading = false;
                if(data.code == 0){
                    swal("提示", "修改成功！", "success");
                    refresh($scope.media.flatid);
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                }
            });
        },
        delete:function () {
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
                RoomService.delFloor({
                    token:AppConfig.token,
                    floorid:$scope.media.floor.floorid
                }).success(function(data){
                    $rootScope.loading = false;
                    if(data.code == 0){
                        swal("提示", "删除成功！", "success");
                        refresh($scope.media.flatid);
                    }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
                    else{
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    }
                });
            });
        }
    }
    
    $scope.roomInit = function (room,floor) {
        console.log(floor)
        typeInit();
        $scope.media.floor.floorid = floor.floorId || "";
        $scope.media.floor.floorname = floor.floorName || "";
        if(room.status < 0){
            $scope.media.room.type = 0;
            $scope.media.room.roomid = '';
            $scope.media.room.roomname = '';
            $scope.media.room.floornum = 0;
            $scope.media.room.listorder = 0;
            $scope.media.room.status = 0;
            $scope.media.room.roomstyle = floor.floorType || '男';
            $scope.media.room.typeid = floor.typeId;
            $scope.media.room.memo = '';
            $scope.media.room.listtype  = "" + 2;
            $scope.media.room.listroom  = '';
        }else{
            $scope.media.room.type = 1;
            $scope.media.room.roomid = room.roomId;
            $scope.media.room.roomname = room.roomName;
            $scope.media.room.floornum = room.listOrder;
            $scope.media.room.listorder = room.listOrder;
            $scope.media.room.status = room.status;
            $scope.media.room.roomstyle = room.roomStyle || '男';
            $scope.media.room.typeid = room.typeId;
            $scope.media.room.memo = room.memo;
            $scope.media.room.listtype  = "" + 2;
            $scope.media.room.listroom  = '';
        }
    }
    $scope.room = {
        addSave:function () {
            var param = {
                token:AppConfig.token,
                floorid:$scope.media.floor.floorid,
                listtype:$scope.media.room.listtype,
                status:$scope.media.room.status,
                roomstyle:$scope.media.room.roomstyle,
                typeid:$scope.media.room.typeid,
                roomname:$scope.media.room.roomname,
                memo:$scope.media.room.memo
            };
            if($scope.media.room.listtype < 2){
                if($scope.media.room.listroom.length > 0)
                    param.listroom = $scope.media.room.listroom;
                else return;
            }
            $rootScope.loading = true;
            RoomService.addRoom(param).success(function(data){
                $rootScope.loading = false;
                if(data.code == 0){
                    swal("提示", "添加成功！", "success");
                    refresh($scope.media.flatid);
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                }
            });
            
        },
        editSave:function () {
            var param = {
                token:AppConfig.token,
                roomid:$scope.media.room.roomid,
                status:$scope.media.room.status,
                listtype:$scope.media.room.listtype,
                roomstyle:$scope.media.room.roomstyle,
                typeid:$scope.media.room.typeid,
                roomname:$scope.media.room.roomname,
                memo:$scope.media.room.memo
            };
            if($scope.media.room.listtype < 2){
                if($scope.media.room.listroom.length > 0)
                    param.listroom = $scope.media.room.listroom;
                else return;
            }
            $rootScope.loading = true;
            RoomService.editRoom(param).success(function(data){
                $rootScope.loading = false;
                if(data.code == 0){
                    swal("提示", "修改成功！", "success"); 
                    refresh($scope.media.flatid);
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                }
            });
        },
        delete:function () {
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
                RoomService.delRoom({
                    token:AppConfig.token,
                    roomid:$scope.media.room.roomid
                }).success(function(data){
                    $rootScope.loading = false;
                    if(data.code == 0){
                        swal("提示", "删除成功！", "success");
                        refresh($scope.media.flatid);
                    }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
                    else{
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    }
                    
                });
            });
        }
    }
    
    function typeInit() {
        if(!$rootScope.treeType){
            $rootScope.loading = true;
            RoomService.getTypeList().success(function(data){
                if(data.code == 0)
                    $rootScope.treeType = data.data;
                else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                }
                $rootScope.loading = false;
            });
        }
    }
        
    function refresh(flatid){
        if(!flatid){
            if($rootScope.treeFlat.cmpusList.length>0 && $rootScope.treeFlat.cmpusList[0].liveAreaList.length>0 && $rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList.length>0 && $rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0].flatId)
            {
                $scope.show($rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0],$rootScope.treeFlat.cmpusList[0],$rootScope.treeFlat.cmpusList[0].liveAreaList[0])
                return;
            } 
            else {
                $rootScope.loading = false;
                $scope.media.title = '请选择楼栋';
                return;
            }
        }
        $rootScope.loading = true;
        RoomService.getList(flatid).success(function(data){
            console.log(data);
            if(data.code == 0 ){
                data.data.floorList = data.data.floorList || [];
                data.data.floorList.forEach(function(list){
                    list.roomList = list.roomList || [];
                    list.roomList =  $filter('sliceArray')(list.roomList);
                    var l = list.roomList.length;
                    if(list.roomList.length>0 && list.roomList[l-1].length<10){
                        list.roomList[l-1].push({
                            status:-1,
                            roomName:'新增寝室'
                        })
                    }else{
                        list.roomList.push([{
                            status:-1,
                            roomName:'新增寝室'
                        }])
                    }
                });
                $scope.flat = data.data;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }else{
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            }
            $rootScope.loading = false;
        })
    }
}])