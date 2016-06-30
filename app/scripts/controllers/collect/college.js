angular.module('flatpcApp')
.controller('SchoolCtrl', ['$scope','AppConfig','$rootScope','CollegeService',function($scope,AppConfig,$rootScope,CollegeService) {
   //批量导入班级，直接加载到控制器头部就行了
    $scope.parent = "flat";
    $rootScope.loading = false;
    var a = document.createElement('a');
    a.href = AppConfig.FRAME + "index.php/?m=Stmessage&c=ImportClass&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();

    $scope.media = {
        status:1,
        type:1,
        name:'',
        collegeName:'',
        className:'',
        listOrder:1,
        grade:'',
        degree:'',
        degreeYear:'',
        classId:'',
        history:0,
        menuCheck : function () {
            switch (this.type){
                case 0:
                    //return this.status?$rootScope.menuCheck():$rootScope.menuCheck();
                    break;
                case 1:
                    
                    return this.status?$rootScope.menuCheck(167):$rootScope.menuCheck(170);
                    break;
                case 2:
                    return this.status?$rootScope.menuCheck(168):$rootScope.menuCheck(170);
                    break;
                case 3:
                    //return this.status?$rootScope.menuCheck(227):$rootScope.menuCheck(228);
                    break;
            }
            return false;
        }
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
        $scope.media.degree=item.degree || '';
        $scope.media.degreeyear=item.degreeYear || '';
        $scope.media.history = item.history?true:false || false;
        $scope.media.listOrder=item.listOrder || 1;
    }
    
    //添加班级时清空缓存
    $scope.add = function(type,item){
        $scope.media.status = 1;
        $scope.media.type = type;
        $scope.media.collegeName= '';
        $scope.media.className= '';
        $scope.media.grade= '';
        $scope.media.degree='';
        $scope.media.degreeyear='';
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
                    degree:$scope.media.degree,
                    degreeyear:$scope.media.degreeyear,
                    status:$scope.media.history?1:0
                })
            }
        })().success(function(data){
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
                    grade:$scope.media.grade,
                    degree:$scope.media.degree,
                    degreeyear:$scope.media.degreeyear,
                }).success(function(){
                    $rootScope.loading = false;
                })
            }
        })().success(function(data){
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
                    }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
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
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            $rootScope.loading = false;
        });
    }
}]);