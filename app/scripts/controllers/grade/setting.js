'use strict';

/**
 * @ngdoc function
 * @name flatpcApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the flatpcApp
 */
angular.module('flatpcApp')
.controller('GradeSettingCtrl', ['$scope','AppConfig','$rootScope', 'GradeService',
function($scope,AppConfig,$rootScope,GradeService) {
    $scope.media = {
        tab:1,
        setTab:function (n) {
            this.tab = n;
        },
        week : AppConfig.week==1?false:true,
        month : AppConfig.month==1?false:true,
        day : AppConfig.day==1?false:true,
        bed : AppConfig.bed==1?false:true,
        pass : AppConfig.pass==1?false:true,
        photo : AppConfig.photo==1?false:true,
        takephoto : AppConfig.takephoto==1?false:true,
        check : AppConfig.check==1?false:true,
        role :  AppConfig.role==1?false:true,
    };
    console.log(AppConfig);
    $scope.basicSave = function(){
        $rootScope.loading = true;
        return GradeService.basicSetting({
            week:$scope.media.week?0:1,
            month:$scope.media.month?0:1,
            day:$scope.media.day?0:1,
            bed:$scope.media.bed?0:1,
            pass:$scope.media.pass?0:1,
            photo:$scope.media.photo?0:1,
            takephoto:$scope.media.takephoto?0:1,
            check:$scope.media.check?0:1,
            role:$scope.media.role?0:1
        }).success(function (data) {
            if(data.code == 0){
                swal("提示","保存成功！", "success"); 
                sessionStorage.week = $scope.media.week?0:1;
                sessionStorage.month = $scope.media.month?0:1;
                sessionStorage.day = $scope.media.day?0:1;
                sessionStorage.bed = $scope.media.bed?0:1;
                sessionStorage.pass = $scope.media.pass?0:1;
                sessionStorage.photo = $scope.media.photo?0:1;
                sessionStorage.role = $scope.media.role?0:1;
                sessionStorage.takephoto = $scope.media.takephoto?0:1;
                sessionStorage.check = $scope.media.check?0:1;

                document.cookie = "week="+sessionStorage.week;
                document.cookie = "month="+sessionStorage.month;
                document.cookie = "day="+sessionStorage.day;
                document.cookie = "bed="+sessionStorage.bed;
                document.cookie = "pass="+sessionStorage.pass;
                document.cookie = "photo="+sessionStorage.photo;
                document.cookie = "role="+sessionStorage.role;
                document.cookie = "takephoto="+sessionStorage.takephoto;
                document.cookie = "check="+sessionStorage.check;
                
                AppConfig.week = $scope.media.week?0:1;
                AppConfig.month = $scope.media.month?0:1;
                AppConfig.day = $scope.media.day?0:1;
                AppConfig.bed = $scope.media.bed?0:1;
                AppConfig.pass = $scope.media.pass?0:1;
                AppConfig.photo = $scope.media.photo?0:1;
                AppConfig.role = $scope.media.role?0:1;
                AppConfig.takephoto = $scope.media.takephoto?0:1;
                AppConfig.check = $scope.media.check?0:1;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
        })
    }
}]);