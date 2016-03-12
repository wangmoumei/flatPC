angular.module('flatpcApp')
.controller('StudentCtrl', ['$scope', 'AppConfig','$rootScope','StudentService','CollegeService','$filter','PublicService',
function($scope,AppConfig,$rootScope,StudentService,CollegeService,$filter,PublicService) {
    
    //基础的页码、排序等等选项
    $scope.media = {
        epage:1,
        pageCount:1,
        recordCount:1,
        pagesize:10,
        name:'',
        studentnumber:'',
        collegeid:'',
        classid:'',
        search:0,
        orderfield:'',
        ordertype:''
    }
    //换页
    $scope.setPage = function(n){
        if($scope.media.epage + n >0 && $scope.media.epage + n <= $scope.media.pageCount){
            $scope.media.epage += n;
            refresh();
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
    $scope.show = function(type,item,school,college){
        $scope.media.title = (school || item.name) 
        + (type > 0?'-':'') + (college || item.collegeName ||'') 
        + (type > 1?'-':'') + (item.className || '');
        $scope.media.collegeid = item.collegeId || "";
        $scope.media.classid = item.classId || "";
        refresh();
    };
    //检索功能
    $scope.search = function(search){
        $scope.media.studentnumber = $scope.media.search?'':search;
        $scope.media.name = $scope.media.search?search:'';
        refresh();
    };
    
    //二级连选的select
    $scope.selecter = {
        collegeId:"",
        classList:[],
        classId:'',
        collegeSelecter : function(){
            //用collegeId获取classList
            this.classId = '';
            var college = this.collegeId?$filter('filter')($rootScope.treeCollege[0].collegeList,{collegeId:this.collegeId}):[];
            this.classList = (college.length>0 && college[0].classList)?college[0].classList : [];
            //console.log(this.classList);
        },
        classSelecter : function(){
            //用classId反向获取collegeId和classList
            var college = $rootScope.treeCollege[0].collegeList;
            for(var i=0 ; i < college.length;i++){
                var list = this.classId?$filter('filter')(college[i].classList,{classId:this.classId}):[];
                if(list.length > 0){
                    this.collegeId = college[i].collegeId;
                    this.classList = college[i].classList;
                    break;
                }
            }
        },
        init : function(){
            //将select置空
            this.collegeId = "";
            this.classId = "";
            this.classList = [];
        }
    }
    
    
    
    //初始化树+列表
    $scope.studentList = [];
    if(!$rootScope.treeCollege){
        CollegeService.getList(AppConfig.schoolCode).success(function(data){
            if(data.code == 0){
                $rootScope.treeCollege = data.data;
                $scope.media.title = data.data[0].name;
                refresh();
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            
        });
    }else refresh();
    
    //学生信息
    $scope.student = {};
    $scope.studentInit = function(){
        $scope.student.studentKey = "";
        $scope.student.studentNumber = "";
        $scope.student.name = "";
        $scope.student.headImgurl = "";
        $scope.student.sex = "男";
        $scope.student.birthDay = new Date().Format("yyyy-MM-dd");
        $scope.student.political = "";
        $scope.student.nation = "";
        $scope.student.origin = "";
        $scope.student.marital = "";
        $scope.student.identityCard = "";
        $scope.student.studentType = "";
        $scope.student.homeAddress = "";
        $scope.student.phone = "";
        $scope.student.currentAddress = "";
        $scope.student.memo = "";
        $scope.student.fileid = '';
        if($scope.media.classid){
            $scope.selecter.classId = $scope.media.classid;
            $scope.selecter.classSelecter(); 
        }
        else if($scope.media.collegeid){
            $scope.selecter.collegeId = $scope.media.collegeid;
        }else
            $scope.selecter.init();
        $scope.student.type = 0;
    }
    //读取学生信息
    $scope.loadInfo = function(studentid){
        if(studentid.length<1) 
            return null;
        $rootScope.loading = true;
        return StudentService.getStudent(studentid).success(function(data){
            if(data.code == 0){
                $scope.student = data.data;
                $scope.student.studentKey = studentid;
                $scope.student.fileid = data.data.fileId;
                $scope.student.type = 1;
                $scope.selecter.collegeId = data.data.collegeId;
                $scope.selecter.collegeSelecter();
                $scope.selecter.classId = '' + data.data.classId;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
        })
    }
    //添加学生信息
    $scope.studentAdd = function(){
        $rootScope.loading = true;
        return StudentService.addStudent({
            token:AppConfig.token,
            schoolcode:AppConfig.schoolCode,
            studentnumber:$scope.student.studentNumber,
            name:$scope.student.name,
            fileid:$scope.student.fileid,
            sex:$scope.student.sex,
            birthday:$scope.student.birthDay,
            political:$scope.student.political,
            nation:$scope.student.nation,
            origin:$scope.student.origin,
            marital:$scope.student.marital,
            identitycard:$scope.student.identityCard,
            collegeid:$scope.selecter.collegeId,
            classid:$scope.selecter.classId,
            readtype:$scope.student.studentType,
            homeaddress:$scope.student.homeAddress,
            phone:$scope.student.phone,
            memo:$scope.student.memo
        }).success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                $scope.student.studentKey = data.data.studentKey;
                $scope.student.type = 1;
                swal("提示", "添加成功！", "success"); 
                refresh();
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
    }
    //修改学生信息
    $scope.studentEdit = function(){
        $rootScope.loading = true;
        return StudentService.editStudent({
            token:AppConfig.token,
            studentkey:$scope.student.studentKey,
            studentnumber:$scope.student.studentNumber,
            name:$scope.student.name,
            fileid:$scope.student.fileid,
            sex:$scope.student.sex,
            birthday:$scope.student.birthDay,
            political:$scope.student.political,
            nation:$scope.student.nation,
            origin:$scope.student.origin,
            marital:$scope.student.marital,
            identitycard:$scope.student.identityCard,
            collegeid:$scope.selecter.collegeId,
            classid:$scope.selecter.classId,
            readtype:$scope.student.studentType,
            homeaddress:$scope.student.homeAddress,
            phone:$scope.student.phone,
            memo:$scope.student.memo
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
    //删除学生信息
    $scope.studentDel = function(){       
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
                return StudentService.delStudent({
                    token:AppConfig.token,
                    studentkey:$scope.student.studentKey
                }).success(function(data){
                    $rootScope.loading = false;
                    
                    if(data.code == 0){
                        swal("提示", "删除成功！", "success"); 
                        refresh();
                    }
                    else
                        swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                });
        });
    }
    //上传头像图片，并将返回的img url显示
    $scope.uploadImg = function(){
        var files = event.target.files;
        var s = files[0].name.split(".").pop();
        if(s != "jpg" && s != "png" && s != "jpeg"){
            swal('提示', '文件格式不正确！请上传*.jpg或*.png文件', 'error'); 
            return false;
        }
        var form = document.createElement('form');
        form.enctype = 'multipart/form-data';
        var fdata = new FormData(form);
        if (!fdata) { swal('提示', '你的浏览器不支持文件上传！', 'error'); return false; };
        fdata.append('img', files[0]);
        
        fdata.append('token', AppConfig.token);
        fdata.append('schoolcode', AppConfig.schoolCode);
        console.log(fdata);
        $rootScope.loading = true;
        return PublicService.imgUpload(fdata).success(function(data){
            $rootScope.loading = false;
            if(data.code == 0){
                $scope.student.headImgurl = data.data.serverPath;
                $scope.student.fileid = data.data.fileId;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
        
    }
    //下载
    $scope.downloadStudent = function(){
        $rootScope.loading = true;
        StudentService.downloadStudent($scope.media).success(function(data){
            
            $rootScope.loading = false;
            if(data.code == 0){
                location.href=data.data.fileUrl;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
        })
        
    }
    
    //渲染list
    function refresh(){
        $rootScope.loading = true;
        StudentService.getList($scope.media).success(function(data){
            if(data.code == 0){
                $scope.studentList = data.data.list;
                $scope.media.recordCount = data.data.recordCount;
                $scope.media.pageCount = data.data.pageCount;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            //console.log(data.data);
            $rootScope.loading = false;
        })
    }
    
}]).controller('StudentImportCtrl', ['$scope', 'AppConfig','$rootScope','StudentService','CollegeService','$filter',
function($scope,AppConfig,$rootScope,StudentService,CollegeService,$filter) {
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
        StudentService.downloadImport(id).success(function(data){
            //console.log(data.data.fileUrl);
            if(data.code == 0){
                location.href=data.data.fileUrl;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
        })
        
    }
    $scope.downloadOriginal = function(id){
        $rootScope.loading = true;
        StudentService.downloadOriginal().success(function(data){
            //console.log(data.data.fileUrl);
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
        ////console.log(files);
        if(files[0].name.split(".").pop() != "xls" && files[0].name.split(".").pop() != "xlsx"){
            swal('提示', '文件格式不正确！请上传*.xls或*.xlsx文件', 'error'); 
            return false;
        }//console.log(files[0].name);
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
        fdata.append('importtype','学生信息');
        // console.log(uploadExcel);
        $rootScope.loading = true;
        return StudentService.importStudent(fdata).success(function(data){
            //console.log(data);
            if(data.code == 0){
                swal("提示","上传成功！", "success");
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            $rootScope.loading = false;
            refresh();
        })
    }
    $scope.importInit = function(){
        uploadExcel = null;
        $scope.importName = '';
    }
    function refresh(){
        $rootScope.loading = true;
        StudentService.getImport($scope.media).success(function(data){
            if(data.code == 0){
                $scope.importList = data.data.list;
                $scope.media.recordCount = data.data.recordCount;
                $scope.media.pageCount = data.data.pageCount;
            }
            else
                swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
            
            //console.log(data.data);
            $rootScope.loading = false;
        })
    }
    refresh();
}])