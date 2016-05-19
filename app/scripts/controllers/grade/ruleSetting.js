'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @违章设置
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('RuleSettingCtrl', ['$scope','AppConfig','$rootScope', 'RuleService','GradeService',
function($scope,AppConfig,$rootScope,RuleService,GradeService) {
    $scope.media = {
        tab:1,
        setTab:function (n) {
            this.tab = n;
        },
        type:1,
        status:1,
        fid:0,
        parent:'',
        fullmark:0,
        listorder:1,
        title:'',
        itemid:0,
        role:AppConfig.role==0?true:false
    };
    $scope.show = function(type,item,parent){
        $scope.media.status = 0;
        $scope.media.type = type;
        $scope.media.parent = parent || '';
        $scope.media.fullmark=item.fullmark || 0;
        $scope.media.listorder=item.listOrder || 1;
        $scope.media.title=item.title;
        $scope.media.itemid=item.itemId;
    }
    $scope.add = function(type,item){
        $scope.media.status = 1;
        $scope.media.type = type;
        $scope.media.parent = item.title || '';
        $scope.media.fid = item.itemId || 0;
        $scope.media.fullmark = 0;
        $scope.media.listorder =1;
        $scope.media.title = '';
    }
    $scope.addSave = function(){
        $rootScope.loading = true;
        return RuleService.addRule({
            token:AppConfig.token,
            schoolcode:AppConfig.schoolCode,
            fid:$scope.media.fid,
            title:$scope.media.title,
            fullmark:$scope.media.fullmark,
            listorder:$scope.media.listorder
        }).success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "添加成功！", "success"); 
                refresh();
                $scope.media.status = 0;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
    }
    $scope.editSave = function(){
        $rootScope.loading = true;
        return RuleService.editRule({
            token:AppConfig.token,
            itemid:$scope.media.itemid,
            title:$scope.media.title,
            fullmark:$scope.media.fullmark,
            listorder:$scope.media.listorder
        }).success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "修改成功！", "success"); 
                refresh();
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
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
                return RuleService.delRule({
                    token:AppConfig.token,
                    itemid:$scope.media.itemid
                }).success(function(data){
                    $rootScope.loading = false;
                    if(data.code == 0){
                        swal("提示", "删除成功！", "success"); 
                        $scope.media.type=0;
                        refresh();
                    }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                })
                
        });
    }
    $scope.basicSave = function () {
         $rootScope.loading = true;
        return GradeService.basicSetting({
            week:AppConfig.week?0:1,
            month:AppConfig.month?0:1,
            day:AppConfig.day?0:1,
            bed:AppConfig.bed?0:1,
            pass:AppConfig.pass?0:1,
            photo:AppConfig.photo?0:1,
            takephoto:AppConfig.takephoto?0:1,
            check:AppConfig.check?0:1,
            role:$scope.media.role?0:1
        }).success(function (data) {
            if(data.code == 0){
                swal("提示","保存成功！", "success"); 
                sessionStorage.role = $scope.media.role?0:1;
                
                AppConfig.role = $scope.media.role?0:1;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
        })
    }
    
    if(!$rootScope.treeRule)
        refresh();
    else $rootScope.loading = false;
    function refresh(){
        $rootScope.loading = true;
        return RuleService.getList().success(function(data){
            console.log(data);
            if(data.code == 0){
                $rootScope.treeRule = data.data;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
            
        });
    }
}]);