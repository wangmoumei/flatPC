angular.module('flatpcApp')
.controller('CheckCtrl', ['$scope','$rootScope','AppConfig',function($scope,$rootScope,AppConfig) {
        //存储列表头到frame.html中
    $scope.menus = [
        '公寓管理','日常调换宿','审批'
    ];
    //跳转到什么地方去
    $scope.parent = "flat";
    $scope.loaded = function(){
        $rootScope.loading = false;
        $scope.$apply();
    }
    var a = document.createElement('a');
    a.href = AppConfig.FRAME + "index.php?m=Apartment&c=Check&a=index&token="+AppConfig.token+"&schoolcode="+AppConfig.schoolCode;
    a.target="page-frame";
    a.click();
}])
// angular.module('flatpcApp')
// .controller('CheckCtrl', ['$scope','AppConfig','$rootScope', 'FlatService','DailyService','$filter','CollegeService','RoomService',"StudentService",
// function($scope,AppConfig,$rootScope,FlatService,DailyService,$filter,CollegeService,RoomService,StudentService) {
//     //基础的页码、排序等等选项
//     $scope.media = {
//         epage:1,
//         pageCount:1,
//         recordCount:0,
//         pagesize:10,
//         type:'occupancy',
//         title:'日常调换宿 - 入住',
//         name:'',
//         studentnumber:'',
//         search:0,
//         orderfield:'',
//         ordertype:'',
//         status:-1,
//         multi:false
//     }
//     //换页
//     $scope.setPage = function(n){
//         if($scope.media.epage + n >0 && $scope.media.epage + n <= $scope.media.pageCount){
//             $scope.media.epage += n;
//             refresh(1);
//         } 
//     };
//     //调整每页显示量
//     $scope.setPageSize = function(n){
//         $scope.media.pagesize = n;
//         refresh();
//     }
//     //排序
//     $scope.setOrder = function(name){
//         if($scope.media.orderfield == name)
//         {
//             $scope.media.ordertype = $scope.media.ordertype=="asc"?"desc":"asc";
//         }else{
//             $scope.media.orderfield = name;
//             $scope.media.ordertype = "asc";
//         }
//         refresh();
//     }
//     //调整查询规则，按学区、生活区或者楼栋查询
//     $scope.show = function(type,item,title){
//         $scope.media.type = item.controller || "";
//         $scope.media.title = title + ' - ' + item.title;
//         refresh();
//     };
//     //调整查询规则，计划中、已审批、已取消、已驳回
//     $scope.setStatus = function(status){
//         $scope.media.status = status;
//         refresh();
//     }
//     //检索功能
//     $scope.search = function(search){
//         $scope.media.name = $scope.media.search?'':search;
//         $scope.media.studentnumber = $scope.media.search?search:'';
//         refresh();
//     };
    
//     //渲染list
//     function refresh(n){
//         if(!n)$scope.media.epage = 1;
//         $rootScope.loading = true;
//         switch( $scope.media.type ){
//             case 'occupancy':
//                 DailyService.getLiveList($scope.media).success(function(data){
//                     if(data.code == 0){
//                         $scope.list = data.data.list;
//                         $scope.media.recordCount = data.data.recordCount;
//                         $scope.media.pageCount = data.data.pageCount;
//                     }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }
//                     else{
//                         swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     }
                    
//                     //console.log(data.data);
//                     $rootScope.loading = false;
//                 })
//                 break;
//             case 'transfer':
//                 DailyService.getChangeList($scope.media).success(function(data){
//                     if(data.code == 0){
//                         $scope.list = data.data.list;
//                         $scope.media.recordCount = data.data.recordCount;
//                         $scope.media.pageCount = data.data.pageCount;
//                     }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }
//                     else{
//                         swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     }
                    
//                     //console.log(data.data);
//                     $rootScope.loading = false;
//                 })
//                 break;
//             case 'exitroom':
//                 DailyService.getQuitList($scope.media).success(function(data){
//                     if(data.code == 0){
//                         $scope.list = data.data.list;
//                         $scope.media.recordCount = data.data.recordCount;
//                         $scope.media.pageCount = data.data.pageCount;
//                     }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }
//                     else{
//                         swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     }
                    
//                     //console.log(data.data);
//                     $rootScope.loading = false;
//                 })
//                 break;
//         }
        
//     }
//     pageFresh();
//     function pageFresh() {
//         $rootScope.loading = true;
//         DailyService.getCheckTree().success(function(data){
//             if(data.code == 0){
//                 $scope.treeCheck = data.list;
//                 refresh();
//             }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }
//             else{
//                 swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//             }
            
//             //console.log(data.data);
//             $rootScope.loading = false;
//         })
//     }
//     //查看详情
//     $scope.work = {};
//     $scope.detail = function(work){
//         $scope.work = work;
//         $scope.work.returnMessage  = "";
//         $scope.returnSwitch = false;
//         return null;
//     }
//     //驳回理由 Dom操控
//     $scope.returnSwitch = false;
//     $scope.returnSwitchChange = function(){
//         $scope.returnSwitch = !$scope.returnSwitch;
//     }
//     //审批
//     $scope.passWork = function(fun){
//         swal({   
//             title: "确认",   
//             text: "确定要通过这条申请吗？",   
//             type: "warning",   
//             showCancelButton: true,   
//             confirmButtonColor: "#2772ee",   
//             confirmButtonText: "确定",   
//             cancelButtonText: "取消",   
//             closeOnConfirm: false 
//         }, 
//         function(){   
//             $rootScope.loading = true;
//             switch( $scope.media.type ){
//                 case 'occupancy':
//                     DailyService.passLive({
//                         token:AppConfig.token,
//                         occupancyid:$scope.work.occupancyId || '',
//                         adminid:AppConfig.adminId
//                     }).success(function(data){
//                         if(data.code == 0){
//                             swal("提示", "审批成功！", "success"); 
//                             pageFresh();
//                             if(fun && typeof fun == 'function')fun();
//                         }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }
//                         else
//                             swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        
//                         $rootScope.loading = false;
//                     });
//                     break;
//                 case 'transfer':
//                     DailyService.passChange({
//                         token:AppConfig.token,
//                         transferid:$scope.work.transferId || '',
//                         adminid:AppConfig.adminId
//                     }).success(function(data){
//                         if(data.code == 0){
//                             swal("提示", "审批成功！", "success"); 
//                             pageFresh();
//                             if(fun && typeof fun == 'function')fun();
//                         }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }else{
//                             swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                         }
                        
//                         $rootScope.loading = false;
//                     });
//                     break;
//                 case 'exitroom':
//                     DailyService.passQuit({
//                         token:AppConfig.token,
//                         exitroomid:$scope.work.exitRoomId || '',
//                         adminid:AppConfig.adminId
//                     }).success(function(data){
//                         if(data.code == 0){
//                             swal("提示", "审批成功！", "success"); 
//                             pageFresh();
//                             if(fun && typeof fun == 'function')fun();
//                         }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }
//                         else
//                             swal("提示","错误代码："+ data.code + '，' + data.msg, "error");
                        
//                         $rootScope.loading = false;
//                     });
//                     break;
//             }
//         });
        
        
//     }
//     //驳回
//     $scope.returnWork = function(fun){
//         $rootScope.loading = true;
//         switch( $scope.media.type ){
//             case 'occupancy':
//                 DailyService.backLive({
//                     token:AppConfig.token,
//                     occupancyid:$scope.work.occupancyId || '',
//                     backmessage:$scope.work.returnMessage,
//                     adminid:AppConfig.adminId
//                 }).success(function(data){
//                     if(data.code == 0){
//                         swal("提示", "驳回成功！", "success"); 
//                         pageFresh();
//                         if(fun && typeof fun == 'function')fun();
//                     }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }
//                     else
//                         swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                    
//                     $rootScope.loading = false;
//                 });
//                 break;
//             case 'transfer':
//                 DailyService.backChange({
//                     token:AppConfig.token,
//                     transferid:$scope.work.transferId || '',
//                     backmessage:$scope.work.returnMessage,
//                     adminid:AppConfig.adminId
//                 }).success(function(data){
//                     if(data.code == 0){
//                         swal("提示", "驳回成功！", "success"); 
//                         pageFresh();
//                         if(fun && typeof fun == 'function')fun();
//                     }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }else{
//                         swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     }
//                     $rootScope.loading = false;
//                 });
//                 break;
//             case 'exitroom':
//                 DailyService.backQuit({
//                     token:AppConfig.token,
//                     exitroomid:$scope.work.exitRoomId || '',
//                     backmessage:$scope.work.returnMessage,
//                     adminid:AppConfig.adminId
//                 }).success(function(data){
//                     if(data.code == 0){
//                         swal("提示", "驳回成功！", "success"); 
//                         pageFresh();
//                         if(fun && typeof fun == 'function')fun();
//                     }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }
//                     else
//                         swal("提示","错误代码："+ data.code + '，' + data.msg, "error");
                    
//                     $rootScope.loading = false;
//                 });
//                 break;
//         }
//     }
//     //取消
//     $scope.cancelWork = function(fun){
//         swal({   
//             title: "确认关闭",   
//             text: "确定要取消掉这条申请吗？",   
//             type: "warning",   
//             showCancelButton: true,   
//             confirmButtonColor: "#DD6B55",   
//             confirmButtonText: "确定",   
//             cancelButtonText: "取消",   
//             closeOnConfirm: false 
//         }, 
//         function(){   
//             $rootScope.loading = true;
//             switch( $scope.media.type ){
//                 case 'occupancy':
//                     return DailyService.cancelLive({
//                         token:AppConfig.token,
//                         occupancyid:$scope.work.occupancyId || '',
//                         adminid:AppConfig.adminId
//                     }).success(function(data){
//                         if(data.code == 0){
//                             swal("提示", "已取消！", "success"); 
//                             pageFresh();
//                             if(fun && typeof fun == 'function')fun();
//                         }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }
//                         else
//                             swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        
//                         $rootScope.loading = false;
//                     });
//                     // break;
//                 case 'transfer':
//                     DailyService.cancelChange({
//                         token:AppConfig.token,
//                         transferid:$scope.work.transferId || '',
//                         adminid:AppConfig.adminId
//                     }).success(function(data){
//                         if(data.code == 0){
//                             swal("提示", "已取消！", "success"); 
//                             pageFresh();
//                             if(fun && typeof fun == 'function')fun();
//                         }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }else{
//                             swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                         }
//                         $rootScope.loading = false;
//                     });
//                     break;
//                 case 'exitroom':
//                     DailyService.cancelQuit({
//                         token:AppConfig.token,
//                         exitroomid:$scope.work.exitRoomId || '',
//                         adminid:AppConfig.adminId
//                     }).success(function(data){
//                         if(data.code == 0){
//                             swal("提示", "已取消！", "success"); 
//                             pageFresh();
//                             if(fun && typeof fun == 'function')fun();
//                         }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }
//                         else
//                             swal("提示","错误代码："+ data.code + '，' + data.msg, "error");
                        
//                         $rootScope.loading = false;
//                     });
//                     break;
//             }
//         });
        
//     }
//     $scope.multiCheck = function () {
//         $scope.list.forEach(function (item) {
//             if(!item.status)
//                 item.checked = $scope.media.multi;
//         })
//     }
//     $scope.multiChecked = function (status) {
//         $scope.list.forEach(function (item) {
//             if(!item.status && item.checked != status)
//                 return;
//         })
//         $scope.media.multi = status;
//     }
//     $scope.multiBack = function () {
//         var ids = "",n = 0;
//         $scope.list.forEach(function (item) {
//             if(!item.status && item.checked){
//                 ids+= (item.occupancyId||item.transferId||item.exitRoomId) +","; 
//                 n++;
//             }
//         });
//         if(n>0){
//             ids = ids.substring(0,ids.length - 1);
//         }else
//             return;
//         swal({   
//             title: "确认",   
//             text: "确定要驳回这" + n + "条申请吗？",   
//             type: "warning",   
//             showCancelButton: true,   
//             confirmButtonColor: "#DD6B55",   
//             confirmButtonText: "确定",   
//             cancelButtonText: "取消",   
//             closeOnConfirm: false 
//         }, 
//         function(){   
//             $rootScope.loading = true;
//             switch( $scope.media.type ){
//                 case 'occupancy':
//                     DailyService.backLive({
//                         token:AppConfig.token,
//                         occupancyid:ids,
//                         backmessage:$scope.work.returnMessage,
//                         adminid:AppConfig.adminId
//                     }).success(function(data){
//                         if(data.code == 0){
//                             swal("提示", "驳回成功！", "success"); 
//                             pageFresh();
//                         }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }
//                         else
//                             swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        
//                         $rootScope.loading = false;
//                     });
//                     break;
//                 case 'transfer':
//                     DailyService.backChange({
//                         token:AppConfig.token,
//                         transferid:ids,
//                         backmessage:$scope.work.returnMessage,
//                         adminid:AppConfig.adminId
//                     }).success(function(data){
//                         if(data.code == 0){
//                             swal("提示", "驳回成功！", "success"); 
//                             pageFresh();
//                         }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }else{
//                             swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                         }
//                         $rootScope.loading = false;
//                     });
//                     break;
//                 case 'exitroom':
//                     DailyService.backQuit({
//                         token:AppConfig.token,
//                         exitroomid:ids,
//                         backmessage:$scope.work.returnMessage,
//                         adminid:AppConfig.adminId
//                     }).success(function(data){
//                         if(data.code == 0){
//                             swal("提示", "驳回成功！", "success"); 
//                             pageFresh();
//                         }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }
//                         else
//                             swal("提示","错误代码："+ data.code + '，' + data.msg, "error");
                        
//                         $rootScope.loading = false;
//                     });
//                     break;
//             }
//         });
//     }
//     $scope.multiPass = function () {
//         var ids = "",n = 0;
//         $scope.list.forEach(function (item) {
//             if(!item.status && item.checked){
//                 ids+= (item.occupancyId||item.transferId||item.exitRoomId) +","; 
//                 n++;
//             }
//         });
//         if(n>0){
//             ids = ids.substring(0,ids.length - 1);
//         }else
//             return;
//         swal({   
//             title: "确认",   
//             text: "确定要通过这" + n + "条申请吗？",   
//             type: "warning",   
//             showCancelButton: true,   
//             confirmButtonColor: "#2772ee",   
//             confirmButtonText: "确定",   
//             cancelButtonText: "取消",   
//             closeOnConfirm: false 
//         }, 
//         function(){   
//             $rootScope.loading = true;
//             switch( $scope.media.type ){
//                 case 'occupancy':
//                     DailyService.passLive({
//                         token:AppConfig.token,
//                         occupancyid:ids,
//                         adminid:AppConfig.adminId
//                     }).success(function(data){
//                         if(data.code == 0){
//                             swal("提示", "审批成功！", "success"); 
//                             pageFresh();
//                         }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }
//                         else
//                             swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
                        
//                         $rootScope.loading = false;
//                     });
//                     break;
//                 case 'transfer':
//                     DailyService.passChange({
//                         token:AppConfig.token,
//                         transferid:ids,
//                         adminid:AppConfig.adminId
//                     }).success(function(data){
//                         if(data.code == 0){
//                             swal("提示", "审批成功！", "success"); 
//                             pageFresh();
//                         }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }else{
//                             swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                         }
                        
//                         $rootScope.loading = false;
//                     });
//                     break;
//                 case 'exitroom':
//                     DailyService.passQuit({
//                         token:AppConfig.token,
//                         exitroomid:ids,
//                         adminid:AppConfig.adminId
//                     }).success(function(data){
//                         if(data.code == 0){
//                             swal("提示", "审批成功！", "success"); 
//                             pageFresh();
//                         }else if(data.code == 4037){
//                     swal("提示","错误代码："+ data.code + '，' + data.msg, "error"); 
//                     location.href="#login";$rootScope.loading = false;
//                 }
//                         else
//                             swal("提示","错误代码："+ data.code + '，' + data.msg, "error");
                        
//                         $rootScope.loading = false;
//                     });
//                     break;
//             }
//         });
//     }
// }]);