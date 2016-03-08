angular.module('flatpcApp')
.controller('GradeSettingCtrl', ['$scope','AppConfig','$rootScope', 'GradeService',
function($scope,AppConfig,$rootScope,GradeService) {
    $scope.media = {
        tab:0,
        setTab:function (n) {
            this.tab = n;
            this.status = n?(this.typeId1?0:1):(this.typeId?0:1);
        },
        status:1,
        type:0,
        typeId:0,
        title:'',
        parentTitle:'',
        fid:0,
        listOrder:1,
        value:0,
        typeId1:0,
        title1:'',
        parentTitle1:'',
        fid1:0,
        listOrder1:1,
        value1:0
    };
    $scope.show = function(type,item,category){
        $scope.media.status = 0;
        $scope.media.type = type;
        if($scope.media.tab){
            $scope.media.title1 = item.title || '';
            $scope.media.parentTitle1 = category || item.title || '';
            $scope.media.typeId1 = item.typeId || 0;
            $scope.media.value1 = item.value || 0;
            $scope.media.listOrder1 =item.listOrder || 1;
        }else{
            $scope.media.title = item.title || '';
            $scope.media.parentTitle = category || item.title || '';
            $scope.media.typeId = item.typeId || 0;
            $scope.media.value = item.value || 0;
            $scope.media.listOrder=item.listOrder || 1;
        }
    }
    
    $scope.add = function(type,item,category){
        $scope.media.status = 1;
        $scope.media.type = type;
        if($scope.media.tab){
            $scope.media.title1 = '';
            $scope.media.parentTitle1 = category  || '';
            $scope.media.typeId1 = 0;
            $scope.media.fid1 = item.typeId;
            $scope.media.value1 = 0;
            $scope.media.listOrder1 = 1;
        }else{
            $scope.media.title = '';
            $scope.media.parentTitle = category  || '';
            $scope.media.typeId = 0;
            $scope.media.fid = item.typeId;
            $scope.media.value = 0;
            $scope.media.listOrder= 1;
        }
        
    }
    $scope.addSave = function(){
        $rootScope.loading = true;
        (function(){
            return GradeService.addSetting({
                schoolcode:AppConfig.schoolCode,
                token:AppConfig.token,
                fid:$scope.media.tab?$scope.media.fid1:$scope.media.fid,
                value:$scope.media.tab?$scope.media.value1:$scope.media.value,
                title:$scope.media.tab?($scope.media.type>1?$scope.media.title1:$scope.media.parentTitle1):($scope.media.type>1?$scope.media.title:$scope.media.parentTitle),
                listorder:$scope.media.tab?$scope.media.listOrder1:$scope.media.listOrder
            })

        })().success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "添加成功！", "success"); 
                refresh();
            }else{
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            }
            
        })
    }
    $scope.editSave = function(){
        $rootScope.loading = true;
        return GradeService.editSetting({
            token:AppConfig.token,
            typeid:$scope.media.tab?$scope.media.typeId1:$scope.media.typeId,
            value:$scope.media.tab?$scope.media.value1:$scope.media.value,
            title:$scope.media.tab?($scope.media.type>1?$scope.media.title1:$scope.media.parentTitle1):($scope.media.type>1?$scope.media.title:$scope.media.parentTitle),
            listorder:$scope.media.tab?$scope.media.listOrder1:$scope.media.listOrder
        }).success(function(data){
             $rootScope.loading = false;
            
            if(data.code == 0){
                swal("提示", "修改成功！", "success"); 
                refresh();
            }else{
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            }
        })
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
                return GradeService.delSetting({
                    token:'',
                    typeid:$scope.media.tab?$scope.media.typeId1:$scope.media.typeId
                }).success(function(data){
                    $rootScope.loading = false;
                    
                    if(data.code == 0){
                        swal("提示", "删除成功！", "success"); 
                        $scope.media.type=0;
                        refresh();
                    }else{
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    }
                })
                
        });
        
    }
    
    if(!$rootScope.treeGrade){
        refresh().then(function () {
            init();
        })
    }
    else {
        init();
        $rootScope.loading = false;
    }
    
    function init() {
        $scope.media.tab=1;
        if($rootScope.treeGrade[1])
            if($rootScope.treeGrade[1].subNodes[0])
                $scope.show(1,$rootScope.treeGrade[1].subNodes[0]);
            else
                $scope.add(1,$rootScope.treeGrade[1]);
            
        $scope.media.tab=0;
        if($rootScope.treeGrade[0])
            if($rootScope.treeGrade[0].subNodes[0])
                $scope.show(1,$rootScope.treeGrade[0].subNodes[0]);
            else
                $scope.add(1,$rootScope.treeGrade[0]);
            
    }
    function refresh(){
        $rootScope.loading = true;
        return GradeService.getSettingList().success(function(data){
            console.log(data);
            $rootScope.loading = false;
            
            if(data.code == 0){
                $rootScope.treeGrade = data.data;
            }else{
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        });
    }
}]);