angular.module('flatpcApp')
.controller('TypeCtrl', ['$scope', 'AppConfig','$rootScope','RoomService','PublicService',
function($scope,AppConfig,$rootScope,RoomService,PublicService) {
    
    $scope.roomType={};
    $scope.show = function(item){
        $scope.roomType.typeId = item.typeId;
        $scope.roomType.title = item.title;
        $scope.roomType.direction = item.direction;
        $scope.roomType.fee = item.fee;
        $scope.roomType.bedNum = item.bedNum;
        $scope.roomType.memo = item.memo;
        $scope.roomType.bedStyle = item.bedStyle;
        $scope.roomType.area = item.area;
        $scope.roomType.roomPic = item.roomPic;
        $scope.roomType.fileid = item.fileId;
        $scope.roomType.purpose = item.purpose;
        $scope.roomType.type = 1;
    }
    $scope.add = function(){
        $scope.roomType.title = "";
        $scope.roomType.direction = "";
        $scope.roomType.fee = "";
        $scope.roomType.bedNum = 6;
        $scope.roomType.memo = "";
        $scope.roomType.bedStyle = "";
        $scope.roomType.area = "";
        $scope.roomType.roomPic = "";
        $scope.roomType.purpose = "";
        $scope.roomType.type = 0;
        $scope.roomType.fileid = 0;
    }
    $scope.uploadImg = function(event){
        
        
        var files = event.target.files;
        var s = files[0].name.split(".").pop();
        if(s != "jpg" && s != "png" && s != "jpeg"){
            swal('提示', '文件格式不正确！请上传*.jpg或*.png文件', 'error'); 
            return false;
        }
        var form = document.createElement('form');
        form.enctype = 'multipart/form-data';
        var fdata = new FormData(form);
        if (!fdata) { swal('提示', '你的浏览器不支持文件上传！', 'error'); return false; };
        fdata.append('img', files[0]);
        
        fdata.append('token', AppConfig.token);
        fdata.append('schoolcode', AppConfig.schoolCode);
        $rootScope.loading = true;
        return PublicService.imgUpload(fdata).success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                $scope.roomType.roomPic = data.data.serverPath;
                $scope.roomType.fileid = data.data.fileId;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
    }
    $scope.addSave = function(){
        $rootScope.loading = true;
        RoomService.addType({
            token:AppConfig.token,
            schoolcode:AppConfig.schoolCode,
            title:$scope.roomType.title,
            direction:$scope.roomType.direction,
            fee:$scope.roomType.fee,
            bedNum:$scope.roomType.bedNum,
            memo:$scope.roomType.memo,
            bedStyle:$scope.roomType.bedStyle,
            area:$scope.roomType.area,
            fileid:$scope.roomType.fileid,
            purpose:$scope.roomType.purpose
        }).success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "添加成功！", "success"); 
                refresh();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
        });
    }
    $scope.editSave = function(){
        $rootScope.loading = true;
        RoomService.editType({
            token:AppConfig.token,
            typeId:$scope.roomType.typeId,
            title:$scope.roomType.title,
            direction:$scope.roomType.direction,
            fee:$scope.roomType.fee,
            bedNum:$scope.roomType.bedNum,
            memo:$scope.roomType.memo,
            bedStyle:$scope.roomType.bedStyle,
            area:$scope.roomType.area,
            fileid:$scope.roomType.fileid,
            purpose:$scope.roomType.purpose
        }).success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "修改成功！", "success");
                refresh();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        });
    }
    $scope.delete = function(){
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
            RoomService.delType({
                token:AppConfig.token,
                typeid:$scope.roomType.typeId
            }).success(function(data){
                $rootScope.loading = false;
                if(data.code == 0){
                    swal("提示", "删除成功！", "success");
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
    $rootScope.loading = false;
    if(!$rootScope.treeType)
        refresh().then(function(){
            if($rootScope.treeType[0]) $scope.show($rootScope.treeType[0]);
            else $scope.media.status = 1;
        });
    else
        if($rootScope.treeType[0]) $scope.show($rootScope.treeType[0]);
        else $scope.media.status = 1;
    function refresh(){
        $rootScope.loading = true;
        return RoomService.getTypeList().success(function(data){
            if(data.code == 0)
                $rootScope.treeType = data.data;
            else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
        });
    }
}]);