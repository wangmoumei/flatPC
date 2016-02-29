angular.module('flatpcApp')
.controller('SchoolCtrl', ['$scope','AppConfig','$rootScope','CollegeService',function($scope,AppConfig,$rootScope,CollegeService) {
    $scope.media = {
        status:0,
        type:0,
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
        $scope.media.history = item.history || '';
        
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
        $scope.media.history = 0;
    }
    $scope.addSave = function(){
        $rootScope.loading = true;
        (function(){
            if($scope.media.type == 1){
                return CollegeService.addCollege({
                    token:'',
                    schoolcode:AppConfig.schoolCode,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.collegeName
                })
            }else if($scope.media.type == 2){
                return CollegeService.addClass({
                    token:'',
                    schoolcode:AppConfig.schoolCode,
                    collegeid:$scope.media.collegeId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.collegeName,
                    grade:$scope.media.grade,
                    status:$scope.media.history
                })
            }
        })().then(function(){
            $rootScope.loading = false;
            swal("提示", "添加成功！", "success"); 
            refresh();
        })
    }
    $scope.editSave = function(){
        $rootScope.loading = true;
        (function(){
            if($scope.media.type == 1){
                return CollegeService.editCollege({
                    token:'',
                    collegeid:$scope.media.collegeId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.collegeName
                }).success(function(){
                    $rootScope.loading = false;
                })
            }else if($scope.media.type == 2){
                return CollegeService.editClass({
                    token:'',
                    classid:$scope.media.classId,
                    listorder:$scope.media.listOrder,
                    title:$scope.media.collegeName,
                    status:$scope.media.history,
                    grade:$scope.media.grade
                }).success(function(){
                    $rootScope.loading = false;
                })
            }
        })().then(function(){
             $rootScope.loading = false;
            swal("提示", "修改成功！", "success"); 
            refresh();
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
                            token:'',
                            collegeid:$scope.media.collegeId
                        })
                    }else if($scope.media.type == 2){
                        return CollegeService.delClass({
                            token:'',
                            classid:$scope.media.classId
                        })
                    }
                })().then(function(){
                    $rootScope.loading = false;
                    swal("提示", "删除成功！", "success"); 
                    $scope.media.type=0;
                    refresh();
                })
                
        });
        
    }
    
    
    if(!$rootScope.treeCollege)
        refresh().then(function(){$scope.show(1,$rootScope.treeCollege[0].collegeList[0]);});
    else{
        $scope.show(1,$rootScope.treeCollege[0].collegeList[0]);
        $rootScope.loading = false;
    }
        
    function refresh(){
        $rootScope.loading = true;
        return CollegeService.getList(AppConfig.schoolCode).success(function(data){
            console.log(data);
            $rootScope.treeCollege = data.data;
            $rootScope.loading = false;
        });
    }
}]);