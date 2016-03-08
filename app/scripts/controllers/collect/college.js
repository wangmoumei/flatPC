angular.module('flatpcApp')
.controller('SchoolCtrl', ['$scope','AppConfig','$rootScope','CollegeService',function($scope,AppConfig,$rootScope,CollegeService) {
    $scope.media = {
        status:1,
        type:1,
        name:'',
        collegeName:'',
        className:'',
        listOrder:1,
        grade:'',
        classId:'',
        history:0
    };
    $scope.grades = CollegeService.getGrade();
    $scope.show = function(type,item){
        $scope.media.status = 0;
        $scope.media.type = type;
        
        $scope.media.name= item.name || '';
        $scope.media.collegeName=item.collegeName || '';
        $scope.media.collegeId = item.collegeId || '';
        
        $scope.media.className=item.className || '';
        $scope.media.classId=item.classId || '';
        $scope.media.grade=item.grade || '';
        $scope.media.history = item.history?true:false || false;
        
        $scope.media.listOrder=item.listOrder || 1;
    }
    
    $scope.add = function(type,item){
        $scope.media.status = 1;
        $scope.media.type = type;
        $scope.media.collegeName= '';
        $scope.media.className= '';
        $scope.media.grade= '';
        $scope.media.listOrder= 1;
        $scope.media.collegeId = item.collegeId || '';
        $scope.media.history = false;
    }
    $scope.addSave = function(){
        $rootScope.loading = true;
        (function(){
            if($scope.media.type == 1){
                return CollegeService.addCollege({
                    token:AppConfig.token,
                    schoolcode:AppConfig.schoolCode,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.collegeName
                })
            }else if($scope.media.type == 2){
                return CollegeService.addClass({
                    token:AppConfig.token,
                    schoolcode:AppConfig.schoolCode,
                    collegeid:$scope.media.collegeId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.className,
                    grade:$scope.media.grade,
                    status:$scope.media.history?1:0
                })
            }
        })().success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                swal("提示", "添加成功！", "success"); 
                refresh();
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
        })
    }
    $scope.editSave = function(){
        $rootScope.loading = true;
        (function(){
            if($scope.media.type == 1){
                return CollegeService.editCollege({
                    token:AppConfig.token,
                    collegeid:$scope.media.collegeId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.collegeName
                }).success(function(){
                    $rootScope.loading = false;
                })
            }else if($scope.media.type == 2){
                return CollegeService.editClass({
                    token:AppConfig.token,
                    classid:$scope.media.classId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.className,
                    status:$scope.media.history?1:0,
                    grade:$scope.media.grade
                }).success(function(){
                    $rootScope.loading = false;
                })
            }
        })().success(function(data){
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
                (function(){
                    if($scope.media.type == 1){
                        return CollegeService.delCollege({
                            token:AppConfig.token,
                            collegeid:$scope.media.collegeId
                        })
                    }else if($scope.media.type == 2){
                        return CollegeService.delClass({
                            token:AppConfig.token,
                            classid:$scope.media.classId
                        })
                    }
                })().success(function(data){
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
    
    
    if(!$rootScope.treeCollege)
        refresh().then(function(){
            if($rootScope.treeCollege.length > 0 && $rootScope.treeCollege[0].collegeList.length > 0)
            $scope.show(1,$rootScope.treeCollege[0].collegeList[0]);
        });
    else{
        if($rootScope.treeCollege.length > 0 && $rootScope.treeCollege[0].collegeList.length > 0)
            $scope.show(1,$rootScope.treeCollege[0].collegeList[0]);
        $rootScope.loading = false;
    }
        
    function refresh(){
        $rootScope.loading = true;
        return CollegeService.getList(AppConfig.schoolCode).success(function(data){
            console.log(data);
            if(data.code == 0){
                $rootScope.treeCollege = data.data;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            $rootScope.loading = false;
        });
    }
}]);