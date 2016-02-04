angular.module('flatpcApp')
.controller('TypeCtrl', ['$scope', 'AppConfig','$rootScope','RoomService',
function($scope,AppConfig,$rootScope,RoomService) {
    
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
    }
    $scope.uploadImg = function(){
        
        alert('选择了图片');
    }
    $scope.addSave = function(){
        RoomService.addType({
            token:'',
            schoolcode:AppConfig.schoolCode,
            title:$scope.roomType.title,
            direction:$scope.roomType.direction,
            fee:$scope.roomType.fee,
            bedNum:$scope.roomType.bedNum,
            memo:$scope.roomType.memo,
            bedStyle:$scope.roomType.bedStyle,
            area:$scope.roomType.area,
            roomPic:$scope.roomType.roomPic,
            purpose:$scope.roomType.purpose
        }).success(function(){
            swal("提示", "添加成功！", "success"); 
            refresh();
        });
    }
    $scope.editSave = function(){
        RoomService.editType({
            token:'',
            typeId:AppConfig.schoolCode,
            title:$scope.roomType.title,
            direction:$scope.roomType.direction,
            fee:$scope.roomType.fee,
            bedNum:$scope.roomType.bedNum,
            memo:$scope.roomType.memo,
            bedStyle:$scope.roomType.bedStyle,
            area:$scope.roomType.area,
            roomPic:$scope.roomType.roomPic,
            purpose:$scope.roomType.purpose
        }).success(function(){
            swal("提示", "修改成功！", "success"); 
            refresh();
        });
    }
    $scope.delete = function(){
        RoomService.delType({
            token:'',
            schoolcode:$scope.roomType.typeId
        }).success(function(){
            swal("提示", "删除成功！", "success"); 
            refresh();
        });
    }
    $rootScope.loading = false;
    if(!$rootScope.treeType)
        refresh().then(function(){
            if($rootScope.treeType[0]) $scope.show($rootScope.treeType[0]);
        });
    else
        if($rootScope.treeType[0]) $scope.show($rootScope.treeType[0]);
    function refresh(){
        $rootScope.loading = true;
        return RoomService.getTypeList().success(function(data){
            $rootScope.treeType = data.data;
            $rootScope.loading = false;
        });
    }
}]);