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
            enumera:''
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
            $rootScope.treeFlat = data.data;
            refresh();
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
            $scope.media.floor.floortype = floor.floorType || "";
            $scope.media.floor.memo = floor.memo || "";
        }else{
            $scope.media.floor.floorid = "";
            $scope.media.floor.floorname = "";
            $scope.media.floor.listorder = "";
            $scope.media.floor.typeid = "";
            $scope.media.floor.floortype = "";
            $scope.media.floor.memo = "";
            $scope.media.floor.floornumber=1;
            $scope.media.floor.roomnumber=1;
            $scope.media.floor.enumera='';
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
                    console.log(data);
                    swal("提示", "添加成功！", "success"); 
                    refresh($scope.media.flatid);
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
                    enumera:$scope.media.floor.enumera
                }).success(function(data){
                    console.log(data);
                    swal("提示", "添加成功！", "success"); 
                    refresh($scope.media.flatid);
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
                console.log(data);
                swal("提示", "修改成功！", "success"); 
                refresh($scope.media.flatid);
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
                    console.log(data);
                    swal("提示", "删除成功！", "success"); 
                    refresh($scope.media.flatid);
                });
            });
        }
    }
    
    $scope.roomInit = function (room,floor) {
        typeInit();
        $scope.media.floor.floorid = floor.floorId || "";
        $scope.media.floor.floorname = floor.floorName || "";
        if(room.status < 0){
            $scope.media.room.type = 0;
            $scope.media.room.roomid = '';
            $scope.media.room.roomname = '';
            $scope.media.room.floornum = 0;
            $scope.media.room.roomnum = 0;
            $scope.media.room.status = 0;
            $scope.media.room.roomstyle = '';
            $scope.media.room.roomtype = '';
            $scope.media.room.memo = '';
        }else{
            $scope.media.room.type = 1;
            $scope.media.room.roomid = room.roomId;
            $scope.media.room.roomname = room.roomName;
            $scope.media.room.floornum = room.listOrder;
            $scope.media.room.roomnum = room.listOrder;
            $scope.media.room.status = room.status;
            $scope.media.room.roomstyle = room.roomStyle;
            $scope.media.room.roomtype = room.typeId;
            $scope.media.room.memo = room.memo;
        }
    }
    $scope.room = {
        addSave:function () {
            
            
            $rootScope.loading = true;
            RoomService.addRoom({
                token:AppConfig.token,
                floorid:$scope.media.floor.floorid,
                listorder:$scope.media.room.listorder,
                status:$scope.media.room.status,
                roomstyle:$scope.media.room.roomstyle,
                typeid:$scope.media.room.typeid,
                roomname:$scope.media.room.roomname,
                memo:$scope.media.room.memo
            }).success(function(data){
                console.log(data);
                swal("提示", "添加成功！", "success"); 
                refresh($scope.media.flatid);
            });
            
        },
        editSave:function () {
            
            $rootScope.loading = true;
            RoomService.editRoom({
                token:AppConfig.token,
                roomid:$scope.media.roomid,
                roomnum:$scope.media.room.roomnum,
                status:$scope.media.room.status,
                roomstyle:$scope.media.room.roomstyle,
                typeid:$scope.media.room.typeid,
                roomname:$scope.media.room.roomname,
                memo:$scope.media.room.memo
            }).success(function(data){
                console.log(data);
                swal("提示", "修改成功！", "success"); 
                refresh($scope.media.flatid);
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
                    console.log(data);
                    swal("提示", "删除成功！", "success"); 
                    refresh($scope.media.flatid);
                });
            });
        }
    }
    
    function typeInit() {
        if(!$rootScope.treeType){
            $rootScope.loading = true;
            RoomService.getTypeList().success(function(data){
                $rootScope.treeType = data.data;
                $rootScope.loading = false;
            });
        }
    }
        
    function refresh(flatid){
        if(!flatid){
            if($rootScope.treeFlat.cmpusList && $rootScope.treeFlat.cmpusList[0].liveAreaList && $rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList && $rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0].flatId)
            {
                flatid = $rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0].flatId;
                $scope.media.title = $rootScope.treeFlat.cmpusList[0].title + '-' + $rootScope.treeFlat.cmpusList[0].liveAreaList[0].title + '-' + $rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0].title;
            } 
            else return;
        }
        $rootScope.loading = true;
        RoomService.getList(flatid).success(function(data){
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
            console.log(data.data);
            $rootScope.loading = false;
        })
    }
}])