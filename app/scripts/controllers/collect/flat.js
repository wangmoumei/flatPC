angular.module('flatpcApp')
.controller('FlatImportCtrl', ['$scope','$rootScope','FlatService','AppConfig',
function($scope,$rootScope,FlatService,AppConfig) {
    $scope.media = {
        epage:1,
        pageCount:1,
        recordCount:1,
        pagesize:10,
        orderfield:'',
        ordertype:''
    }
    $scope.setPage = function(n){
        if($scope.media.epage + n >0 && $scope.media.epage + n <= $scope.media.pageCount){
            $scope.media.epage += n;
            refresh();
        } 
    };
    $scope.setPageSize = function(n){
        $scope.media.pagesize = n;
        refresh();
    }
    $scope.setOrder = function(name){
        if($scope.media.orderfield == name)
        {
            $scope.media.ordertype = $scope.media.ordertype=="asc"?"desc":"asc";
        }else{
            $scope.media.orderfield = name;
            $scope.media.ordertype = "asc";
        }
        refresh();
    }
    $scope.download = function(id){
        $rootScope.loading = true;
        FlatService.downloadImport(id).success(function(data){
            console.log(data.data.fileUrl);
            location.href=data.data.fileUrl;
            $rootScope.loading = false;
        })
        
    }
    
    $scope.uploadFile = function(){
        var files = event.target.files;
        //console.log(files);
        if(files[0].name.split(".").pop() != "xls" && files[0].name.split(".").pop() != "xlsx"){
            swal('提示', '文件格式不正确！请上传*.xls或*.xlsx文件', 'error'); 
            return false;
        }console.log(files[0].name);
        $scope.importFileName = files[0].name;
        $scope.$digest();
        var data = new FormData();
        if (!data) { swal('提示', '你的浏览器不支持文件上传！', 'error'); return false; };
        data.append('file', files[0]);
        $scope.uploadExcel = data;
    };
    $scope.subImport = function(){
        $scope.uploadExcel.append('title',$scope.importName);
        $scope.uploadExcel.append('token',AppConfig.token);
        $scope.uploadExcel.append('importtype','住宿信息');
        console.log($scope.uploadExcel);
        $rootScope.loading = true;
        return FlatService.importFlat($scope.uploadExcel).success(function(data){
            console.log(data);
            $rootScope.loading = false;
        })
    }
    refresh();
    function refresh(){
        $rootScope.loading = true;
        FlatService.getImport($scope.media).success(function(data){
            $scope.importList = data.data.list;
            $scope.media.recordCount = data.data.recordCount;
            $scope.media.pageCount = data.data.pageCount;
            $rootScope.loading = false;
        })
    }
}])