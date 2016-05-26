angular.module('flatpcApp')
// .controller('FlatCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
//         //存储列表头到frame.html中
//     $scope.menus = [
//         '公寓管理','综合查询','按楼查看'
//     ];
//     //跳转到什么地方去
//     $scope.parent = "flat";
//     $scope.loaded = function(){
//         $rootScope.loading = false;
//         $scope.$apply();
//     }
//     var a = document.createElement('a');
//     a.href = AppConfig.FRAME + "index.php?m=Apartment&c=Floor&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
//     a.target="page-frame";
//     a.click();
// }])
.controller('FlatCtrl', ['$scope', 'AppConfig','$rootScope','StudentService','FlatService','$filter',
function($scope,AppConfig,$rootScope,StudentService,FlatService,$filter) {
    $scope.media = {
        title:''
    }
    if(!$rootScope.treeFlat){
        FlatService.getList(AppConfig.schoolCode).success(function(data){
            //console.log(data);
            $rootScope.treeFlat = data.data;
            refresh();
        });
    }
    else {
        refresh();
    }
    $scope.loadInfo = function(studentid){
        if(!studentid || studentid.length<1) 
            return null;
        $rootScope.loading = true;
        return StudentService.getStudent(studentid).success(function(data){
            if(data.code == 0){
                $scope.student = data.data;
                $rootScope.loading = false;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            console.log(data);
            
        })
    }
    $scope.show = function (item) {
        if(item && item.flatId){
            refresh(item.flatId)
        }
    }
    function refresh(flatid){
        flatid = flatid || false;
        if(!flatid){
            if($rootScope.treeFlat.cmpusList.length>0 && $rootScope.treeFlat.cmpusList[0].liveAreaList.length>0 && $rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList.length>0 && $rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0].flatId)
            {
                flatid = $rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0].flatId;
                $scope.media.title = $rootScope.treeFlat.cmpusList[0].title + '-' + $rootScope.treeFlat.cmpusList[0].liveAreaList[0].title + '-' + $rootScope.treeFlat.cmpusList[0].liveAreaList[0].flatList[0].title;
            } 
            else {
                $rootScope.loading = false;
                $scope.media.title = '请选择楼栋';
                return;
            }
        }
        $rootScope.loading = true;
        FlatService.getFlat(flatid).success(function(data){
            if(data.code == 0){
                data.list.floorList = data.list.floorList || [];
                data.list.floorList.forEach(function(list){
                    list.roomList = list.roomList || [];
                    list.roomList =  $filter('sliceArray')(list.roomList);
                });
                $scope.flat = data.list;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            console.log(data.list);
            $rootScope.loading = false;
        })
    }
}])
