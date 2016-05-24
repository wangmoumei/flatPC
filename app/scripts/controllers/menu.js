angular.module('flatpcApp')
  .controller('MenuCtrl', ['$scope','$rootScope','AppConfig','$stateParams',function ($scope,$rootScope,AppConfig,$stateParams) {
    $rootScope.loading = false;
    $scope.switch = {
        week : AppConfig.week==1?false:true,
        month : AppConfig.month==1?false:true,
        day : AppConfig.day==1?false:true,
        bed : AppConfig.bed==1?false:true,
        pass : AppConfig.pass==1?false:true,
        photo : AppConfig.photo==1?false:true,
        takephoto : AppConfig.takephoto==1?false:true,
        check : AppConfig.check==1?false:true,
        role :  AppConfig.role==1?false:true,
    }
    if($stateParams.p){
        var menus = [];
        switch($stateParams.p){
            case 'flat':
                if($rootScope.menuCheck(1)){
                    menus.push('flat');
                    if($rootScope.menuCheck(6)){
                        menus.push('flat');
                    }else if($rootScope.menuCheck(7)){
                        menus.push('grade');
                    }else if($rootScope.menuCheck(8)){
                        menus.push('check');
                    }else menus.push(' ');
                }
                break;
            case 'data':
                if($rootScope.menuCheck(2)){
                    menus.push('data');
                    if($rootScope.menuCheck(9)){
                        menus.push('data');
                    }else if($rootScope.menuCheck(10)){
                        menus.push('collect');
                    }else if($rootScope.menuCheck(11)){
                        menus.push('floor');
                    }else menus.push(' ');
                }
                break;
            case 'admin':
                if($rootScope.menuCheck(3)){
                    menus.push('admin');
                    if($rootScope.menuCheck(13)){
                        menus.push('admin');
                    }else if($rootScope.menuCheck(12)){
                        menus.push('role');
                    }else menus.push(' ');
                }
                break;
            case 'graduate':
                if($rootScope.menuCheck(379)){
                    menus.push('graduate');
                    if($rootScope.menuCheck(380)){
                        menus.push('graduate');
                    }else menus.push(' ');
                }
                break;
            case 'wechat':
            case 'repair':
            case 'food':
            case 'water':
            case 'pay':
            case 'shower':
            case 'message':
                menus.push($stateParams.p);
                $rootScope.headerSwitch(1,$stateParams.p);
                break;
                
                
                
        }
        if(menus.length>0){
            $rootScope.sysMenu = menus;
        }
    }
  }]);