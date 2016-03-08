'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
  .controller('MenuCtrl', ['$scope','$rootScope','RoleService','$filter',
    function ($scope,$rootScope,RoleService,$filter) {
    $scope.media = {
        type:0,
        status1:0,
        isschool:1,
        pid:"",
        listorder:0,
        title:'',
        level:1,
        remark:'',
        status:0,
        nodeid:'',
        title0:'',
        title1:'',    
        title2:'',
        title3:'',
        title4:''       
    }
    $scope.show = function (type,item,pid,remark0,remark1,remark2,remark3,remark4) {
        $scope.media.type = type;
        $scope.media.status1 = 0;
        $scope.media.pid = pid || '';
        $scope.media.title0 = remark0 || '';
        $scope.media.title1 = remark1 || '';
        $scope.media.title2 = remark2 || '';
        $scope.media.title3 = remark3 || '';
        $scope.media.title4 = remark4 || '';
        console.log(item);
        $scope.media.nodeid = item.nodeId || '';
        $scope.media.title = item.title || '';
        $scope.media.status = item.status?false:true;
        $scope.media.level = (item.type+1) || 1;
        $scope.media.remark = item.remark || '';
        $scope.media.isschool = item.isSchool || 0;
        $scope.media.listorder = item.listOrder || 1;
    }
    $scope.add = function (type,pid,remark0,remark1,remark2,remark3,remark4) {
        $scope.media.type = type;
        $scope.media.status1 = 1;
        $scope.media.title0 = remark0 || '';
        $scope.media.title1 = remark1 || '';
        $scope.media.title2 = remark2 || '';
        $scope.media.title3 = remark3 || '';
        $scope.media.title4 = remark4 || '';
        
        $scope.media.title = '';
        $scope.media.pid = pid || '';
        $scope.media.nodeid = '';
        $scope.media.title = '';
        $scope.media.status = false;
        $scope.media.level = type + 1;
        $scope.media.remark = '';
        $scope.media.isschool = 0;
        $scope.media.listorder = 1;
    }
    
    $scope.addSave = function () {
        return RoleService.addMenu({
            pid:$scope.media.pid,
            title:$scope.media.title,
            level:$scope.media.level,
            remark:$scope.media.remark,
            status:$scope.media.status?0:1,
            isschool:$scope.media.pisschoolid,
            listorder:$scope.media.listorder
        }).success(function(data){
            console.log(data);
            $rootScope.loading = false;
        });
    }
    $scope.editSave = function () {
        return RoleService.editMenu({
            nodeid:$scope.media.nodeid,
            title:$scope.media.title,
            level:$scope.media.level,
            remark:$scope.media.remark,
            status:$scope.media.status?0:1,
            isschool:$scope.media.pisschoolid,
            listorder:$scope.media.listorder
        }).success(function(data){
            console.log(data);
            $rootScope.loading = false;
        });
    }
    $scope.delete = function () {
        return RoleService.delMenu({
            nodeid:$scope.media.nodeid
        }).success(function(data){
            console.log(data);
            $rootScope.loading = false;
        });
    }
    
    
    
    
    refresh();

    function refresh(){
        $rootScope.loading = true;
        return RoleService.getMenuList($scope.media).success(function(data){
            $scope.list = data.list;
            console.log(data);
            $rootScope.loading = false;
        });
    }
  }]);
