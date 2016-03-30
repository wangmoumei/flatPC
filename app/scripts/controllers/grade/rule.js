'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @违章设置
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('RuleCtrl', ['$scope','AppConfig','$rootScope', 'RuleService',
function($scope,AppConfig,$rootScope,RuleService) {
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
        listorder:0,
        title:0,
        itemid:0,
        on:false
    };
    $scope.show = function(type,item,parent){
        $scope.media.status = 0;
        $scope.media.type = type;
        $scope.media.parent = parent || '';
        $scope.media.fullmark=item.fullmark;
        $scope.media.listorder=item.listOrder;
        $scope.media.title=item.title;
        $scope.media.itemid=item.itemId;
    }
    $scope.add = function(type,item){
        $scope.media.status = 1;
        $scope.media.type = type;
        $scope.media.parent = item.title || '';
        $scope.media.fid = item.itemId || 0;
        $scope.media.fullmark = '';
        $scope.media.listorder =' ';
        $scope.media.title = '';
        $scope.media.fullmark = '';
    }
    $scope.addSave = function(){
        $rootScope.loading = true;
        return RuleService.addRule({
            token:AppConfig.token,
            schoolcode:AppConfig.schoolCode,
            fid:$scope.media.fid,
            title:$scope.media.semesterName,
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
            title:$scope.media.semesterName,
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