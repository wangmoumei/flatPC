angular.module('flatpcApp')
.controller('ArrearageCtrl', ['$scope', 'AppConfig','$rootScope','FlatService','$filter','GraduationService',
function($scope,AppConfig,$rootScope,FlatService,$filter,GraduationService) {
    
    //基础的页码、排序等等选项
    $scope.media = {
        tab:1,
        epage:1,
        pageCount:1,
        recordCount:1,
        pagesize:10,
        title:"",
        name:'',
        studentnumber:'',
        roomname:'',
        collegeid:'',
        classid:'',
        search:0,
        orderfield:'',
        ordertype:'',
        arrearstype1:0,
        arrearstype2:0
    }
    //换页
    $scope.setPage = function(n){
        if($scope.media.epage + n >0 && $scope.media.epage + n <= $scope.media.pageCount){
            $scope.media.epage += n;
            refresh(1);
        } 
    };
    //调整每页显示量
    $scope.setPageSize = function(n){
        $scope.media.pagesize = n;
        refresh();
    }
    //排序
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
    //调整查询规则，按学院或者班级查询
    $scope.show = function(type,item,campus,liveArea){
        $scope.media.campusid = item.campusId || "";
        $scope.media.liveareaid = item.liveAreaId || "";
        $scope.media.flatid = item.flatId || "";
        $scope.media.title = "";
        switch(type){
            case 0:
                $scope.media.title = $rootScope.treeFlat.title;
                break;
            case 1:
                $scope.media.title = item.title;
                break;
            case 2:
                $scope.media.title = campus.title + '-' + item.title;
                break;
            case 3:
                $scope.media.title = campus.title + '-' + liveArea.title + '-' + item.title;
                break;
        }
        
        refresh();
    };
    //检索功能
    $scope.search = function(search){
        if($scope.media.tab == 1){
            $scope.media.studentnumber = $scope.media.search?'':search;
            $scope.media.name = $scope.media.search?search:'';
        }
        else
            $scope.media.roomname = search;
        refresh();
    };
    $scope.setTab = function(n){
        $scope.media.tab = n;
        refresh();
    }
    $scope.setStatus = function(n){
        $scope.media['arrearstype'+$scope.media.tab] = n;
        refresh();
    }
    $scope.deal = function(item){
        swal({   
            title: "确认",   
            text: "该" + ($scope.media.tab==1?'学生':'寝室') + "已线下缴纳违欠费用",   
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#2772ee",   
            confirmButtonText: "确定",   
            cancelButtonText: "取消",   
            closeOnConfirm: false 
        }, 
        function(){   
            $rootScope.loading = true;
            GraduationService.deal({
                type:$scope.media.tab==1?0:1,
                pid:item.pId||0,
                rid:item.rId||0
            }).success(function(data){
                if(data.code == 0){
                    swal("提示", "处理成功！", "success"); 
                    refresh();
                    if(fun && typeof fun == 'function')fun();
                }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                
                $rootScope.loading = false;
            });
        });
    }
    //初始化树+列表
    if(!$rootScope.treeFlat){
        FlatService.getList(AppConfig.schoolCode).success(function(data){
            //console.log(data);
            $rootScope.treeFlat = data.data;
            $scope.show(0,{});
        });
    }
    else {
        $scope.show(0,{});
    }
    //渲染list
    function refresh(n){
        if(!$rootScope.menuCheck(343))return;
        if(!n)$scope.media.epage = 1;
        $rootScope.loading = true;
        if($scope.media.tab == 1)
            GraduationService.getListByStudent($scope.media).success(function(data){
                if(data.code == 0){
                    $scope.studentList = data.data.list;
                    $scope.media.recordCount = data.data.recordCount;
                    $scope.media.pageCount = data.data.pageCount;
                }else if(data.code == 4037){
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        location.href="#login";$rootScope.loading = false;
                    }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                
                //console.log(data.data);
                $rootScope.loading = false;
            })
        else 
            GraduationService.getListByRoom($scope.media).success(function(data){
                if(data.code == 0){
                    $scope.roomList = data.data.list;
                    $scope.media.recordCount = data.data.recordCount;
                    $scope.media.pageCount = data.data.pageCount;
                }else if(data.code == 4037){
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        location.href="#login";$rootScope.loading = false;
                    }
                else
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                
                //console.log(data.data);
                $rootScope.loading = false;
            })
    }
    
}]).controller('ArrearageImportCtrl', ['$scope', 'AppConfig','$rootScope','GraduationService','CollegeService','$filter',
function($scope,AppConfig,$rootScope,GraduationService,CollegeService,$filter) {
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
        GraduationService.downloadImport(id).success(function(data){
            //console.log(data.data.fileUrl);
            if(data.code == 0){
                location.href=data.data.fileUrl;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
        })
        
    }
    $scope.downloadOriginal = function(id){
        $rootScope.loading = true;
        GraduationService.downloadOriginal(id).success(function(data){
            //console.log(data.data.fileUrl);
            if(data.code == 0){
                location.href=data.data.fileUrl;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
        })
        
    }
    var uploadExcel = null;
    $scope.uploadFile = function(event){
        var files = event.target.files;
        ////console.log(files);
        if(files[0].name.split(".").pop() != "xls" && files[0].name.split(".").pop() != "xlsx"){
            swal('提示', '文件格式不正确！请上传*.xls或*.xlsx文件', 'error'); 
            return false;
        }//console.log(files[0].name);
        $scope.importFileName = files[0].name;
        uploadExcel = files[0];
        $scope.$digest();
    };
    $scope.subImport = function(fun){
        if(!uploadExcel)return;
        var form = document.createElement('form');
        form.enctype = 'multipart/form-data';
        var fdata = new FormData(form);
        if (!fdata) { swal('提示', '你的浏览器不支持文件上传！', 'error'); return false; };
        fdata.append('file', uploadExcel);
        fdata.append('title',$scope.importName);
        fdata.append('token',AppConfig.token);
        fdata.append('schoolcode',AppConfig.schoolCode);
        fdata.append('importtype',($scope.type?'寝室':'个人') + '违欠信息');
        // console.log(uploadExcel);
        $rootScope.loading = true;
        return GraduationService.importData(fdata,$scope.type).success(function(data){
            //console.log(data);
            if(data.code == 0){
                swal("提示","上传成功！", "success");
                if(fun && typeof fun == 'function') fun();
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
            refresh();
        })
    }
    $scope.importInit = function(type){
        uploadExcel = null;
        $scope.importName = '';
        $scope.importFileName = "";
        $scope.type = type;
        $scope.title = type?"寝室":"个人";
        return null;
    }
    function refresh(){
        $rootScope.loading = true;
        GraduationService.getImport($scope.media).success(function(data){
            if(data.code == 0){
                $scope.importList = data.data.list;
                $scope.media.recordCount = data.data.recordCount;
                $scope.media.pageCount = data.data.pageCount;
            }else if(data.code == 4037){
                    swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    location.href="#login";$rootScope.loading = false;
                }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            //console.log(data.data);
            $rootScope.loading = false;
        })
    }
    refresh();
}])