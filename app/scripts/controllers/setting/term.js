angular.module('flatpcApp')
.controller('TermCtrl', ['$scope','AppConfig','$rootScope', 'TermService',function($scope,AppConfig,$rootScope,TermService) {
    $scope.media = {
        status:0,
        type:0,
        schoolYearId:'',
        schoolYearName:'',
        year:2016,
        semesterId:'',
        semesterName:'',
        isCurrent:0,
        semesterType:'',
        startTime:'',
        endTime:'',
        currentWeek:0,
        countweek:0,
        autoComplete:function(){
            try{
                var t = new Date(),t1 = new Date(this.startTime), t2 = new Date(this.endTime);
                this.semesterType = t1.getMonth()<7?"春季学期":"秋季学期";

                if(t > t1 && t < t2){
                    this.currentWeek = Math.ceil((t.getTime() - t1.getTime()) / (1000 * 60 * 60 * 24 * 7));
                    this.isCurrent = 1;
                }else {
                    this.currentWeek = 0;
                    this.isCurrent = 0;
                }
                if(t1<t2){
                    this.countweek = Math.ceil((t2.getTime() - t1.getTime()) / (1000 * 60 * 60 * 24 * 7));
                }
                else 
                    this.countweek = 0;
            }
            catch(error) {
                throw Error;
            }
        }
    };
    $scope.show = function(type,item,year){
        $scope.media.status = 0;
        $scope.media.type = type;
        $scope.media.schoolYearName = year || item.schoolYearName || '';
        $scope.media.schoolYearId = item.schoolYearId || '';
        $scope.media.year = item.year || "";
        
        $scope.media.semesterId = item.semesterId || '';
        $scope.media.semesterName = item.semesterName || "";
        $scope.media.isCurrent = item.isCurrent || 0;
        $scope.media.semesterType = item.semesterType || "春季学期";
        $scope.media.startTime = item.startTime || '';
        $scope.media.endTime = item.endTime || "";
        $scope.media.currentWeek = item.currentWeek || 0;
        $scope.media.countweek = item.countweek || 0;
    }
    $scope.add = function(type,item){
        $scope.media.status = 1;
        $scope.media.type = type;
        $scope.media.schoolYearName = '';
        $scope.media.schoolYearId = item.schoolYearId || '';
        $scope.media.year = new Date().getFullYear();
        
        $scope.media.semesterId =  '';
        $scope.media.semesterName =  "";
        $scope.media.isCurrent =  0;
        $scope.media.semesterType = "春季学期";
        $scope.media.startTime = new Date().Format("yyyy-MM-dd");
        $scope.media.endTime =  new Date().Format("yyyy-MM-dd");
        $scope.media.currentWeek =  0;
        $scope.media.countweek =  0;
    }
    $scope.addSave = function(){
        $rootScope.loading = true;
        (function(){
            if($scope.media.type == 0){
                return TermService.addYear({
                    token:'',
                    schoolcode:AppConfig.schoolCode,
                    title:$scope.media.schoolYearName,
                    year:$scope.media.year
                })
            }else if($scope.media.type == 1){
                return TermService.addTerm({
                    token:'',
                    schoolcode:AppConfig.schoolCode,
                    schoolyearid:$scope.media.schoolYearId,
                    title:$scope.media.semesterName,
                    iscurrent:$scope.media.isCurrent,
                    currentweek:$scope.media.currentWeek,
                    countweek:$scope.media.countweek,
                    semestertype :$scope.media.semesterType,
                    starttime:$scope.media.startTime,
                    endtime:$scope.media.endTime
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
            if($scope.media.type == 0){
                return TermService.editYear({
                    token:'',
                    schoolyearid:$scope.media.schoolYearId,
                    title:$scope.media.schoolYearName,
                    year:$scope.media.year
                })
            }else if($scope.media.type == 1){
                return TermService.editTerm({
                    token:'',
                    semesterid:$scope.media.semesterId,
                    title:$scope.media.semesterName,
                    iscurrent:$scope.media.isCurrent,
                    currentweek:$scope.media.currentWeek,
                    countweek:$scope.media.countweek,
                    semestertype :$scope.media.semesterType,
                    starttime:$scope.media.startTime,
                    endtime:$scope.media.endTime
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
                    if($scope.media.type == 0){
                        return TermService.delYear({
                            token:'',
                            schoolyearid:$scope.media.schoolYearId
                        })
                    }else if($scope.media.type == 1){
                        return TermService.delTerm({
                            token:'',
                            semesterId:$scope.media.semesterId
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
    if(!$rootScope.treeTerm)
        refresh();
    else $rootScope.loading = false;
    function refresh(){
        $rootScope.loading = true;
        return TermService.getList().success(function(data){
            console.log(data);
            $rootScope.loading = false;
            $rootScope.treeTerm = data.data;
        });
    }
}]);