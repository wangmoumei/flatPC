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
            if(data.code == 0){
                location.href=data.data.fileUrl;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            $rootScope.loading = false;
        })
        
    }
    $scope.downloadOriginal = function () {
        $rootScope.loading = true;
        FlatService.downloadExcel().success(function(data){
            console.log(data.data.fileUrl);
            if(data.code == 0){
                location.href=data.data.fileUrl;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            $rootScope.loading = false;
        })
    }
    var uploadExcel = null;
    $scope.uploadFile = function(){
        var files = event.target.files;
        //console.log(files);
        if(files[0].name.split(".").pop() != "xls" && files[0].name.split(".").pop() != "xlsx"){
            swal('提示', '文件格式不正确！请上传*.xls或*.xlsx文件', 'error'); 
            return false;
        }
        $scope.importFileName = files[0].name;
        uploadExcel = files[0];
        $scope.$digest();
    };
    $scope.subImport = function(){
        if(!uploadExcel)return;
        var form = document.createElement('form');
        form.enctype = 'multipart/form-data';
        var fdata = new FormData(form);
        if (!fdata) { swal('提示', '你的浏览器不支持文件上传！', 'error'); return false; };
        fdata.append('file', uploadExcel);
        fdata.append('title',$scope.importName);
        fdata.append('token',AppConfig.token);
        fdata.append('schoolcode',AppConfig.schoolCode);
        fdata.append('importtype','住宿信息');
        $rootScope.loading = true;
        return FlatService.importFlat(fdata).success(function(data){
            if(data.code == 0){
                swal("提示","上传成功！", "success");
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            console.log(data);
            $rootScope.loading = false;
            refresh();
        })
    }
    $scope.importInit = function(){
        uploadExcel = null;
        $scope.importName = '';
    }
    refresh();
    function refresh(){
        $rootScope.loading = true;
        FlatService.getImport($scope.media).success(function(data){
            if(data.code == 0){
                $scope.importList = data.data.list;
                $scope.media.recordCount = data.data.recordCount;
                $scope.media.pageCount = data.data.pageCount;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 

            $rootScope.loading = false;
        })
    }
}])